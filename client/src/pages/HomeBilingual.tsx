import Navigation from "@/components/Navigation";
import EnhancedHero from "@/components/EnhancedHero";
import ServicesNoMotion from "@/components/ServicesNoMotion";
import OdooSectionExpanded from "@/components/OdooSectionExpanded";
import TechStackSphere from "@/components/TechStackSphere";
import Interactive3DBuilding from "@/components/Interactive3DBuilding";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ExternalLink, MapPin, Users, Award, Target, Mail, Phone } from "lucide-react";
import Scene3DSimple from "@/components/Scene3DSimple";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function HomeBilingual() {
  const { t, language } = useLanguage();

  const projects = [
    { 
      id: "ecommerce",
      title: t("portfolio.project1.title"),
      description: t("portfolio.project1.desc"),
      tags: ["React", "Node.js", "PostgreSQL", "AI"],
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      id: "health-analytics",
      title: t("portfolio.project2.title"),
      description: t("portfolio.project2.desc"),
      tags: ["Next.js", "Python", "TensorFlow", "AWS"],
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      id: "automation-suite",
      title: t("portfolio.project3.title"),
      description: t("portfolio.project3.desc"),
      tags: ["TypeScript", "Docker", "Kubernetes", "GraphQL"],
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      id: "fintech-app",
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
      
      {/* Enhanced Hero Section */}
      <EnhancedHero />
      
      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💻", title: t("services.software.title"), desc: t("services.software.desc"), color: "from-blue-500 to-cyan-500" },
              { icon: "🤖", title: t("services.ai.title"), desc: t("services.ai.desc"), color: "from-purple-500 to-pink-500" },
              { icon: "⚡", title: t("services.automation.title"), desc: t("services.automation.desc"), color: "from-yellow-500 to-orange-500" },
              { icon: "🎨", title: t("services.design.title"), desc: t("services.design.desc"), color: "from-pink-500 to-rose-500" },
              { icon: "📊", title: t("services.data.title"), desc: t("services.data.desc"), color: "from-green-500 to-emerald-500" },
              { icon: "☁️", title: t("services.cloud.title"), desc: t("services.cloud.desc"), color: "from-cyan-500 to-blue-500" },
            ].map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg hover:shadow-primary/10 smooth-transition border-border/50 hover:border-primary/50 group card-glow hover-lift">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-2xl`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {service.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Odoo Section */}
      <OdooSectionExpanded />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("portfolio.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="h-full hover:shadow-lg hover:shadow-primary/10 smooth-transition border-border/50 hover:border-primary/50 group overflow-hidden card-glow hover-lift">
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
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Link href={`/case-study/${project.id}`}>
                    <Button variant="ghost" size="sm" className="group/btn">
                      {t("portfolio.cta")}
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Tech Stack Sphere */}
      <TechStackSphere />

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container">
          <Interactive3DBuilding />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-4">
              <Card className="border-border/50 card-glow hover-lift">
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

              <Card className="border-border/50 card-glow hover-lift">
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

              <Card className="border-border/50 card-glow hover-lift">
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
              <Card className="border-border/50 card-glow hover-lift">
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
                    
                    <Button type="submit" size="lg" className="w-full">
                      {t("contact.form.submit")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

