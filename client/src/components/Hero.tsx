import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Scene3DSimple from "./Scene3DSimple";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3DSimple />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background -z-5" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Digital Innovation Agency</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming Ideas Into Digital Reality
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mexico City's premier tech integrator specializing in software development, 
            AI research, and intelligent automation solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="group">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

