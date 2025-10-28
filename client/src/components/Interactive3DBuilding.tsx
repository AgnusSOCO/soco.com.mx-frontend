import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as THREE from "three";

// 3D Building Component
function Building({ onClick, activeFloor }: { onClick: (floor: number) => void; activeFloor: number | null }) {
  const buildingRef = useRef<THREE.Group>(null);

  const floors = [
    { y: 0, color: "#06b6d4", label: "Mission" },
    { y: 1.5, color: "#8b5cf6", label: "Vision" },
    { y: 3, color: "#10b981", label: "Team" },
    { y: 4.5, color: "#f59e0b", label: "Innovation" },
  ];

  return (
    <group ref={buildingRef}>
      {/* Base platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3.5, 0.3, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Building floors */}
      {floors.map((floor, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, floor.y, 0]}>
            {/* Floor */}
            <mesh
              onClick={() => onClick(index)}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[2.5 - index * 0.3, 1.2, 2.5 - index * 0.3]} />
              <meshStandardMaterial
                color={activeFloor === index ? floor.color : "#334155"}
                emissive={activeFloor === index ? floor.color : "#000000"}
                emissiveIntensity={activeFloor === index ? 0.5 : 0}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>

            {/* Floor label */}
            <Text
              position={[0, 0.7, 1.3 - index * 0.15]}
              fontSize={0.2}
              color={activeFloor === index ? "#ffffff" : "#94a3b8"}
              anchorX="center"
              anchorY="middle"
            >
              {floor.label}
            </Text>

            {/* Glowing particles around active floor */}
            {activeFloor === index && (
              <>
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const radius = 1.5 - index * 0.2;
                  return (
                    <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.5}>
                      <mesh position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                          color={floor.color}
                          emissive={floor.color}
                          emissiveIntensity={1}
                        />
                      </mesh>
                    </Float>
                  );
                })}
              </>
            )}
          </group>
        </Float>
      ))}

      {/* Top sphere - Excellence */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 6.5, 0]} onClick={() => onClick(4)} castShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color={activeFloor === 4 ? "#ec4899" : "#475569"}
            emissive={activeFloor === 4 ? "#ec4899" : "#000000"}
            emissiveIntensity={activeFloor === 4 ? 0.6 : 0}
            distort={0.3}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, 7.5, 0]}
          fontSize={0.2}
          color={activeFloor === 4 ? "#ffffff" : "#94a3b8"}
          anchorX="center"
          anchorY="middle"
        >
          Excellence
        </Text>
      </Float>

      {/* Orbiting ring - Global Reach */}
      <group position={[0, 3, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh onClick={() => onClick(5)}>
          <torusGeometry args={[3.5, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={activeFloor === 5 ? "#3b82f6" : "#64748b"}
            emissive={activeFloor === 5 ? "#3b82f6" : "#000000"}
            emissiveIntensity={activeFloor === 5 ? 0.5 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Ambient lights */}
      <pointLight position={[5, 8, 5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-5, 8, -5]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
}

export default function Interactive3DBuilding() {
  const { t } = useLanguage();
  const [activeFloor, setActiveFloor] = useState<number | null>(null);

  const floorContent = [
    { title: t("about.mission"), content: t("about.missionContent"), icon: "🎯" },
    { title: t("about.vision"), content: t("about.visionContent"), icon: "🔭" },
    { title: t("about.team"), content: t("about.teamContent"), icon: "👥" },
    { title: t("about.innovation"), content: t("about.innovationContent"), icon: "💡" },
    { title: t("about.excellence"), content: t("about.excellenceContent"), icon: "⭐" },
    { title: t("about.global"), content: t("about.globalContent"), icon: "🌍" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">{t("about.title")}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 3D Building Visualization */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-background via-muted/20 to-background rounded-2xl border border-border/50 overflow-hidden">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[8, 6, 8]} />
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={10}
                maxDistance={20}
                autoRotate
                autoRotateSpeed={0.5}
              />
              
              <ambientLight intensity={0.3} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              
              <Building onClick={setActiveFloor} activeFloor={activeFloor} />
              
              {/* Grid floor */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.8} />
              </mesh>
            </Canvas>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 text-sm text-muted-foreground flex items-center gap-4">
            <span>🖱️ {t("about.dragToRotate")}</span>
            <span>•</span>
            <span>🔍 {t("about.scrollToZoom")}</span>
            <span>•</span>
            <span>🏢 {t("about.clickCards")}</span>
          </div>
        </div>

        {/* Content Display */}
        <div className="space-y-4">
          {activeFloor !== null ? (
            <Card className="border-primary/50 shadow-lg shadow-primary/10">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{floorContent[activeFloor].icon}</div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{floorContent[activeFloor].title}</h3>
                      <Badge variant="outline" className="border-primary text-primary">
                        {activeFloor === 4 ? "Top" : activeFloor === 5 ? "Global" : `Floor ${activeFloor + 1}`}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {floorContent[activeFloor].content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏢</div>
                  <h3 className="text-xl font-semibold">{t("about.title")}</h3>
                  <p className="text-muted-foreground">
                    Click on different parts of the building to explore our company values and vision
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick overview cards */}
          <div className="grid grid-cols-2 gap-3">
            {floorContent.slice(0, 4).map((floor, index) => (
              <button
                key={index}
                onClick={() => setActiveFloor(index)}
                className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                  activeFloor === index
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{floor.icon}</span>
                  <span className="font-medium text-sm">{floor.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

