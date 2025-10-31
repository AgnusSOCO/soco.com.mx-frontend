import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Code, 
  Zap, 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Award,
  CheckCircle2,
  ArrowRight,
  Database,
  Workflow,
  BarChart3,
  Globe,
  Calendar,
  FileText,
  Truck,
  Building2,
  Briefcase,
  UserCheck,
  DollarSign,
  ClipboardList,
  MessageSquare,
  Wrench,
  BookOpen,
  Target
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OdooSectionExpanded() {
  const { t } = useLanguage();

  const odooServices = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: t("odoo.services.implementation.title"),
      desc: t("odoo.services.implementation.desc"),
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t("odoo.services.customization.title"),
      desc: t("odoo.services.customization.desc"),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t("odoo.services.migration.title"),
      desc: t("odoo.services.migration.desc"),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: t("odoo.services.integration.title"),
      desc: t("odoo.services.integration.desc"),
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("odoo.services.training.title"),
      desc: t("odoo.services.training.desc"),
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("odoo.services.support.title"),
      desc: t("odoo.services.support.desc"),
      color: "from-yellow-500 to-amber-500"
    }
  ];

  // Expanded module list with better categorization
  const odooModules = [
    // Core Business Modules
    { icon: <ShoppingCart className="w-5 h-5" />, name: t("odoo.modules.sales"), gradient: "from-blue-500 to-cyan-500", category: "core" },
    { icon: <Package className="w-5 h-5" />, name: t("odoo.modules.inventory"), gradient: "from-green-500 to-emerald-500", category: "core" },
    { icon: <BarChart3 className="w-5 h-5" />, name: t("odoo.modules.accounting"), gradient: "from-purple-500 to-pink-500", category: "core" },
    { icon: <Users className="w-5 h-5" />, name: t("odoo.modules.crm"), gradient: "from-orange-500 to-red-500", category: "core" },
    { icon: <TrendingUp className="w-5 h-5" />, name: t("odoo.modules.manufacturing"), gradient: "from-indigo-500 to-purple-500", category: "core" },
    { icon: <Globe className="w-5 h-5" />, name: t("odoo.modules.ecommerce"), gradient: "from-cyan-500 to-blue-500", category: "core" },
    
    // Operations & Logistics
    { icon: <Truck className="w-5 h-5" />, name: t("odoo.modules.purchase"), gradient: "from-teal-500 to-green-500", category: "operations" },
    { icon: <ClipboardList className="w-5 h-5" />, name: t("odoo.modules.project"), gradient: "from-violet-500 to-purple-500", category: "operations" },
    { icon: <Calendar className="w-5 h-5" />, name: t("odoo.modules.planning"), gradient: "from-pink-500 to-red-500", category: "operations" },
    { icon: <Wrench className="w-5 h-5" />, name: t("odoo.modules.maintenance"), gradient: "from-amber-500 to-orange-500", category: "operations" },
    
    // HR & Administration
    { icon: <UserCheck className="w-5 h-5" />, name: t("odoo.modules.hr"), gradient: "from-rose-500 to-pink-500", category: "hr" },
    { icon: <DollarSign className="w-5 h-5" />, name: t("odoo.modules.expenses"), gradient: "from-emerald-500 to-teal-500", category: "hr" },
    { icon: <Calendar className="w-5 h-5" />, name: t("odoo.modules.timeoff"), gradient: "from-sky-500 to-blue-500", category: "hr" },
    { icon: <Target className="w-5 h-5" />, name: t("odoo.modules.recruitment"), gradient: "from-fuchsia-500 to-purple-500", category: "hr" },
    
    // Customer Service & Marketing
    { icon: <MessageSquare className="w-5 h-5" />, name: t("odoo.modules.helpdesk"), gradient: "from-lime-500 to-green-500", category: "service" },
    { icon: <FileText className="w-5 h-5" />, name: t("odoo.modules.documents"), gradient: "from-indigo-500 to-blue-500", category: "service" },
    { icon: <Building2 className="w-5 h-5" />, name: t("odoo.modules.website"), gradient: "from-cyan-500 to-teal-500", category: "service" },
    { icon: <Briefcase className="w-5 h-5" />, name: t("odoo.modules.marketing"), gradient: "from-red-500 to-orange-500", category: "service" },
  ];

  const benefits = [
    t("odoo.benefits.certified"),
    t("odoo.benefits.experience"),
    t("odoo.benefits.custom"),
    t("odoo.benefits.support"),
    t("odoo.benefits.training"),
    t("odoo.benefits.scalable")
  ];

  const industries = [
    { name: t("odoo.industries.manufacturing"), icon: "🏭" },
    { name: t("odoo.industries.retail"), icon: "🛍️" },
    { name: t("odoo.industries.distribution"), icon: "📦" },
    { name: t("odoo.industries.services"), icon: "💼" },
    { name: t("odoo.industries.healthcare"), icon: "🏥" },
    { name: t("odoo.industries.construction"), icon: "🏗️" },
  ];

  return (
    <section id="odoo" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20">
            {t("odoo.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("odoo.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("odoo.subtitle")}
          </p>
        </div>

        {/* Main Value Proposition */}
        <div className="mb-16 animate-fade-in-up">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 hover-lift card-glow">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-8 h-8 text-purple-500" />
                    {t("odoo.partner.title")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("odoo.partner.description")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-3xl font-bold text-purple-500">50+</div>
                      <div className="text-sm text-muted-foreground">{t("odoo.stats.implementations")}</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="text-3xl font-bold text-purple-500">100%</div>
                      <div className="text-sm text-muted-foreground">{t("odoo.stats.satisfaction")}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Odoo Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">{t("odoo.services.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odooServices.map((service, index) => (
              <Card 
                key={index} 
                className="h-full hover:shadow-lg hover:shadow-purple-500/10 smooth-transition border-border/50 hover:border-purple-500/50 group card-glow hover-lift"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-500 transition-colors">
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

        {/* Comprehensive Odoo Modules */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">{t("odoo.modules.title")}</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {t("odoo.modules.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {odooModules.map((module, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg hover:shadow-purple-500/10 smooth-transition border-border/50 hover:border-purple-500/50 group cursor-pointer card-glow hover-lift"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.gradient} flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                    {module.icon}
                  </div>
                  <p className="text-sm font-medium">{module.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              {t("odoo.modules.more")}
            </p>
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">{t("odoo.industries.title")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-lg hover:shadow-purple-500/10 smooth-transition border-border/50 hover:border-purple-500/50 group card-glow hover-lift"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{industry.icon}</div>
                  <p className="text-sm font-medium">{industry.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 card-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">{t("odoo.whychoose.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">{t("odoo.whychoose.expertise.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("odoo.whychoose.expertise.desc")}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">{t("odoo.whychoose.results.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("odoo.whychoose.results.desc")}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">{t("odoo.whychoose.agile.title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("odoo.whychoose.agile.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 inline-block hover-lift card-glow animate-subtle-pulse">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t("odoo.cta.title")}</h3>
              <p className="text-muted-foreground mb-6 max-w-xl">
                {t("odoo.cta.description")}
              </p>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600">
                {t("odoo.cta.button")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
