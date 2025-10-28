import Navigation from "@/components/Navigation";
import ServicesNoMotion from "@/components/ServicesNoMotion";
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

const projects = [
  { title: "E-Commerce Platform", description: "Full-stack e-commerce solution with AI-powered recommendations and real-time inventory management.", tags: ["React", "Node.js", "PostgreSQL", "AI"], gradient: "from-blue-500 to-cyan-500" },
  { title: "Healthcare Analytics Dashboard", description: "Advanced analytics platform for healthcare providers with predictive insights and patient data visualization.", tags: ["Next.js", "Python", "TensorFlow", "AWS"], gradient: "from-purple-500 to-pink-500" },
  { title: "Automation Suite", description: "Enterprise automation platform reducing manual processes by 80% through intelligent workflow orchestration.", tags: ["TypeScript", "Docker", "Kubernetes", "GraphQL"], gradient: "from-green-500 to-emerald-500" },
  { title: "FinTech Mobile App", description: "Secure mobile banking application with biometric authentication and real-time transaction processing.", tags: ["React Native", "Node.js", "MongoDB", "Stripe"], gradient: "from-orange-500 to-red-500" },
];

const technologies = [
  { name: "React", category: "Frontend" }, { name: "Next.js", category: "Framework" }, { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" }, { name: "Python", category: "AI/ML" }, { name: "TensorFlow", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" }, { name: "MongoDB", category: "Database" }, { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" }, { name: "Kubernetes", category: "DevOps" }, { name: "GraphQL", category: "API" },
];

export default function HomeNoMotion() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Scene3DSimple />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background -z-5" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Digital Innovation Agency</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Transforming Ideas Into Digital Reality
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mexico City's premier tech integrator specializing in software development, 
              AI research, and intelligent automation solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Our Work
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicesNoMotion />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing our latest work and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.title} className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 group overflow-hidden">
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
                  <Button variant="ghost" size="sm" className="group/btn">
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technologies.map((tech) => (
              <div key={tech.name} className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-110 group">
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

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Modern Stack</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About SOCO</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  We are a Mexico City-based tech integrator specializing in transforming 
                  businesses through innovative digital solutions. Our expertise spans software 
                  development, AI research, and intelligent automation.
                </p>
                <p>
                  Founded with a vision to bridge the gap between cutting-edge technology and 
                  practical business applications, SOCO has grown into a trusted partner for 
                  companies seeking to leverage digital transformation.
                </p>
                <p>
                  Our team of experienced professionals combines technical excellence with 
                  creative problem-solving to deliver solutions that not only meet but exceed 
                  expectations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Mexico City Based</h3>
                  <p className="text-sm text-muted-foreground">Proudly serving clients locally and globally from the heart of Mexico City</p>
                </CardContent>
              </Card>
              
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">Talented developers, designers, and AI specialists dedicated to your success</p>
                </CardContent>
              </Card>
              
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Award Winning</h3>
                  <p className="text-sm text-muted-foreground">Recognized for excellence in digital innovation and client satisfaction</p>
                </CardContent>
              </Card>
              
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Results Driven</h3>
                  <p className="text-sm text-muted-foreground">Focused on delivering measurable outcomes that drive business growth</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can help
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">contact@soco.com.mx</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">Mexico City, CDMX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What's this about?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project..." 
                        rows={6}
                        required 
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full">
                      Send Message
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

