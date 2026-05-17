import { getAvgMetrics } from "@/lib/profile";
import type { MetricId } from "@/lib/metricHistory";
import { formatRecordedAt, mockVitals } from "@/lib/vitals";
import type { VitalKind, VitalReading, VitalStatus } from "@/types/vitals";

export interface HealthMetricOverview {
  id: string;
  metricId: MetricId | null;
  kind: VitalKind;
  label: string;
  currentDisplay: string;
  averageDisplay: string;
  averageCaption: string;
  status: VitalStatus;
  statusLabel: string;
  recordedAt: string;
  note?: string;
}

export interface DailyRecommendation {
  id: string;
  text: string;
  rationale: string;
}

const KIND_TO_METRIC: Partial<Record<VitalKind, MetricId>> = {
  blood_pressure: "bp",
  heart_rate: "hr",
  oxygen: "spo2",
  weight: "weight",
};

function formatCurrent(reading: VitalReading): string {
  if (reading.kind === "blood_pressure" && reading.secondaryValue) {
    return `${reading.value}/${reading.secondaryValue} ${reading.unit}`;
  }
  return `${reading.value} ${reading.unit}`;
}

function averageCaptionFor(kind: VitalKind): string {
  if (kind === "temperature") return "7-day avg";
  return "7-day avg";
}

function fallbackAverage(reading: VitalReading): string {
  switch (reading.kind) {
    case "blood_pressure":
      return "119/78 mmHg";
    case "heart_rate":
      return "84 bpm";
    case "oxygen":
      return "98%";
    case "weight":
      return "161 lbs";
    case "temperature":
      return "98.2 °F";
    default:
      return reading.value;
  }
}

export function getHealthMetricsOverview(): HealthMetricOverview[] {
  const avgById = Object.fromEntries(
    getAvgMetrics().map((m) => [m.id, m]),
  );

  return mockVitals.map((reading) => {
    const metricId = KIND_TO_METRIC[reading.kind] ?? null;
    const avgCard = metricId ? avgById[metricId] : undefined;

    return {
      id: reading.id,
      metricId,
      kind: reading.kind,
      label: reading.label,
      currentDisplay: formatCurrent(reading),
      averageDisplay: avgCard?.value ?? fallbackAverage(reading),
      averageCaption: averageCaptionFor(reading.kind),
      status: reading.status,
      statusLabel: reading.statusLabel,
      recordedAt: reading.recordedAt,
      note: reading.note,
    };
  });
}

export function getDailyRecommendations(): DailyRecommendation[] {
  const elevated = mockVitals.some(
    (v) => v.status === "elevated" || v.status === "high",
  );

  if (elevated) {
    return [
      {
        id: "rest",
        text: "Prioritize rest and hydration today",
        rationale:
          "One or more readings are outside your usual range — recovery supports cardiovascular stability.",
      },
      {
        id: "bp",
        text: "Log blood pressure again this evening",
        rationale: "A second reading helps your care team see whether a pattern is forming.",
      },
      {
        id: "contact",
        text: "Note any headache, swelling, or vision changes",
        rationale: "Symptoms paired with vitals give a fuller picture for outreach if needed.",
      },
    ];
  }

  return [
    {
      id: "blueberries",
      text: "Eat blueberries",
      rationale:
        "Antioxidant-rich foods support vascular health — aligned with your stable BP and SpO₂ this week.",
    },
    {
      id: "exercise",
      text: "Low-impact exercise",
      rationale:
        "Heart rate and weight are on track; 20–30 minutes of walking fits your third-trimester profile.",
    },
    {
      id: "bp-log",
      text: "Continue daily BP checks",
      rationale:
        "Readings are within range today. Consistent logging builds the average your clinician reviews.",
    },
  ];
}

export { formatRecordedAt };
