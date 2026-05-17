import * as THREE from "three";

const LIGHT_ROSE = new THREE.Color("#f5c4cc");
const ROSE_GLOW = new THREE.Color("#e8a8b0");

/** Soft, slightly translucent maternal-heart look. */
export function applyHeartMaterialLook(
  material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial,
) {
  material.color.copy(LIGHT_ROSE);
  material.emissive.copy(ROSE_GLOW);
  material.emissiveIntensity = 0.14;
  material.roughness = 0.18;
  material.metalness = 0.04;
  material.transparent = true;
  material.opacity = 0.82;
  material.side = THREE.FrontSide;

  if (material instanceof THREE.MeshPhysicalMaterial) {
    material.transmission = 0.38;
    material.thickness = 1.1;
    material.ior = 1.42;
    material.clearcoat = 0.75;
    material.clearcoatRoughness = 0.08;
    material.attenuationColor = new THREE.Color("#f0b0b8");
    material.attenuationDistance = 0.85;
  }
}

export function createHeartPhysicalMaterial(): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial();
  applyHeartMaterialLook(material);
  return material;
}
