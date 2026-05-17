"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeartModel } from "./HeartModel";

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#141418"]} />

      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.55} color="#ffd4d8" />
      <directionalLight position={[0, -2, 3]} intensity={0.35} color="#ff9aa8" />
      <pointLight position={[2, 1, 4]} intensity={0.5} color="#ffb8c0" />
      <pointLight position={[-3, 0, -2]} intensity={0.25} color="#e8a0a8" />

      <HeartModel />

      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.55}
        scale={12}
        blur={2.8}
        far={3.5}
        color="#2a1418"
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.96, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.8, 64]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.95} metalness={0} />
      </mesh>

      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.85}
        enableDamping
        dampingFactor={0.08}
        autoRotate={false}
      />

      <Environment preset="city" />
    </>
  );
}

export function HeartScene() {
  return (
    <div className="relative h-[280px] w-full touch-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.05, 2.75], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] text-white/50">
        Drag to rotate
      </p>
    </div>
  );
}
