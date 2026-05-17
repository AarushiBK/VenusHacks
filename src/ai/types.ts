export type AppScreen =
  | "Home"
  | "Passport"
  | "Symptoms"
  | "SymptomsLog"
  | "SymptomsCharts"
  | "Health"
  | "Metrics"
  | "Settings"
  | "SendReport";

export type ResponseType =
  | "medical"
  | "navigation"
  | "emergency"
  | "conversational"
  | "mental_health"
  | "educational"
  | "triage";

export type VoiceTone = "calm" | "reassuring" | "urgent" | "warm";

export interface NavigateAction {
  type: "navigate";
  screen: AppScreen;
}

export interface Citation {
  title: string;
  source: string;
  url?: string;
  page?: number;
}

export interface AssistantResponse {
  response: string;
  type: ResponseType;
  citations: Citation[];
  actions: NavigateAction[];
  voiceTone: VoiceTone;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  type?: ResponseType;
  citations?: Citation[];
  actions?: NavigateAction[];
}

export type MedicalTopicTag =
  | "symptoms"
  | "conditions"
  | "cardiovascular"
  | "pregnancy"
  | "hormones"
  | "pcos"
  | "mental_health"
  | "emergency"
  | "medication"
  | "digestive"
  | "dermatology"
  | "general";

export interface ChunkMetadata {
  source: string;
  title: string;
  url?: string;
  page?: number;
  trustLevel: "verified" | "uploaded";
  topics?: MedicalTopicTag[];
  organSystems?: string[];
  symptoms?: string[];
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: ChunkMetadata;
  embedding?: number[];
}

export interface RAGResult {
  answer: string;
  citations: Citation[];
  hasSufficientContext: boolean;
}
