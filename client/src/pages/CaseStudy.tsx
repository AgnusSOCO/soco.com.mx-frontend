import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink, Calendar, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const caseStudies = {
  "ecommerce": {
    title: {
      es: "Plataforma de E-Commerce",
      en: "E-Commerce Platform"
    },
    description: {
      es: "Solución de e-commerce completa con recomendaciones impulsadas por IA y gestión de inventario en tiempo real.",
      en: "Complete e-commerce solution with AI-powered recommendations and real-time inventory management."
    },
    challenge: {
      es: "El cliente necesitaba una plataforma escalable que pudiera manejar miles de productos y proporcionar recomendaciones personalizadas a los usuarios.",
      en: "The client needed a scalable platform that could handle thousands of products and provide personalized recommendations to users."
    },
    solution: {
      es: "Desarrollamos una arquitectura de microservicios con React en el frontend, Node.js en el backend, y un sistema de recomendaciones basado en IA utilizando TensorFlow.",
      en: "We developed a microservices architecture with React on the frontend, Node.js on the backend, and an AI-based recommendation system using TensorFlow."
    },
    results: [
      { metric: "300%", label: { es: "Aumento en ventas", en: "Increase in sales" } },
      { metric: "50%", label: { es: "Reducción en tiempo de carga", en: "Reduction in load time" } },
      { metric: "95%", label: { es: "Satisfacción del cliente", en: "Customer satisfaction" } },
      { metric: "10K+", label: { es: "Usuarios activos diarios", en: "Daily active users" } }
    ],
    tech: ["React", "Node.js", "PostgreSQL", "AI"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop",
    client: "RetailCo",
    duration: { es: "6 meses", en: "6 months" },
    team: "8",
    category: { es: "E-Commerce", en: "E-Commerce" }
  },
  "health-analytics": {
    title: {
      es: "Dashboard de Análisis de Salud",
      en: "Health Analytics Dashboard"
    },
    description: {
      es: "Plataforma de análisis avanzada para proveedores de salud con insights predictivos y visualización de datos de pacientes.",
      en: "Advanced analytics platform for healthcare providers with predictive insights and patient data visualization."
    },
    challenge: {
      es: "Los proveedores de salud necesitaban una forma de visualizar y analizar grandes volúmenes de datos de pacientes para mejorar los resultados de atención.",
      en: "Healthcare providers needed a way to visualize and analyze large volumes of patient data to improve care outcomes."
    },
    solution: {
      es: "Creamos un dashboard interactivo con Next.js y Python, integrando modelos de ML para predicción de riesgos y análisis de tendencias.",
      en: "We created an interactive dashboard with Next.js and Python, integrating ML models for risk prediction and trend analysis."
    },
    results: [
      { metric: "40%", label: { es: "Mejora en diagnósticos tempranos", en: "Improvement in early diagnosis" } },
      { metric: "60%", label: { es: "Reducción en readmisiones", en: "Reduction in readmissions" } },
      { metric: "99.9%", label: { es: "Uptime del sistema", en: "System uptime" } },
      { metric: "50K+", label: { es: "Pacientes monitoreados", en: "Patients monitored" } }
    ],
    tech: ["Next.js", "Python", "TensorFlow", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    client: "HealthTech Solutions",
    duration: { es: "8 meses", en: "8 months" },
    team: "12",
    category: { es: "Salud", en: "Healthcare" }
  },
  "automation-suite": {
    title: {
      es: "Suite de Automatización",
      en: "Automation Suite"
    },
    description: {
      es: "Plataforma de automatización empresarial que reduce procesos manuales en un 80% mediante orquestación inteligente de flujos de trabajo.",
      en: "Enterprise automation platform that reduces manual processes by 80% through intelligent workflow orchestration."
    },
    challenge: {
      es: "La empresa enfrentaba ineficiencias operativas debido a procesos manuales repetitivos que consumían tiempo y recursos.",
      en: "The company faced operational inefficiencies due to repetitive manual processes that consumed time and resources."
    },
    solution: {
      es: "Implementamos una suite de automatización con TypeScript, Docker y Kubernetes, permitiendo la orquestación de flujos de trabajo complejos.",
      en: "We implemented an automation suite with TypeScript, Docker, and Kubernetes, enabling orchestration of complex workflows."
    },
    results: [
      { metric: "80%", label: { es: "Reducción en procesos manuales", en: "Reduction in manual processes" } },
      { metric: "5x", label: { es: "Aumento en productividad", en: "Increase in productivity" } },
      { metric: "$2M", label: { es: "Ahorro anual", en: "Annual savings" } },
      { metric: "200+", label: { es: "Flujos automatizados", en: "Automated workflows" } }
    ],
    tech: ["TypeScript", "Docker", "Kubernetes", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    client: "Enterprise Corp",
    duration: { es: "10 meses", en: "10 months" },
    team: "10",
    category: { es: "Automatización", en: "Automation" }
  },
  "fintech-app": {
    title: {
      es: "App Móvil FinTech",
      en: "FinTech Mobile App"
    },
    description: {
      es: "Aplicación bancaria móvil segura con autenticación biométrica y procesamiento de transacciones en tiempo real.",
      en: "Secure mobile banking app with biometric authentication and real-time transaction processing."
    },
    challenge: {
      es: "El cliente necesitaba una aplicación móvil segura y fácil de usar que cumpliera con las regulaciones financieras estrictas.",
      en: "The client needed a secure and user-friendly mobile app that complied with strict financial regulations."
    },
    solution: {
      es: "Desarrollamos una app nativa con React Native, integrando autenticación biométrica, encriptación end-to-end y procesamiento de pagos con Stripe.",
      en: "We developed a native app with React Native, integrating biometric authentication, end-to-end encryption, and payment processing with Stripe."
    },
    results: [
      { metric: "100K+", label: { es: "Descargas en 3 meses", en: "Downloads in 3 months" } },
      { metric: "4.8★", label: { es: "Calificación en stores", en: "App store rating" } },
      { metric: "0", label: { es: "Brechas de seguridad", en: "Security breaches" } },
      { metric: "$50M+", label: { es: "Transacciones procesadas", en: "Transactions processed" } }
    ],
    tech: ["React Native", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    client: "FinTech Innovations",
    duration: { es: "7 meses", en: "7 months" },
    team: "9",
    category: { es: "FinTech", en: "FinTech" }
  }
};

export default function CaseStudy() {
  const [, params] = useRoute("/case-study/:id");
  const { t, language } = useLanguage();
  const caseStudy = params?.id ? caseStudies[params.id as keyof typeof caseStudies] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{language === "es" ? "Caso de Estudio No Encontrado" : "Case Study Not Found"}</h1>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "es" ? "Volver al Inicio" : "Back to Home"}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const lang = language as "es" | "en";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={caseStudy.image} 
            alt={caseStudy.title[lang]}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container pb-12">
              <Link href="/#portfolio">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === "es" ? "Volver a Proyectos" : "Back to Projects"}
                </Button>
              </Link>
              <Badge className="mb-4">{caseStudy.category[lang]}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseStudy.title[lang]}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">{caseStudy.description[lang]}</p>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="container mt-12">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{language === "es" ? "Duración" : "Duration"}</div>
                <div className="font-semibold">{caseStudy.duration[lang]}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{language === "es" ? "Equipo" : "Team Size"}</div>
                <div className="font-semibold">{caseStudy.team} {language === "es" ? "personas" : "people"}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{language === "es" ? "Cliente" : "Client"}</div>
                <div className="font-semibold">{caseStudy.client}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{language === "es" ? "Tecnologías" : "Technologies"}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {caseStudy.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{language === "es" ? "El Desafío" : "The Challenge"}</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge[lang]}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{language === "es" ? "La Solución" : "The Solution"}</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.solution[lang]}</p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{language === "es" ? "Resultados" : "Results"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{result.metric}</div>
                  <div className="text-sm text-muted-foreground">{result.label[lang]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              {language === "es" ? "¿Listo para tu próximo proyecto?" : "Ready for your next project?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === "es" 
                ? "Hablemos de cómo podemos ayudarte a alcanzar tus objetivos empresariales"
                : "Let's talk about how we can help you achieve your business goals"}
            </p>
            <Link href="/#contact">
              <Button size="lg" className="group">
                {language === "es" ? "Contáctanos" : "Contact Us"}
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

