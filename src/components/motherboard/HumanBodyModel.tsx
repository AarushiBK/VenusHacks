"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  computeScanAnchorPositions,
  prepareBodyMesh,
} from "@/lib/bodyScanAnchors";
import { PASSPORT_SCANS } from "@/lib/passportScans";
import { ScanHotspots } from "./ScanHotspots";

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

/** Nudge down so the figure sits visually centered in the passport frame */
const BODY_Y_OFFSET = -0.4;

export function HumanBodyModel({
  selectedScanId,
  onSelectScan,
}: {
  selectedScanId: string | null;
  onSelectScan: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(HUMAN_BODY_GLB_PATH);

  const { model, anchors } = useMemo(() => {
    const clone = scene.clone(true);
    applySolidBodyMaterials(clone);
    const prepared = prepareBodyMesh(clone);
    const anchorMap = computeScanAnchorPositions(prepared, PASSPORT_SCANS);
    return { model: prepared, anchors: anchorMap };
  }, [scene]);

  return (
    <group ref={groupRef} position={[0, BODY_Y_OFFSET, 0]}>
      <primitive object={model} />
      <ScanHotspots
        scans={PASSPORT_SCANS}
        anchors={anchors}
        selectedId={selectedScanId}
        onSelect={onSelectScan}
      />
    </group>
  );
}
