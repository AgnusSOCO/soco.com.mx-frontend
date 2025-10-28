import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useState, useRef, useMemo, Suspense } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

interface Tech {
  name: string;
  category: string;
  color: string;
  logo: string;
}

const technologies: Tech[] = [
  // Frontend
  { name: "React", category: "Frontend", color: "#61DAFB", logo: "react" },
  { name: "Next.js", category: "Frontend", color: "#000000", logo: "nextjs" },
  { name: "Vue.js", category: "Frontend", color: "#4FC08D", logo: "vue" },
  { name: "Angular", category: "Frontend", color: "#DD0031", logo: "angular" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", logo: "typescript" },
  { name: "Tailwind", category: "Frontend", color: "#06B6D4", logo: "tailwind" },
  
  // Backend
  { name: "Node.js", category: "Backend", color: "#339933", logo: "nodejs" },
  { name: "Python", category: "Backend", color: "#3776AB", logo: "python" },
  { name: "Django", category: "Backend", color: "#092E20", logo: "django" },
  { name: "FastAPI", category: "Backend", color: "#009688", logo: "fastapi" },
  { name: "Go", category: "Backend", color: "#00ADD8", logo: "go" },
  { name: "Rust", category: "Backend", color: "#000000", logo: "rust" },
  
  // Database
  { name: "PostgreSQL", category: "Database", color: "#336791", logo: "postgresql" },
  { name: "MongoDB", category: "Database", color: "#47A248", logo: "mongodb" },
  { name: "Redis", category: "Database", color: "#DC382D", logo: "redis" },
  { name: "MySQL", category: "Database", color: "#4479A1", logo: "mysql" },
  
  // Cloud
  { name: "AWS", category: "Cloud", color: "#FF9900", logo: "aws" },
  { name: "Azure", category: "Cloud", color: "#0078D4", logo: "azure" },
  { name: "GCP", category: "Cloud", color: "#4285F4", logo: "gcp" },
  
  // DevOps
  { name: "Docker", category: "DevOps", color: "#2496ED", logo: "docker" },
  { name: "Kubernetes", category: "DevOps", color: "#326CE5", logo: "kubernetes" },
  { name: "Terraform", category: "DevOps", color: "#7B42BC", logo: "terraform" },
  
  // AI/ML
  { name: "TensorFlow", category: "AI/ML", color: "#FF6F00", logo: "tensorflow" },
  { name: "PyTorch", category: "AI/ML", color: "#EE4C2C", logo: "pytorch" },
  { name: "OpenAI", category: "AI/ML", color: "#412991", logo: "openai" },
  
  // Mobile
  { name: "React Native", category: "Mobile", color: "#61DAFB", logo: "reactnative" },
  { name: "Flutter", category: "Mobile", color: "#02569B", logo: "flutter" },
];

function TechNode({ tech, position, onClick, isSelected }: { 
  tech: Tech; 
  position: [number, number, number]; 
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scale = isSelected ? 1.5 : hovered ? 1.2 : 1;

  return (
    <group position={position}>
      {/* Glow sphere behind logo */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3 * scale, 32, 32]} />
        <meshStandardMaterial 
          color={tech.color} 
          emissive={tech.color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Logo as HTML overlay */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={8}
        style={{
          transition: 'all 0.2s',
          pointerEvents: 'none',
        }}
      >
        <div 
          style={{
            width: `${40 * scale}px`,
            height: `${40 * scale}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${tech.color}20`,
            borderRadius: '50%',
            border: `2px solid ${tech.color}`,
            boxShadow: isSelected || hovered ? `0 0 20px ${tech.color}` : 'none',
          }}
        >
          <img 
            src={`/tech-logos/${tech.logo}.svg`}
            alt={tech.name}
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              // Fallback to showing first letter if logo fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div style="color: white; font-size: 20px; font-weight: bold;">${tech.name[0]}</div>`;
              }
            }}
          />
        </div>
      </Html>

      {/* Label */}
      {(hovered || isSelected) && (
        <Html
          position={[0, 0.6, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            border: `1px solid ${tech.color}`,
          }}>
            {tech.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function TechSphere({ selectedCategory }: { selectedCategory: string | null }) {
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);
  
  const filteredTechs = useMemo(() => {
    if (!selectedCategory) return technologies;
    return technologies.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  // Distribute technologies in a sphere pattern
  const techPositions = useMemo(() => {
    return filteredTechs.map((_, index) => {
      const total = filteredTechs.length;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 3.5;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, [filteredTechs]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <pointLight position={[0, 0, 10]} intensity={0.8} color="#0ea5e9" />
      
      {/* Center wireframe sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.05}
          wireframe
        />
      </mesh>

      {/* Tech nodes */}
      <Suspense fallback={null}>
        {filteredTechs.map((tech, index) => (
          <TechNode
            key={tech.name}
            tech={tech}
            position={techPositions[index]}
            onClick={() => setSelectedTech(tech)}
            isSelected={selectedTech?.name === tech.name}
          />
        ))}
      </Suspense>

      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={6}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </>
  );
}

export default function TechStackSphere() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Frontend", color: "from-blue-500 to-cyan-500" },
    { name: "Backend", color: "from-green-500 to-emerald-500" },
    { name: "Database", color: "from-purple-500 to-pink-500" },
    { name: "Cloud", color: "from-orange-500 to-red-500" },
    { name: "DevOps", color: "from-indigo-500 to-blue-500" },
    { name: "AI/ML", color: "from-violet-500 to-purple-500" },
    { name: "Mobile", color: "from-cyan-500 to-teal-500" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t("tech.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("tech.subtitle")}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {t("tech.all") || "Todos"} ({technologies.length})
          </button>
          {categories.map((cat) => {
            const count = technologies.filter(t => t.category === cat.name).length;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* 3D Sphere Viewer */}
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-b from-background to-secondary/20 border border-border shadow-2xl">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <TechSphere selectedCategory={selectedCategory} />
          </Canvas>
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-6 py-3 rounded-full border border-border shadow-lg">
            <p className="text-sm text-muted-foreground flex items-center gap-4">
              <span>🖱️ Drag to rotate</span>
              <span className="text-border">•</span>
              <span>🔍 Scroll to zoom</span>
              <span className="text-border">•</span>
              <span>🎯 Click nodes to explore</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
              {technologies.length}+
            </div>
            <div className="text-sm text-muted-foreground">{t("tech.stats.technologies") || "Tecnologías"}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {categories.length}+
            </div>
            <div className="text-sm text-muted-foreground">{t("tech.stats.categories") || "Categorías"}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-sm text-muted-foreground">{t("tech.stats.modern") || "Stack Moderno"}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">{t("tech.stats.updates") || "Actualizaciones"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

