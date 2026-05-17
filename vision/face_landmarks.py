"""MediaPipe Tasks Face Landmarker (replaces removed mp.solutions.face_mesh)."""

from __future__ import annotations

import urllib.request
from pathlib import Path

import mediapipe as mp
from mediapipe import Image, ImageFormat
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.core import base_options as base_options_module

MODEL_URL = (
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/"
    "face_landmarker/float16/1/face_landmarker.task"
)
MODEL_PATH = Path(__file__).resolve().parent / "models" / "face_landmarker.task"


def ensure_model() -> Path:
    if MODEL_PATH.is_file():
        return MODEL_PATH
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading face landmarker model to {MODEL_PATH} ...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    return MODEL_PATH


class FaceLandmarkDetector:
    def __init__(self, video_mode: bool = True) -> None:
        model_path = str(ensure_model())
        base_options = base_options_module.BaseOptions(model_asset_path=model_path)
        mode = vision.RunningMode.VIDEO if video_mode else vision.RunningMode.IMAGE
        options = vision.FaceLandmarkerOptions(
            base_options=base_options,
            running_mode=mode,
            num_faces=1,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5,
        )
        self._video_mode = video_mode
        self._landmarker = vision.FaceLandmarker.create_from_options(options)

    def process(self, rgb_frame, timestamp_ms: int = 0):
        """Returns face landmark list or None. rgb_frame must be contiguous RGB uint8."""
        import numpy as np

        if not rgb_frame.flags["C_CONTIGUOUS"]:
            rgb_frame = np.ascontiguousarray(rgb_frame)
        mp_image = Image(image_format=ImageFormat.SRGB, data=rgb_frame)
        if self._video_mode:
            result = self._landmarker.detect_for_video(mp_image, timestamp_ms)
        else:
            result = self._landmarker.detect(mp_image)
        if not result.face_landmarks:
            return None
        return result.face_landmarks[0]

    def close(self) -> None:
        self._landmarker.close()
