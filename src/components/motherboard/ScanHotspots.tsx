"use client";

import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { PassportScan } from "@/lib/passportScans";

const MARKER_SCALE = 0.004;

function ScanMarker({
  position,
  scan,
  active,
  onSelect,
}: {
  position: [number, number, number];
  scan: PassportScan;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const scaleRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (!scaleRef.current) return;
    const world = new THREE.Vector3();
    scaleRef.current.getWorldPosition(world);
    const d = camera.position.distanceTo(world);
    scaleRef.current.scale.setScalar(d * MARKER_SCALE);
  });

  return (
    <group position={position} frustumCulled={false}>
      <Billboard follow lockX lockY lockZ={false}>
        <group ref={scaleRef} frustumCulled={false}>
          <mesh
            renderOrder={1000}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(scan.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
          >
            <circleGeometry args={[1, 20]} />
            <meshBasicMaterial
              color={active ? "#9e4f5a" : "#c97b84"}
              depthTest={false}
              depthWrite={false}
              transparent
              opacity={active ? 1 : 0.92}
            />
          </mesh>
          <mesh renderOrder={1001} position={[0, 0, 0.001]} scale={1.35}>
            <ringGeometry args={[0.72, 1, 20]} />
            <meshBasicMaterial
              color="#ffffff"
              depthTest={false}
              depthWrite={false}
              transparent
              opacity={active ? 0.95 : 0.75}
            />
          </mesh>
          {active && (
            <mesh renderOrder={1002} scale={0.35}>
              <circleGeometry args={[1, 12]} />
              <meshBasicMaterial
                color="#ffffff"
                depthTest={false}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      </Billboard>
    </group>
  );
}

export function ScanHotspots({
  scans,
  anchors,
  selectedId,
  onSelect,
}: {
  scans: PassportScan[];
  anchors: Record<string, [number, number, number]>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {scans.map((scan) => {
        const position = anchors[scan.id];
        if (!position) return null;

        return (
          <ScanMarker
            key={scan.id}
            position={position}
            scan={scan}
            active={selectedId === scan.id}
            onSelect={onSelect}
          />
        );
      })}
    </>
  );
}
