import * as THREE from "three";
import type { PassportScan } from "@/lib/passportScans";

const RAY_ORIGIN_Z = 2.2;
const SURFACE_NUDGE = 0.018;

/** Cast from the front and return a point on the body mesh (local space). */
export function snapScanToBodySurface(
  body: THREE.Object3D,
  probeX: number,
  probeY: number,
): THREE.Vector3 {
  const raycaster = new THREE.Raycaster(
    new THREE.Vector3(probeX, probeY, RAY_ORIGIN_Z),
    new THREE.Vector3(0, 0, -1),
  );

  const hits = raycaster.intersectObject(body, true);
  if (hits.length > 0) {
    const hit = hits[0]!;
    const point = hit.point.clone();
    if (hit.face) {
      const normal = hit.face.normal.clone();
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld);
      normal.applyMatrix3(normalMatrix).normalize();
      point.addScaledVector(normal, SURFACE_NUDGE);
    } else {
      point.z += SURFACE_NUDGE;
    }
    return point;
  }

  return new THREE.Vector3(probeX, probeY, 0.12);
}

export function computeScanAnchorPositions(
  body: THREE.Object3D,
  scans: PassportScan[],
): Record<string, [number, number, number]> {
  const anchors: Record<string, [number, number, number]> = {};

  for (const scan of scans) {
    const [x, y] = scan.probe;
    const p = snapScanToBodySurface(body, x, y);
    anchors[scan.id] = [p.x, p.y, p.z];
  }

  return anchors;
}
