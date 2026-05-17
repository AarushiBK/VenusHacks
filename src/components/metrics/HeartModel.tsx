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

/** GLB at public/models/heart_model.glb when present; otherwise procedural fallback. */
export function HeartModel() {
  return (
    <HeartModelErrorBoundary fallback={<ProceduralHeartModel />}>
      <Suspense fallback={<ProceduralHeartModel />}>
        <SloydHeartModel />
      </Suspense>
    </HeartModelErrorBoundary>
  );
}
