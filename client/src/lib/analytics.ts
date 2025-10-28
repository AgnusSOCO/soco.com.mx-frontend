import { trpc } from "./trpc";
import { nanoid } from "nanoid";

class AnalyticsTracker {
  private sessionId: string;
  private pageStartTime: number = 0;
  private currentPath: string = "";
  private heatmapBuffer: Array<{
    x: number;
    y: number;
    eventType: string;
  }> = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private initialized: boolean = false;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    const stored = sessionStorage.getItem("analytics_session_id");
    if (stored) return stored;

    const newId = nanoid();
    sessionStorage.setItem("analytics_session_id", newId);
    return newId;
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

    // Create session
    await trpcClient.client.analytics.createSession.mutate({
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      device: this.detectDevice(),
      browser: this.detectBrowser(),
      os: this.detectOS(),
      referrer: document.referrer || undefined,
      landingPage: window.location.pathname,
    });

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
      if (now - lastMoveTime > 1000) { // Throttle to once per second
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
    window.addEventListener("scroll", () => {
      const now = Date.now();
      if (now - lastScrollTime > 2000) { // Throttle to once per 2 seconds
        lastScrollTime = now;
        const scrollDepth = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        trpcClient.client.analytics.trackHeatmap.mutate({
          sessionId: this.sessionId,
          path: window.location.pathname,
          eventType: "scroll",
          scrollDepth,
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
  }

  trackPageview() {
    const path = window.location.pathname;
    
    // Track duration of previous page
    if (this.currentPath && this.pageStartTime) {
      const duration = Math.round((Date.now() - this.pageStartTime) / 1000);
      // We'll track this when we have trpcClient available
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
    });
  }

  private startHeatmapFlush(trpcClient: ReturnType<typeof trpc.useUtils>) {
    // Flush heatmap data every 10 seconds
    this.flushInterval = setInterval(() => {
      this.flushHeatmapData(trpcClient);
    }, 10000);
  }

  private flushHeatmapData(trpcClient: ReturnType<typeof trpc.useUtils>) {
    if (this.heatmapBuffer.length === 0) return;

    const data = [...this.heatmapBuffer];
    this.heatmapBuffer = [];

    // Send heatmap data in batches
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
      metadata: metadata ? JSON.stringify(metadata) : undefined,
    });
  }

  cleanup() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
  }
}

export const analytics = new AnalyticsTracker();

