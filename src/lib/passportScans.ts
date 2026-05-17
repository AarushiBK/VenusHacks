import { TIMELINE_EVENTS, type TimelineEventStatus } from "@/lib/motherboard";

export type BodyRegion = "heart" | "pelvis" | "right_ovary";

export interface PassportScan {
  id: string;
  title: string;
  bodyPart: string;
  imageSrc: string;
  region: BodyRegion;
  /**
   * Ray origin (x, y) used to snap onto the body surface from the front.
   * Patient right ovary = negative x on the model facing the camera.
   */
  probe: [number, number];
  dateStart: string;
  dateEnd?: string;
  dateLabel: string;
  phase: string;
  status: TimelineEventStatus;
  timelineLabel: string;
  summary: string;
}

export const PASSPORT_SCANS: PassportScan[] = [
  {
    id: "pelvic-normal",
    title: "Normal pelvic ultrasound",
    bodyPart: "Uterus & ovaries",
    imageSrc: "/passport/scans/normal-pelvic-ultrasound.png",
    region: "pelvis",
    probe: [0, -0.3],
    dateStart: "2023-01-12",
    dateLabel: "Jan 2023",
    phase: "Gynecology",
    status: "ok",
    timelineLabel: "Baseline pelvic ultrasound — normal",
    summary: "Transverse view; uterus and ovaries within expected limits.",
  },
  {
    id: "uterus-healthy",
    title: "Healthy uterus & ovaries",
    bodyPart: "Uterus",
    imageSrc: "/passport/scans/healthy-uterus-ovaries.png",
    region: "pelvis",
    probe: [0.02, -0.35],
    dateStart: "2023-04-08",
    dateLabel: "Apr 2023",
    phase: "Gynecology",
    status: "ok",
    timelineLabel: "Annotated uterus / ovary education scan",
    summary: "Educational overlay — lining and follicle development explained.",
  },
  {
    id: "pcos-ovary",
    title: "Right ovary — PCOS pattern",
    bodyPart: "Right ovary",
    imageSrc: "/passport/scans/pcos-ovary-ultrasound.png",
    region: "right_ovary",
    probe: [-0.11, -0.36],
    dateStart: "2023-11-02",
    dateEnd: "2023-11-02",
    dateLabel: "Nov 2023",
    phase: "Gynecology",
    status: "caution",
    timelineLabel: "PCOS ultrasound — >30 follicles (right ovary)",
    summary: "Peripheral follicle arrangement consistent with polycystic ovary morphology.",
  },
  {
    id: "pcos-explained",
    title: "Understanding PCOS on ultrasound",
    bodyPart: "Right ovary",
    imageSrc: "/passport/scans/pcos-explained.png",
    region: "right_ovary",
    probe: [-0.09, -0.4],
    dateStart: "2023-11-15",
    dateLabel: "Nov 2023",
    phase: "Gynecology",
    status: "insight",
    timelineLabel: "PCOS layman's guide — string-of-pearls pattern",
    summary: "Patient education scan linking follicle count to ovulation cycle impact.",
  },
  {
    id: "echo-normal",
    title: "Normal echocardiogram",
    bodyPart: "Heart",
    imageSrc: "/passport/scans/normal-ecogram.png",
    region: "heart",
    probe: [0, 0.2],
    dateStart: "2024-03-20",
    dateLabel: "Mar 2024",
    phase: "Cardiology",
    status: "ok",
    timelineLabel: "Echocardiogram — normal systolic function",
    summary: "No wall-motion abnormalities; chambers within normal size.",
  },
  {
    id: "heart-health-guide",
    title: "Heart health overview",
    bodyPart: "Heart",
    imageSrc: "/passport/scans/heart-health-explained.png",
    region: "heart",
    probe: [0.04, 0.17],
    dateStart: "2024-06-05",
    dateLabel: "Jun 2024",
    phase: "Cardiology",
    status: "ok",
    timelineLabel: "Educational echo — how your heart works",
    summary: "Chamber flow, valves, and muscle strength explained on scan.",
  },
  {
    id: "echo-abnormal",
    title: "Abnormal echocardiogram",
    bodyPart: "Heart",
    imageSrc: "/passport/scans/abnormal-ecogram.png",
    region: "heart",
    probe: [-0.04, 0.22],
    dateStart: "2024-08-18",
    dateLabel: "Aug 2024",
    phase: "Cardiology",
    status: "caution",
    timelineLabel: "Echocardiogram — reduced ejection fraction",
    summary: "Wall-motion changes noted; cardiology follow-up recommended.",
  },
  {
    id: "heart-disease-guide",
    title: "Heart disease on imaging",
    bodyPart: "Heart",
    imageSrc: "/passport/scans/heart-disease-explained.png",
    region: "heart",
    probe: [0, 0.26],
    dateStart: "2024-09-10",
    dateLabel: "Sep 2024",
    phase: "Cardiology",
    status: "caution",
    timelineLabel: "Heart disease education scan — scar & clot markers",
    summary: "Annotated scan showing muscle damage, enlargement, and arrhythmia risk.",
  },
];

export function getScanById(id: string | null): PassportScan | undefined {
  if (!id) return undefined;
  return PASSPORT_SCANS.find((s) => s.id === id);
}

function yearToSortKey(year: string): string {
  const start = year.split(/[–-]/)[0]?.trim() ?? year;
  const n = parseInt(start, 10);
  return Number.isFinite(n) ? `${n}-06-01` : "2020-01-01";
}

export interface PassportTimelineEntry {
  id: string;
  label: string;
  phase: string;
  year: string;
  status: TimelineEventStatus;
  sortKey: string;
  scanId?: string;
}

export function buildPassportTimeline(): PassportTimelineEntry[] {
  const base: PassportTimelineEntry[] = TIMELINE_EVENTS.map((e) => ({
    ...e,
    sortKey: yearToSortKey(e.year),
  }));

  const fromScans: PassportTimelineEntry[] = PASSPORT_SCANS.map((s) => ({
    id: `scan-${s.id}`,
    label: s.timelineLabel,
    phase: s.phase,
    year: s.dateEnd && s.dateEnd !== s.dateStart ? `${s.dateLabel}` : s.dateLabel,
    status: s.status,
    sortKey: s.dateStart,
    scanId: s.id,
  }));

  return [...base, ...fromScans].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}
