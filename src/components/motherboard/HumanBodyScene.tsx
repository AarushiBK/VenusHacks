"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HumanBodyModel } from "./HumanBodyModel";

function SceneContent({
  selectedScanId,
  onSelectScan,
}: {
  selectedScanId: string | null;
  onSelectScan: (id: string) => void;
}) {
  return (
    <>
      <color attach="background" args={["#faf7f4"]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#fff0f2" />
      <directionalLight position={[0, -1, 2]} intensity={0.25} color="#f5c4cc" />

      <HumanBodyModel
        selectedScanId={selectedScanId}
        onSelectScan={onSelectScan}
      />

      <OrbitControls
        target={[0, -0.3, 0]}
        enablePan={false}
        enableZoom
        minDistance={1.6}
        maxDistance={4}
        rotateSpeed={0.75}
        enableDamping
        dampingFactor={0.08}
      />

      <Environment preset="studio" />
    </>
  );
}

export function HumanBodyScene({
  selectedScanId,
  onSelectScan,
}: {
  selectedScanId: string | null;
  onSelectScan: (id: string) => void;
}) {
  return (
    <div className="relative h-[min(72vw,460px)] min-h-[400px] w-full touch-none">
      <Canvas
        camera={{ position: [0, -0.2, 2.9], fov: 40 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent selectedScanId={selectedScanId} onSelectScan={onSelectScan} />
        </Suspense>
      </Canvas>
      <p className="text-muted pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px]">
        Tap a dot to view scan · drag to rotate
      </p>
    </div>
  );
}
