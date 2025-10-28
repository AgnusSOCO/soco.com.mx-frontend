import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedSection } from "./AnimatedSection";
import { NumberCounter } from "./NumberCounter";

// Comprehensive technology list
const technologies = [
  // Frontend
  { name: "React", cat: "Frontend", color: "#61DAFB" },
  { name: "Next.js", cat: "Frontend", color: "#000000" },
  { name: "Vue.js", cat: "Frontend", color: "#4FC08D" },
  { name: "Angular", cat: "Frontend", color: "#DD0031" },
  { name: "Svelte", cat: "Frontend", color: "#FF3E00" },
  { name: "TypeScript", cat: "Frontend", color: "#3178C6" },
  { name: "Tailwind CSS", cat: "Frontend", color: "#06B6D4" },
  { name: "Redux", cat: "Frontend", color: "#764ABC" },
  
  // Backend
  { name: "Node.js", cat: "Backend", color: "#339933" },
  { name: "Python", cat: "Backend", color: "#3776AB" },
  { name: "Django", cat: "Backend", color: "#092E20" },
  { name: "FastAPI", cat: "Backend", color: "#009688" },
  { name: "Express", cat: "Backend", color: "#000000" },
  { name: "NestJS", cat: "Backend", color: "#E0234E" },
  { name: "Go", cat: "Backend", color: "#00ADD8" },
  { name: "Rust", cat: "Backend", color: "#000000" },
  { name: "Java", cat: "Backend", color: "#007396" },
  { name: "Spring Boot", cat: "Backend", color: "#6DB33F" },
  { name: "PHP", cat: "Backend", color: "#777BB4" },
  { name: "Laravel", cat: "Backend", color: "#FF2D20" },
  
  // Databases
  { name: "PostgreSQL", cat: "Database", color: "#336791" },
  { name: "MongoDB", cat: "Database", color: "#47A248" },
  { name: "MySQL", cat: "Database", color: "#4479A1" },
  { name: "Redis", cat: "Database", color: "#DC382D" },
  { name: "Elasticsearch", cat: "Database", color: "#005571" },
  { name: "Cassandra", cat: "Database", color: "#1287B1" },
  { name: "DynamoDB", cat: "Database", color: "#4053D6" },
  { name: "Firebase", cat: "Database", color: "#FFCA28" },
  
  // Cloud & DevOps
  { name: "AWS", cat: "Cloud", color: "#FF9900" },
  { name: "Google Cloud", cat: "Cloud", color: "#4285F4" },
  { name: "Azure", cat: "Cloud", color: "#0078D4" },
  { name: "Docker", cat: "DevOps", color: "#2496ED" },
  { name: "Kubernetes", cat: "DevOps", color: "#326CE5" },
  { name: "Terraform", cat: "DevOps", color: "#7B42BC" },
  { name: "Jenkins", cat: "DevOps", color: "#D24939" },
  { name: "GitHub Actions", cat: "DevOps", color: "#2088FF" },
  { name: "GitLab CI", cat: "DevOps", color: "#FC6D26" },
  
  // AI & ML
  { name: "TensorFlow", cat: "IA/ML", color: "#FF6F00" },
  { name: "PyTorch", cat: "IA/ML", color: "#EE4C2C" },
  { name: "OpenAI", cat: "IA/ML", color: "#412991" },
  { name: "Hugging Face", cat: "IA/ML", color: "#FFD21E" },
  { name: "LangChain", cat: "IA/ML", color: "#1C3C3C" },
  { name: "Scikit-learn", cat: "IA/ML", color: "#F7931E" },
  { name: "Pandas", cat: "IA/ML", color: "#150458" },
  { name: "NumPy", cat: "IA/ML", color: "#013243" },
  
  // Mobile
  { name: "React Native", cat: "Mobile", color: "#61DAFB" },
  { name: "Flutter", cat: "Mobile", color: "#02569B" },
  { name: "Swift", cat: "Mobile", color: "#FA7343" },
  { name: "Kotlin", cat: "Mobile", color: "#7F52FF" },
  
  // Tools & Others
  { name: "GraphQL", cat: "API", color: "#E10098" },
  { name: "REST API", cat: "API", color: "#009688" },
  { name: "WebSockets", cat: "API", color: "#010101" },
  { name: "Git", cat: "Tools", color: "#F05032" },
  { name: "Figma", cat: "Design", color: "#F24E1E" },
  { name: "Webpack", cat: "Tools", color: "#8DD6F9" },
  { name: "Vite", cat: "Tools", color: "#646CFF" },
];

export default function EnhancedTechStack() {
  const { t } = useLanguage();

  // Group technologies by category
  const categories = Array.from(new Set(technologies.map(t => t.cat)));

  return (
    <section id="technologies" className="py-20 bg-background">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("techStack.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("techStack.subtitle")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <NumberCounter end={technologies.length} duration={2000} />+
              </div>
              <div className="text-muted-foreground">{t("techStack.stats.technologies")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <NumberCounter end={categories.length} duration={2000} />+
              </div>
              <div className="text-muted-foreground">{t("techStack.stats.categories")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <NumberCounter end={100} duration={2000} />%
              </div>
              <div className="text-muted-foreground">{t("techStack.stats.modern")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <NumberCounter end={24} duration={2000} />/7
              </div>
              <div className="text-muted-foreground">{t("techStack.stats.support")}</div>
            </div>
          </div>

          {/* Technologies by Category */}
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryTechs = technologies.filter(t => t.cat === category);
              return (
                <div key={category}>
                  <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categoryTechs.map((tech) => (
                      <div
                        key={tech.name}
                        className="group relative bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="flex flex-col items-center gap-3">
                          {/* Tech Icon/

Logo */}
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors duration-300"
                            style={{ 
                              backgroundColor: `${tech.color}15`,
                              color: tech.color 
                            }}
                          >
                            {tech.name.charAt(0)}
                          </div>
                          
                          {/* Tech Name */}
                          <span className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                        
                        {/* Hover Effect */}
                        <div 
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${tech.color}10 0%, transparent 70%)`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

