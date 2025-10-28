import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedBackground } from "./AnimatedBackground";
import { NumberCounter } from "./NumberCounter";
import { Sparkles, Rocket, Zap, Target } from "lucide-react";

export default function EnhancedHero() {
  const { t } = useLanguage();

  const features = [
    { icon: Rocket, label: t("hero.features.innovation") },
    { icon: Zap, label: t("hero.features.speed") },
    { icon: Target, label: t("hero.features.precision") },
    { icon: Sparkles, label: t("hero.features.quality") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("hero.badge")}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl">
              {t("hero.subtitle")}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <feature.icon className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {t("hero.cta.primary")}
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-primary/10 transition-all duration-300"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  <NumberCounter end={50} duration={2000} />+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.projects")}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  <NumberCounter end={98} duration={2000} />%
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.satisfaction")}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.support")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative hidden lg:block">
            {/* Floating Cards */}
            <div className="relative w-full h-[600px]">
              {/* Card 1 - Top Left */}
              <div className="absolute top-0 left-0 w-64 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 backdrop-blur-sm p-6 animate-float shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      <NumberCounter end={150} duration={2000} />+
                    </div>
                    <div className="text-sm text-muted-foreground">{t("hero.cards.clients")}</div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Top Right */}
              <div className="absolute top-20 right-0 w-64 h-48 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border border-accent/30 backdrop-blur-sm p-6 animate-float-delayed shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      <NumberCounter end={500} duration={2000} />+
                    </div>
                    <div className="text-sm text-muted-foreground">{t("hero.cards.projects")}</div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Bottom Center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-52 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl border border-primary/40 backdrop-blur-sm p-6 animate-float shadow-2xl">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">
                    <NumberCounter end={4} duration={2000} />+
                  </div>
                  <div className="text-sm text-muted-foreground">{t("hero.cards.experience")}</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}

