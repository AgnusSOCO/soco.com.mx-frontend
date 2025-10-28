import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, Zap, Palette, Database, Cloud } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Software Development",
    description: "Custom web and mobile applications built with cutting-edge technologies and best practices.",
    color: "text-blue-500",
  },
  {
    icon: Brain,
    title: "AI Research & Integration",
    description: "Advanced machine learning solutions and AI-powered systems tailored to your business needs.",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "Streamline operations with intelligent automation that saves time and reduces costs.",
    color: "text-yellow-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement.",
    color: "text-pink-500",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Robust data pipelines and analytics solutions for data-driven decision making.",
    color: "text-green-500",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and DevOps practices for modern applications.",
    color: "text-cyan-500",
  },
];

export default function ServicesNoMotion() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to power your business forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

