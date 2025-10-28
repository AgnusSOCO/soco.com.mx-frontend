import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Award, Target } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: MapPin,
    title: "Mexico City Based",
    description: "Proudly serving clients locally and globally from the heart of Mexico City",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Talented developers, designers, and AI specialists dedicated to your success",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in digital innovation and client satisfaction",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Focused on delivering measurable outcomes that drive business growth",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About SOCO
            </h2>
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
                expectations. We believe in building long-term partnerships based on trust, 
                transparency, and exceptional results.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

