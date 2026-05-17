/**
 * Maternal cardiovascular risk scoring (educational, not diagnostic).
 */

export interface RiskInput {
  age?: number;
  systolicBP?: number;
  diastolicBP?: number;
  priorPreeclampsia?: boolean;
  diabetes?: boolean;
  familyHistoryCVD?: boolean;
  postpartumWeeks?: number;
}

export interface RiskScore {
  score: number;
  level: "low" | "moderate" | "elevated";
  factors: string[];
  disclaimer: string;
}

const DISCLAIMER =
  "This score is educational and not a medical diagnosis. Consult your healthcare provider.";

export function computeMaternalRiskScore(input: RiskInput): RiskScore {
  let score = 0;
  const factors: string[] = [];

  if (input.systolicBP && input.systolicBP >= 140) {
    score += 25;
    factors.push("Elevated blood pressure");
  }
  if (input.priorPreeclampsia) {
    score += 20;
    factors.push("History of preeclampsia");
  }
  if (input.diabetes) {
    score += 15;
    factors.push("Diabetes");
  }
  if (input.familyHistoryCVD) {
    score += 10;
    factors.push("Family history of cardiovascular disease");
  }
  if (input.age && input.age >= 35) {
    score += 10;
    factors.push("Advanced maternal age");
  }
  if (input.postpartumWeeks !== undefined && input.postpartumWeeks <= 12) {
    score += 5;
    factors.push("Early postpartum period");
  }

  const level =
    score >= 40 ? "elevated" : score >= 20 ? "moderate" : "low";

  return { score: Math.min(score, 100), level, factors, disclaimer: DISCLAIMER };
}
