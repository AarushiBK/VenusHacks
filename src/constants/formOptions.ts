import type { PhysicalActivityLevel, WearableProvider } from "../types/auth";

export const PRONOUN_OPTIONS = [
  "She/her",
  "He/him",
  "They/them",
  "She/they",
  "He/they",
  "Prefer to self-describe",
  "Prefer not to say",
] as const;

export const ETHNICITY_OPTIONS = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Hispanic or Latina",
  "Middle Eastern or North African",
  "Native Hawaiian or Pacific Islander",
  "White",
  "Multiracial",
  "Prefer to self-describe",
  "Prefer not to say",
] as const;

export const ACTIVITY_OPTIONS: {
  value: PhysicalActivityLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "sedentary",
    label: "Mostly sedentary",
    description: "Little to no intentional exercise",
  },
  {
    value: "light",
    label: "Light activity",
    description: "Walking or light movement a few days per week",
  },
  {
    value: "moderate",
    label: "Moderate activity",
    description: "150+ minutes of moderate exercise per week",
  },
  {
    value: "active",
    label: "Active",
    description: "Regular cardio or strength training most days",
  },
  {
    value: "very_active",
    label: "Very active",
    description: "Daily vigorous exercise or athletic training",
  },
];

export const WEARABLE_OPTIONS: {
  id: WearableProvider;
  name: string;
  description: string;
}[] = [
  {
    id: "apple_watch",
    name: "Apple Watch",
    description: "Heart rate, activity, sleep, and workout data",
  },
  {
    id: "oura",
    name: "Oura Ring",
    description: "Sleep, readiness, and cardiovascular insights",
  },
  {
    id: "fitbit",
    name: "Fitbit",
    description: "Steps, heart rate, and activity trends",
  },
  {
    id: "garmin",
    name: "Garmin",
    description: "Fitness and heart-rate variability data",
  },
  {
    id: "whoop",
    name: "WHOOP",
    description: "Strain, recovery, and sleep metrics",
  },
  {
    id: "other",
    name: "Other wearable",
    description: "Connect another supported device later",
  },
];

export const SIGNUP_STEPS = [
  { id: 1, title: "Account", subtitle: "Create your secure profile" },
  { id: 2, title: "About you", subtitle: "Basic health identifiers" },
  { id: 3, title: "Lifestyle", subtitle: "Habits that affect heart risk" },
  { id: 4, title: "Family history", subtitle: "Early heart disease in relatives" },
  { id: 5, title: "Connect data", subtitle: "Optional — wearables & records" },
] as const;
