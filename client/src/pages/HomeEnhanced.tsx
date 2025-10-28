import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ExternalLink, MapPin, Users, Award, Target, Mail, Phone, Code2, Cpu, Zap, Palette, Database, Cloud } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { NumberCounter } from "@/components/NumberCounter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function HomeEnhanced() {
  const { t } = useLanguage();

  const projects = [
    { 
      title: t("portfolio.project1.title"),
      description: t("portfolio.project1.desc"),
      tags: ["React", "Node.js", "PostgreSQL", "AI"],
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      title: t("portfolio.project2.title"),
      description: t("portfolio.project2.desc"),
      tags: ["Next.js", "Python", "TensorFlow", "AWS"],
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      title: t("portfolio.project3.title"),
      description: t("portfolio.project3.desc"),
      tags: ["TypeScript", "Docker", "Kubernetes", "GraphQL"],
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      title: t("portfolio.project4.title"),
      description: t("portfolio.project4.desc"),
      tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const technologies = [
    { name: "React", category: t("tech.category.frontend") },
    { name: "Next.js", category: t("tech.category.framework") },
    { name: "TypeScript", category: t("tech.category.language") },
    { name: "Node.js", category: t("tech.category.backend") },
    { name: "Python", category: t("tech.category.aiml") },
    { name: "TensorFlow", category: t("tech.category.aiml") },
    { name: "PostgreSQL", category: t("tech.category.database") },
    { name: "MongoDB", category: t("tech.category.database") },
    { name: "AWS", category: t("tech.category.cloud") },
    { name: "Docker", category: t("tech.category.devops") },
    { name: "Kubernetes", category: t("tech.category.devops") },
    { name: "GraphQL", category: t("tech.category.api") },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(t("contact.form.success"));
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t("hero.badge")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="group shadow-lg shadow-primary/25">
                {t("hero.cta.primary")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-sm">
                {t("hero.cta.secondary")}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="backdrop-blur-sm bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <NumberCounter end={50} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t("hero.stats.projects")}</div>
              </div>
              <div className="backdrop-blur-sm bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <NumberCounter end={98} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t("hero.stats.satisfaction")}</div>
              </div>
              <div className="backdrop-blur-sm bg-card/50 rounded-lg p-4 border border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">{t("hero.stats.support")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section with Bento Grid */}
      <section id="services" className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("services.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("services.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <BentoGrid>
              <BentoCard
                title={t("services.software.title")}
                description={t("services.software.desc")}
                icon={<Code2 className="w-6 h-6" />}
                gradient="from-blue-500/10 to-cyan-500/10"
                className="md:col-span-2"
              />
              <BentoCard
                title={t("services.ai.title")}
                description={t("services.ai.desc")}
                icon={<Cpu className="w-6 h-6" />}
                gradient="from-purple-500/10 to-pink-500/10"
              />
              <BentoCard
                title={t("services.automation.title")}
                description={t("services.automation.desc")}
                icon={<Zap className="w-6 h-6" />}
                gradient="from-yellow-500/10 to-orange-500/10"
              />
              <BentoCard
                title={t("services.design.title")}
                description={t("services.design.desc")}
                icon={<Palette className="w-6 h-6" />}
                gradient="from-pink-500/10 to-rose-500/10"
                className="md:col-span-2"
              />
              <BentoCard
                title={t("services.data.title")}
                description={t("services.data.desc")}
                icon={<Database className="w-6 h-6" />}
                gradient="from-green-500/10 to-emerald-500/10"
              />
              <BentoCard
                title={t("services.cloud.title")}
                description={t("services.cloud.desc")}
                icon={<Cloud className="w-6 h-6" />}
                gradient="from-cyan-500/10 to-blue-500/10"
              />
            </BentoGrid>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("portfolio.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("portfolio.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border-border/50 hover:border-primary/50 group overflow-hidden hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="hover:bg-primary/20 transition-colors">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="group/btn">
                      {t("portfolio.cta")}
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("tech.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("tech.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <div key={index} className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-110 group cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberCounter end={15} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">{t("tech.stats.count")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberCounter end={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">{t("tech.stats.modern")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">{t("tech.stats.updates")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberCounter end={5} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">{t("tech.stats.experience")}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                  <p>{t("about.p3")}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.highlight1.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("about.highlight1.desc")}</p>
                  </CardContent>
                </Card>
                
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.highlight2.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("about.highlight2.desc")}</p>
                  </CardContent>
                </Card>
                
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.highlight3.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("about.highlight3.desc")}</p>
                  </CardContent>
                </Card>
                
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{t("about.highlight4.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("about.highlight4.desc")}</p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="space-y-4">
                <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t("contact.email")}</h3>
                        <p className="text-sm text-muted-foreground">contact@soco.com.mx</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t("contact.phone")}</h3>
                        <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t("contact.location")}</h3>
                        <p className="text-sm text-muted-foreground">{t("contact.location.value")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>{t("contact.form.title")}</CardTitle>
                    <CardDescription>
                      {t("contact.form.subtitle")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("contact.form.name")}</Label>
                          <Input id="name" placeholder={t("contact.form.name.placeholder")} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("contact.form.email")}</Label>
                          <Input id="email" type="email" placeholder={t("contact.form.email.placeholder")} required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                        <Input id="subject" placeholder={t("contact.form.subject.placeholder")} required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.form.message")}</Label>
                        <Textarea 
                          id="message" 
                          placeholder={t("contact.form.message.placeholder")} 
                          rows={6}
                          required 
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full shadow-lg shadow-primary/25">
                        {t("contact.form.submit")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

