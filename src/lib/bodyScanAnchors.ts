import * as THREE from "three";
import type { BodyRegion, PassportScan } from "@/lib/passportScans";

const RAY_ORIGIN_Z = 2.4;
const SURFACE_NUDGE = 0.022;

/** Fraction of bounding box (x from left, y from bottom) per anatomical region. */
const REGION_FRAC: Record<
  BodyRegion,
  { x: number; y: number }
> = {
  heart: { x: 0.5, y: 0.76 },
  pelvis: { x: 0.5, y: 0.43 },
  /** Patient's right = left side of model when facing the camera */
  right_ovary: { x: 0.34, y: 0.41 },
};

/**
 * Per-scan fine-tune as a fraction of body width (x) and height (y).
 * Spreads dots when several scans share a region.
 */
const SCAN_PROBE_OFFSETS: Record<string, [number, number]> = {
  "pelvic-normal": [0, 0.02],
  "uterus-healthy": [0.05, -0.02],
  "pcos-ovary": [-0.02, 0],
  "pcos-explained": [0.03, -0.04],
  "echo-normal": [-0.04, 0.02],
  "heart-health-guide": [0.05, -0.03],
  "echo-abnormal": [-0.06, 0.05],
  "heart-disease-guide": [0, 0.06],
};

function probeForScan(
  body: THREE.Object3D,
  scan: PassportScan,
): [number, number] {
  const box = new THREE.Box3().setFromObject(body);
  const size = box.getSize(new THREE.Vector3());
  const base = REGION_FRAC[scan.region];
  const offset = scan.probeOffset ?? SCAN_PROBE_OFFSETS[scan.id] ?? [0, 0];

  const x = box.min.x + size.x * (base.x + offset[0]);
  const y = box.min.y + size.y * (base.y + offset[1]);
  return [x, y];
}

/** Cast from the front and return a point on the body mesh in the body's local space. */
export function snapScanToBodySurface(
  body: THREE.Object3D,
  probeX: number,
  probeY: number,
): THREE.Vector3 {
  body.updateMatrixWorld(true);

  const raycaster = new THREE.Raycaster(
    new THREE.Vector3(probeX, probeY, RAY_ORIGIN_Z),
    new THREE.Vector3(0, 0, -1),
  );

  const hits = raycaster.intersectObject(body, true);
  if (hits.length > 0) {
    const hit = hits[0]!;
    const point = hit.point.clone();
    body.worldToLocal(point);
    point.z += SURFACE_NUDGE;
    return point;
  }

  return new THREE.Vector3(probeX, probeY, 0.1);
}

export function computeScanAnchorPositions(
  body: THREE.Object3D,
  scans: PassportScan[],
): Record<string, [number, number, number]> {
  const anchors: Record<string, [number, number, number]> = {};

  for (const scan of scans) {
    const [x, y] = probeForScan(body, scan);
    const p = snapScanToBodySurface(body, x, y);
    anchors[scan.id] = [p.x, p.y, p.z];
  }

  return anchors;
}

/** Center and scale the body so anchors and mesh share one local space. */
export function prepareBodyMesh(model: THREE.Object3D): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  const sized = new THREE.Box3().setFromObject(model);
  const size = sized.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 1.65 / maxDim : 1;
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  return model;
}
