export default function Scene3DSimple() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Placeholder for 3D scene - will be enhanced later */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}

