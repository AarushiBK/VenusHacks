import * as THREE from "three";

function muscleMaterial(color: string, transmission = 0.52): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: "#c97b84",
    emissiveIntensity: 0.18,
    roughness: 0.06,
    metalness: 0.08,
    transmission,
    thickness: 0.9,
    ior: 1.45,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    transparent: true,
  });
}

function vesselMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: "#b86b78",
    emissive: "#8b3d4a",
    emissiveIntensity: 0.12,
    roughness: 0.2,
    metalness: 0.05,
    transmission: 0.35,
    thickness: 0.5,
    transparent: true,
  });
}

function addTube(
  group: THREE.Group,
  points: THREE.Vector3[],
  radius: number,
  material: THREE.Material,
  radialSegments = 14,
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 32, radius, radialSegments, false);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  group.add(mesh);
}

/**
 * Procedural anatomical heart — atria, ventricles, apex, and great vessels.
 * Built centered on the origin for clean Y-axis revolution.
 */
export function createAnatomicalHeart(): THREE.Group {
  const heart = new THREE.Group();
  heart.name = "anatomical-heart";

  const muscle = muscleMaterial("#e8a8b0");
  const muscleDark = muscleMaterial("#d48896", 0.45);
  const muscleLight = muscleMaterial("#f5c4cc", 0.58);
  const vessel = vesselMaterial();

  // Main ventricular mass
  const ventricleGeo = new THREE.SphereGeometry(0.52, 48, 48);
  const ventricle = new THREE.Mesh(ventricleGeo, muscle);
  ventricle.scale.set(0.92, 1.05, 0.86);
  ventricle.position.set(0, -0.08, 0);
  ventricle.castShadow = true;
  heart.add(ventricle);

  // Left ventricle bulge (heart is asymmetric)
  const lvGeo = new THREE.SphereGeometry(0.38, 40, 40);
  const leftVentricle = new THREE.Mesh(lvGeo, muscleDark);
  leftVentricle.scale.set(0.75, 1.15, 0.7);
  leftVentricle.position.set(-0.18, -0.22, 0.06);
  leftVentricle.castShadow = true;
  heart.add(leftVentricle);

  // Right ventricle (wraps anteriorly)
  const rvGeo = new THREE.SphereGeometry(0.34, 40, 40);
  const rightVentricle = new THREE.Mesh(rvGeo, muscle);
  rightVentricle.scale.set(0.7, 1, 0.65);
  rightVentricle.position.set(0.2, -0.18, 0.14);
  rightVentricle.castShadow = true;
  heart.add(rightVentricle);

  // Left atrium
  const laGeo = new THREE.SphereGeometry(0.3, 36, 36);
  const leftAtrium = new THREE.Mesh(laGeo, muscleLight);
  leftAtrium.scale.set(1.05, 0.82, 0.95);
  leftAtrium.position.set(-0.26, 0.36, -0.04);
  leftAtrium.castShadow = true;
  heart.add(leftAtrium);

  // Right atrium
  const raGeo = new THREE.SphereGeometry(0.28, 36, 36);
  const rightAtrium = new THREE.Mesh(raGeo, muscle);
  rightAtrium.scale.set(1.1, 0.78, 0.9);
  rightAtrium.position.set(0.3, 0.32, -0.02);
  rightAtrium.castShadow = true;
  heart.add(rightAtrium);

  // Atrial groove band
  const grooveGeo = new THREE.TorusGeometry(0.36, 0.04, 12, 48, Math.PI * 0.85);
  const groove = new THREE.Mesh(grooveGeo, muscleDark);
  groove.rotation.x = Math.PI / 2;
  groove.rotation.z = -0.2;
  groove.position.set(0, 0.28, 0.02);
  heart.add(groove);

  // Apex (pointed tip)
  const apexGeo = new THREE.ConeGeometry(0.22, 0.48, 32);
  const apex = new THREE.Mesh(apexGeo, muscleDark);
  apex.rotation.z = 0.35;
  apex.rotation.x = 0.12;
  apex.position.set(-0.12, -0.58, 0.02);
  apex.castShadow = true;
  heart.add(apex);

  // Aorta — arches upward and back
  addTube(
    heart,
    [
      new THREE.Vector3(0.06, 0.3, 0.1),
      new THREE.Vector3(0.12, 0.52, 0.06),
      new THREE.Vector3(0.02, 0.72, -0.02),
      new THREE.Vector3(-0.14, 0.82, -0.08),
      new THREE.Vector3(-0.22, 0.78, -0.14),
    ],
    0.075,
    vessel,
  );

  // Pulmonary trunk
  addTube(
    heart,
    [
      new THREE.Vector3(-0.04, 0.28, 0.12),
      new THREE.Vector3(-0.08, 0.48, 0.18),
      new THREE.Vector3(-0.1, 0.62, 0.22),
    ],
    0.06,
    vessel,
  );

  // Superior vena cava
  addTube(
    heart,
    [
      new THREE.Vector3(0.32, 0.42, -0.06),
      new THREE.Vector3(0.34, 0.62, -0.1),
      new THREE.Vector3(0.3, 0.78, -0.12),
    ],
    0.055,
    vessel,
  );

  // Inferior vena cava
  addTube(
    heart,
    [
      new THREE.Vector3(0.28, 0.1, -0.1),
      new THREE.Vector3(0.32, -0.12, -0.12),
      new THREE.Vector3(0.3, -0.28, -0.1),
    ],
    0.05,
    vessel,
  );

  // Coronary artery hint (anterior interventricular)
  addTube(
    heart,
    [
      new THREE.Vector3(-0.02, 0.15, 0.42),
      new THREE.Vector3(-0.08, -0.05, 0.44),
      new THREE.Vector3(-0.1, -0.35, 0.38),
    ],
    0.018,
    vessel,
    8,
  );

  // Slight forward tilt so anatomy reads clearly at rest
  heart.rotation.x = -0.12;

  return heart;
}
