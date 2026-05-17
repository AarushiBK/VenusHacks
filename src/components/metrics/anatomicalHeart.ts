import * as THREE from "three";
import { createHeartPhysicalMaterial } from "./heartMaterial";

/** Single main ventricular mass — no side chambers or vessels. */
export function createAnatomicalHeart(): THREE.Group {
  const heart = new THREE.Group();
  heart.name = "anatomical-heart";

  const muscle = createHeartPhysicalMaterial();

  const ventricleGeo = new THREE.SphereGeometry(0.52, 48, 48);
  const ventricle = new THREE.Mesh(ventricleGeo, muscle);
  ventricle.scale.set(0.92, 1.05, 0.86);
  ventricle.position.set(0, -0.08, 0);
  ventricle.castShadow = true;
  heart.add(ventricle);

  heart.rotation.x = -0.12;

  return heart;
}
