"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  clipPeripheralHeartGeometry,
  keepLargestMeshOnly,
} from "./heartMeshCleanup";
import {
  applyHeartMaterialLook,
  createHeartPhysicalMaterial,
} from "./heartMaterial";

/** Anatomical heart GLB (place at public/models/heart_model.glb) */
export const HEART_GLB_PATH = "/models/heart_model.glb";

useGLTF.preload(HEART_GLB_PATH);

function enhanceHeartMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    const next = materials.map((mat) => {
      const physical =
        mat instanceof THREE.MeshPhysicalMaterial
          ? mat.clone()
          : mat instanceof THREE.MeshStandardMaterial
            ? new THREE.MeshPhysicalMaterial().copy(mat as THREE.MeshStandardMaterial)
            : createHeartPhysicalMaterial();

      applyHeartMaterialLook(physical);
      clipPeripheralHeartGeometry(physical);
      return physical;
    });
    child.material = next.length === 1 ? next[0]! : next;
  });
}

export function SloydHeartModel() {
  const pulseRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HEART_GLB_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    keepLargestMeshOnly(clone);
    enhanceHeartMaterials(clone);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.85 / maxDim : 1;
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
