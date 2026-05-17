/** VitaCor data sources — metrics shown per device */
export const SOURCES = [
  {
    id: "watch",
    label: "Apple Watch",
    blurb: "Wrist PPG · resting HR, HRV, activity",
    scanEnabled: false,
    metrics: [
      { key: "bpm", label: "Resting heart rate", demo: "—" },
      { key: "hrv", label: "HRV", demo: "—" },
      { key: "activity", label: "Activity ring", demo: "Connect" },
    ],
  },
  {
    id: "face",
    label: "Face scan",
    blurb: "Camera pulse · BPM, HRV, signal quality",
    scanEnabled: true,
    metrics: [
      { key: "bpm", label: "Heart rate", demo: "—" },
      { key: "hrv", label: "HRV (RMSSD)", demo: "—" },
      { key: "signal", label: "Signal quality", demo: "—" },
      { key: "delta", label: "vs baseline", demo: "—" },
    ],
  },
  {
    id: "oura",
    label: "Oura Ring",
    blurb: "Overnight vitals · sleep, readiness, HR",
    scanEnabled: false,
    metrics: [
      { key: "bpm", label: "Resting HR", demo: "—" },
      { key: "hrv", label: "HRV balance", demo: "—" },
      { key: "sleep", label: "Sleep score", demo: "Connect" },
      { key: "ready", label: "Readiness", demo: "Connect" },
    ],
  },
];

export const SOURCE_ORDER = ["watch", "face", "oura"];
