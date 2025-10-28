import { trpc } from "./trpc";
import { nanoid } from "nanoid";

interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

class EnhancedAnalyticsTracker {
  private sessionId: string;
  private userId: string;
  private pageStartTime: number = 0;
  private currentPath: string = "";
  private heatmapBuffer: Array<{
    x: number;
    y: number;
    eventType: string;
  }> = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private initialized: boolean = false;
  private utmParams: UTMParams = {};

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.userId = this.getOrCreateUserId();
    this.utmParams = this.extractUTMParams();
  }

  // Cookie helpers
  private setCookie(name: string, value: string, days: number = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Get or create persistent user ID (stored in cookie for 1 year)
  private getOrCreateUserId(): string {
    const stored = this.getCookie("analytics_user_id");
    if (stored) return stored;

    const newId = nanoid();
    this.setCookie("analytics_user_id", newId, 365);
    return newId;
  }

  // Get or create session ID (stored in sessionStorage)
  private getOrCreateSessionId(): string {
    const stored = sessionStorage.getItem("analytics_session_id");
    if (stored) return stored;

    const newId = nanoid();
    sessionStorage.setItem("analytics_session_id", newId);
    return newId;
  }

  // Extract UTM parameters from URL
  private extractUTMParams(): UTMParams {
    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};

    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const term = params.get("utm_term");
    const content = params.get("utm_content");

    if (source) utm.source = source;
    if (medium) utm.medium = medium;
    if (campaign) utm.campaign = campaign;
    if (term) utm.term = term;
    if (content) utm.content = content;

    // Store UTM params in sessionStorage for attribution
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem("analytics_utm", JSON.stringify(utm));
    }

    return utm;
  }

  // Check if this is a returning visitor
  private isReturningVisitor(): boolean {
    const firstVisit = this.getCookie("analytics_first_visit");
    return firstVisit !== null;
  }

  // Mark first visit
  private markFirstVisit() {
    if (!this.getCookie("analytics_first_visit")) {
      this.setCookie("analytics_first_visit", new Date().toISOString(), 365);
    }
  }

  private detectDevice(): string {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  }

  private detectBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.indexOf("Firefox") > -1) return "Firefox";
    if (ua.indexOf("SamsungBrowser") > -1) return "Samsung Internet";
    if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
    if (ua.indexOf("Trident") > -1) return "IE";
    if (ua.indexOf("Edge") > -1) return "Edge";
    if (ua.indexOf("Chrome") > -1) return "Chrome";
    if (ua.indexOf("Safari") > -1) return "Safari";
    return "Unknown";
  }

  private detectOS(): string {
    const ua = navigator.userAgent;
    if (ua.indexOf("Win") > -1) return "Windows";
    if (ua.indexOf("Mac") > -1) return "MacOS";
    if (ua.indexOf("Linux") > -1) return "Linux";
    if (ua.indexOf("Android") > -1) return "Android";
    if (ua.indexOf("iOS") > -1) return "iOS";
    return "Unknown";
  }

  async init(trpcClient: ReturnType<typeof trpc.useUtils>) {
    if (this.initialized) return;
    this.initialized = true;

    // Mark first visit
    this.markFirstVisit();

    // Get stored UTM params if available
    const storedUTM = sessionStorage.getItem("analytics_utm");
    if (storedUTM) {
      this.utmParams = JSON.parse(storedUTM);
    }

    // Create session with enhanced data
    await trpcClient.client.analytics.createSession.mutate({
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      device: this.detectDevice(),
      browser: this.detectBrowser(),
      os: this.detectOS(),
      referrer: document.referrer || undefined,
      landingPage: window.location.pathname,
    });

    // Track if this is a returning visitor
    if (this.isReturningVisitor()) {
      await trpcClient.client.analytics.trackEvent.mutate({
        sessionId: this.sessionId,
        eventType: "returning_visitor",
        path: window.location.pathname,
        metadata: JSON.stringify({
          userId: this.userId,
          firstVisit: this.getCookie("analytics_first_visit"),
        }),
      });
    }

    // Track UTM parameters if present
    if (Object.keys(this.utmParams).length > 0) {
      await trpcClient.client.analytics.trackEvent.mutate({
        sessionId: this.sessionId,
        eventType: "utm_tracking",
        path: window.location.pathname,
        metadata: JSON.stringify(this.utmParams),
      });
    }

    // Track initial pageview
    this.trackPageview();

    // Set up event listeners
    this.setupEventListeners(trpcClient);

    // Start heatmap flush interval
    this.startHeatmapFlush(trpcClient);
  }

  private setupEventListeners(trpcClient: ReturnType<typeof trpc.useUtils>) {
    // Track clicks for heatmap
    document.addEventListener("click", (e) => {
      this.trackClick(e, trpcClient);
    });

    // Track mouse movements (throttled)
    let lastMoveTime = 0;
    document.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastMoveTime > 1000) {
        lastMoveTime = now;
        this.heatmapBuffer.push({
          x: e.clientX,
          y: e.clientY + window.scrollY,
          eventType: "move",
        });
      }
    });

    // Track scroll depth
    let lastScrollTime = 0;
    let maxScrollDepth = 0;
    window.addEventListener("scroll", () => {
      const now = Date.now();
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track max scroll depth
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
      }

      if (now - lastScrollTime > 2000) {
        lastScrollTime = now;
        
        trpcClient.client.analytics.trackHeatmap.mutate({
          sessionId: this.sessionId,
          path: window.location.pathname,
          eventType: "scroll",
          scrollDepth: maxScrollDepth,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        });
      }
    });

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.trackPageDuration(trpcClient);
      } else {
        this.pageStartTime = Date.now();
      }
    });

    // Track before unload
    window.addEventListener("beforeunload", () => {
      this.trackPageDuration(trpcClient);
      this.flushHeatmapData(trpcClient);
    });

    // Track time on page milestones
    const milestones = [10, 30, 60, 120, 300]; // seconds
    milestones.forEach((seconds) => {
      setTimeout(() => {
        trpcClient.client.analytics.trackEvent.mutate({
          sessionId: this.sessionId,
          eventType: "time_milestone",
          path: window.location.pathname,
          metadata: JSON.stringify({ seconds }),
        });
      }, seconds * 1000);
    });
  }

  trackPageview() {
    const path = window.location.pathname;
    
    // Track duration of previous page
    if (this.currentPath && this.pageStartTime) {
      const duration = Math.round((Date.now() - this.pageStartTime) / 1000);
    }

    this.currentPath = path;
    this.pageStartTime = Date.now();
  }

  private async trackPageDuration(trpcClient: ReturnType<typeof trpc.useUtils>) {
    if (!this.pageStartTime) return;

    const duration = Math.round((Date.now() - this.pageStartTime) / 1000);
    
    await trpcClient.client.analytics.trackPageview.mutate({
      sessionId: this.sessionId,
      path: this.currentPath,
      title: document.title,
      referrer: document.referrer || undefined,
      duration,
    });
  }

  private trackClick(e: MouseEvent, trpcClient: ReturnType<typeof trpc.useUtils>) {
    const target = e.target as HTMLElement;
    
    // Add to heatmap buffer
    this.heatmapBuffer.push({
      x: e.clientX,
      y: e.clientY + window.scrollY,
      eventType: "click",
    });

    // Track event
    trpcClient.client.analytics.trackEvent.mutate({
      sessionId: this.sessionId,
      eventType: "click",
      elementId: target.id || undefined,
      elementClass: target.className || undefined,
      elementText: target.textContent?.substring(0, 100) || undefined,
      path: window.location.pathname,
      metadata: JSON.stringify({
        userId: this.userId,
        tagName: target.tagName,
      }),
    });
  }

  private startHeatmapFlush(trpcClient: ReturnType<typeof trpc.useUtils>) {
    this.flushInterval = setInterval(() => {
      this.flushHeatmapData(trpcClient);
    }, 10000);
  }

  private flushHeatmapData(trpcClient: ReturnType<typeof trpc.useUtils>) {
    if (this.heatmapBuffer.length === 0) return;

    const data = [...this.heatmapBuffer];
    this.heatmapBuffer = [];

    data.forEach((point) => {
      trpcClient.client.analytics.trackHeatmap.mutate({
        sessionId: this.sessionId,
        path: window.location.pathname,
        eventType: point.eventType,
        x: point.x,
        y: point.y,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    });
  }

  trackEvent(eventName: string, metadata?: Record<string, any>, trpcClient?: ReturnType<typeof trpc.useUtils>) {
    if (!trpcClient) return;

    trpcClient.client.analytics.trackEvent.mutate({
      sessionId: this.sessionId,
      eventType: "custom",
      eventName,
      path: window.location.pathname,
      metadata: metadata ? JSON.stringify({ ...metadata, userId: this.userId }) : JSON.stringify({ userId: this.userId }),
    });
  }

  // Public method to get user ID for other tracking purposes
  getUserId(): string {
    return this.userId;
  }

  // Public method to get session ID
  getSessionId(): string {
    return this.sessionId;
  }

  cleanup() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
  }
}

export const analyticsEnhanced = new EnhancedAnalyticsTracker();

