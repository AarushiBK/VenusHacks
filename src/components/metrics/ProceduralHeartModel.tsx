"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createAnatomicalHeart } from "./anatomicalHeart";

export function ProceduralHeartModel() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const heart = createAnatomicalHeart();
    const box = new THREE.Box3().setFromObject(heart);
    const center = box.getCenter(new THREE.Vector3());
    heart.position.sub(center);

    const group = groupRef.current;
    if (group) {
      group.add(heart);
      pulseRef.current = heart;
    }

    return () => {
      heart.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      group?.remove(heart);
    };
  }, []);

  useFrame((state) => {
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.012;
      pulseRef.current.scale.setScalar(pulse);
    }
  });

  return <group ref={groupRef} />;
}
