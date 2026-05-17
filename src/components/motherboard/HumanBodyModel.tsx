"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export const HUMAN_BODY_GLB_PATH = "/models/human_body.glb";

useGLTF.preload(HUMAN_BODY_GLB_PATH);

const BODY_COLOR = new THREE.Color("#e8b0b8");
const BODY_EMISSIVE = new THREE.Color("#d898a0");

function applySolidBodyMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
      child.visible = false;
      return;
    }

    if (!(child instanceof THREE.Mesh)) return;

    child.material = new THREE.MeshStandardMaterial({
      color: BODY_COLOR,
      emissive: BODY_EMISSIVE,
      emissiveIntensity: 0.06,
      roughness: 0.52,
      metalness: 0.04,
      wireframe: false,
      flatShading: false,
    });
  });
}

export function HumanBodyModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HUMAN_BODY_GLB_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    applySolidBodyMaterials(clone);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.65 / maxDim : 1;
    clone.scale.setScalar(scale);

    return clone;
  }, [scene]);

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}
