"use client";

import { Component, type ReactNode, Suspense } from "react";
import { ProceduralHeartModel } from "./ProceduralHeartModel";
import { SloydHeartModel } from "./SloydHeartModel";

class HeartModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/** Sloyd GLB when public/models/heart.glb exists; otherwise procedural fallback. */
export function HeartModel() {
  return (
    <HeartModelErrorBoundary fallback={<ProceduralHeartModel />}>
      <Suspense fallback={<ProceduralHeartModel />}>
        <SloydHeartModel />
      </Suspense>
    </HeartModelErrorBoundary>
  );
}
