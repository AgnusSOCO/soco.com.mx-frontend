import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with AI-powered recommendations and real-time inventory management.",
    tags: ["React", "Node.js", "PostgreSQL", "AI"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Healthcare Analytics Dashboard",
    description: "Advanced analytics platform for healthcare providers with predictive insights and patient data visualization.",
    tags: ["Next.js", "Python", "TensorFlow", "AWS"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Automation Suite",
    description: "Enterprise automation platform reducing manual processes by 80% through intelligent workflow orchestration.",
    tags: ["TypeScript", "Docker", "Kubernetes", "GraphQL"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "FinTech Mobile App",
    description: "Secure mobile banking application with biometric authentication and real-time transaction processing.",
    tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-orange-500 to-red-500",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our latest work and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 group overflow-hidden">
                {/* Gradient Header */}
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
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group/btn">
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

