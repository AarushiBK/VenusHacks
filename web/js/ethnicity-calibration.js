/**
 * Ethnicity-aware rPPG calibration (demo / education).
 * Addresses melanin-related attenuation in green-channel pulse signal (literature-informed heuristic).
 */

export const ETHNICITY_CALIB_KEY = "hb_ethnicity_calibration";
export const ETHNICITY_PROFILE_KEY = "hb_ethnicity_profile";

/** POS gain multiplier on pulse sample — compensates underestimated perfusion signal */
const GAIN_BY_PROFILE = {
  default: 1.0,
  "American Indian or Alaska Native": 1.06,
  Asian: 1.05,
  "Black or African American": 1.14,
  "Hispanic or Latina": 1.08,
  "Middle Eastern or North African": 1.07,
  "Native Hawaiian or Pacific Islander": 1.06,
  White: 1.0,
  Multiracial: 1.1,
  "Prefer not to say": 1.0,
  "Prefer to self-describe": 1.08,
};

/** Slight confidence boost when calibration active (not a clinical correction) */
const CONFIDENCE_BOOST = {
  default: 0,
  "Black or African American": 0.06,
  "Hispanic or Latina": 0.04,
  Asian: 0.03,
};

export function isCalibrationEnabled() {
  return localStorage.getItem(ETHNICITY_CALIB_KEY) !== "0";
}

export function setCalibrationEnabled(on) {
  localStorage.setItem(ETHNICITY_CALIB_KEY, on ? "1" : "0");
}

export function getEthnicityProfile() {
  return localStorage.getItem(ETHNICITY_PROFILE_KEY) || "Prefer not to say";
}

export function setEthnicityProfile(value) {
  if (value) localStorage.setItem(ETHNICITY_PROFILE_KEY, value);
}

export function calibrationGain(ethnicity, enabled = isCalibrationEnabled()) {
  if (!enabled) return 1.0;
  const key = ethnicity || getEthnicityProfile();
  return GAIN_BY_PROFILE[key] ?? GAIN_BY_PROFILE.default;
}

export function applyPulseCalibration(rawSample, ethnicity) {
  if (rawSample == null) return null;
  return rawSample * calibrationGain(ethnicity);
}

export function applyBpmCalibration(bpm, ethnicity) {
  if (!bpm || !isCalibrationEnabled()) return bpm;
  const gain = calibrationGain(ethnicity);
  if (gain <= 1.02) return bpm;
  // Under-read BPM correction (capped, education-only)
  const adj = bpm * (1 + (gain - 1) * 0.35);
  return Math.max(45, Math.min(180, adj));
}

export function confidenceBoost(ethnicity) {
  if (!isCalibrationEnabled()) return 0;
  const key = ethnicity || getEthnicityProfile();
  return CONFIDENCE_BOOST[key] ?? CONFIDENCE_BOOST.default;
}

export function calibrationLabel(ethnicity) {
  const e = ethnicity || getEthnicityProfile();
  if (!isCalibrationEnabled()) return "Standard rPPG";
  return `Equity calibration on · tuned for ${e}`;
}
