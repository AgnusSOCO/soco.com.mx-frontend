import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

function FloatingShape({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3DFloating() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />
          
          <FloatingShape position={[-3, 2, 0]} color="#00d4ff" />
          <FloatingShape position={[3, -2, -2]} color="#0ea5e9" />
          <FloatingShape position={[0, 0, -3]} color="#06b6d4" />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

