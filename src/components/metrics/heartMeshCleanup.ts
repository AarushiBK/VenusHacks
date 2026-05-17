import * as THREE from "three";

/** Hide smaller detached meshes (vessels / side parts) when the GLB has multiple meshes. */
export function keepLargestMeshOnly(root: THREE.Object3D) {
  const meshes: THREE.Mesh[] = [];
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) meshes.push(child);
  });

  if (meshes.length <= 1) return;

  let largest = meshes[0]!;
  let largestVolume = 0;

  for (const mesh of meshes) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const volume = size.x * size.y * size.z;
    if (volume > largestVolume) {
      largestVolume = volume;
      largest = mesh;
    }
  }

  for (const mesh of meshes) {
    mesh.visible = mesh === largest;
  }
}

/**
 * Clip outflow vessels and side lobes on a single merged mesh (GLB).
 * Tuned for heart_model.glb orientation (apex down, vessels toward +Y).
 */
export function clipPeripheralHeartGeometry(material: THREE.Material) {
  if (
    !(
      material instanceof THREE.MeshStandardMaterial ||
      material instanceof THREE.MeshPhysicalMaterial
    )
  ) {
    return;
  }

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
varying vec3 vHeartLocalPos;`,
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
vHeartLocalPos = position;`,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
varying vec3 vHeartLocalPos;`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      `if (vHeartLocalPos.y > -0.14) discard;
if (abs(vHeartLocalPos.x) > 0.2 && vHeartLocalPos.y > -0.55) discard;
#include <output_fragment>`,
    );
  };

  material.needsUpdate = true;
}
