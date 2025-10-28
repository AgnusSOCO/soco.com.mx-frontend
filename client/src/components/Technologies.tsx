import { motion } from "framer-motion";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "GraphQL", category: "API" },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-24">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology Stack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable solutions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="group"
            >
              <div className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {tech.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional tech categories */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}

