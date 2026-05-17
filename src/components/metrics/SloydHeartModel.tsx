"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Place exported Sloyd GLB at public/models/heart.glb */
export const HEART_GLB_PATH = "/models/heart.glb";

useGLTF.preload(HEART_GLB_PATH);

function applyRoseGlassMaterial(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshPhysicalMaterial({
        color: "#e8a8b0",
        emissive: "#c97b84",
        emissiveIntensity: 0.18,
        roughness: 0.06,
        metalness: 0.08,
        transmission: 0.52,
        thickness: 0.9,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        transparent: true,
      });
    }
  });
}

export function SloydHeartModel() {
  const pulseRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HEART_GLB_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    applyRoseGlassMaterial(clone);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.65 / maxDim : 1;
    clone.scale.setScalar(scale);

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.012;
      pulseRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={pulseRef}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}
