import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Users, Target, Lightbulb, Award, Globe } from "lucide-react";
import * as THREE from "three";

interface AboutCard {
  id: number;
  icon: React.ReactNode;
  titleKey: string;
  contentKey: string;
  color: string;
}

const aboutCards: AboutCard[] = [
  {
    id: 1,
    icon: <Building2 className="w-8 h-8" />,
    titleKey: "about.mission",
    contentKey: "about.missionContent",
    color: "#06B6D4",
  },
  {
    id: 2,
    icon: <Target className="w-8 h-8" />,
    titleKey: "about.vision",
    contentKey: "about.visionContent",
    color: "#8B5CF6",
  },
  {
    id: 3,
    icon: <Users className="w-8 h-8" />,
    titleKey: "about.team",
    contentKey: "about.teamContent",
    color: "#10B981",
  },
  {
    id: 4,
    icon: <Lightbulb className="w-8 h-8" />,
    titleKey: "about.innovation",
    contentKey: "about.innovationContent",
    color: "#F59E0B",
  },
  {
    id: 5,
    icon: <Award className="w-8 h-8" />,
    titleKey: "about.excellence",
    contentKey: "about.excellenceContent",
    color: "#EF4444",
  },
  {
    id: 6,
    icon: <Globe className="w-8 h-8" />,
    titleKey: "about.global",
    contentKey: "about.globalContent",
    color: "#3B82F6",
  },
];

function Card3D({ 
  card, 
  position, 
  rotation,
  onClick, 
  isSelected 
}: { 
  card: AboutCard; 
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  const scale = isSelected ? 1.3 : hovered ? 1.1 : 1;

  return (
    <group position={position} rotation={rotation}>
      {/* Card mesh */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial 
          color={card.color}
          emissive={card.color}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.2, 2.7, 0.05]} />
        <meshStandardMaterial 
          color={card.color}
          transparent
          opacity={isSelected ? 0.4 : hovered ? 0.3 : 0}
          emissive={card.color}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Card content as HTML */}
      <Html
        position={[0, 0, 0.06]}
        center
        distanceFactor={5}
        transform
        style={{
          transition: 'all 0.3s',
          pointerEvents: 'none',
          width: '180px',
        }}
      >
        <div 
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            textAlign: 'center',
            border: `2px solid ${card.color}`,
            boxShadow: isSelected || hovered ? `0 0 30px ${card.color}` : 'none',
            transform: `scale(${scale})`,
            transition: 'all 0.3s',
          }}
        >
          <div style={{ 
            color: card.color, 
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {card.icon}
          </div>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            marginBottom: '8px',
            color: card.color
          }}>
            {t(card.titleKey)}
          </h3>
          {isSelected && (
            <p style={{ 
              fontSize: '12px', 
              lineHeight: '1.4',
              color: '#E5E7EB'
            }}>
              {t(card.contentKey)}
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}

function Scene3D() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Arrange cards in a circle
  const radius = 4;
  const cardPositions = aboutCards.map((_, index) => {
    const angle = (index / aboutCards.length) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      Math.sin(angle) * radius,
    ] as [number, number, number];
  });

  const cardRotations = aboutCards.map((_, index) => {
    const angle = (index / aboutCards.length) * Math.PI * 2;
    return [0, -angle + Math.PI / 2, 0] as [number, number, number];
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

      <group ref={groupRef}>
        {aboutCards.map((card, index) => (
          <Card3D
            key={card.id}
            card={card}
            position={cardPositions[index]}
            rotation={cardRotations[index]}
            onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            isSelected={selectedCard === card.id}
          />
        ))}
      </group>

      {/* Center sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </>
  );
}

export default function Interactive3DAbout() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t("about.title")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
      </div>

      <div className="relative w-full h-[600px] bg-gradient-to-b from-background to-muted/20 rounded-2xl overflow-hidden border border-border">
        <Canvas>
          <Scene3D />
        </Canvas>
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-6 py-3 rounded-full border border-border">
          <p className="text-sm text-muted-foreground flex items-center gap-4">
            <span>🖱️ {t("about.dragToRotate")}</span>
            <span>🔍 {t("about.scrollToZoom")}</span>
            <span>🎯 {t("about.clickCards")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

