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
  Globe
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OdooSection() {
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

  const odooModules = [
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      name: t("odoo.modules.sales"),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Package className="w-5 h-5" />,
      name: t("odoo.modules.inventory"),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      name: t("odoo.modules.accounting"),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-5 h-5" />,
      name: t("odoo.modules.crm"),
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      name: t("odoo.modules.manufacturing"),
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      name: t("odoo.modules.ecommerce"),
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const benefits = [
    t("odoo.benefits.certified"),
    t("odoo.benefits.experience"),
    t("odoo.benefits.custom"),
    t("odoo.benefits.support"),
    t("odoo.benefits.training"),
    t("odoo.benefits.scalable")
  ];

  return (
    <section id="odoo" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
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
        <div className="mb-16">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
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
                className="h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-border/50 hover:border-purple-500/50 group"
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

        {/* Odoo Modules Expertise */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">{t("odoo.modules.title")}</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("odoo.modules.subtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {odooModules.map((module, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border-border/50 hover:border-purple-500/50 group cursor-pointer"
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
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 inline-block">
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
