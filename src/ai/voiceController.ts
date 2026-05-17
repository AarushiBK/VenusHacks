import * as Speech from "expo-speech";
import { Audio } from "expo-av";

export type VoiceState = "idle" | "listening" | "processing" | "speaking";

export interface VoiceControllerCallbacks {
  onStateChange: (state: VoiceState) => void;
  onTranscript: (text: string, isFinal: boolean) => void;
  onError: (error: string) => void;
}

export class VoiceController {
  private state: VoiceState = "idle";
  private callbacks: VoiceControllerCallbacks;
  private recording: Audio.Recording | null = null;
  private interrupted = false;
  private speechQueue: string[] = [];

  constructor(callbacks: VoiceControllerCallbacks) {
    this.callbacks = callbacks;
  }

  getState(): VoiceState {
    return this.state;
  }

  private setState(state: VoiceState): void {
    this.state = state;
    this.callbacks.onStateChange(state);
  }

  async requestPermissions(): Promise<boolean> {
    const { status } = await Audio.requestPermissionsAsync();
    return status === "granted";
  }

  async startListening(): Promise<void> {
    if (this.state === "listening") return;

    const granted = await this.requestPermissions();
    if (!granted) {
      this.callbacks.onError("Microphone permission is required for voice input.");
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.interrupted = false;
      this.setState("listening");

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      this.recording = recording;
    } catch (e) {
      this.setState("idle");
      this.callbacks.onError(
        e instanceof Error ? e.message : "Could not start recording"
      );
    }
  }

  async stopListening(): Promise<string | null> {
    if (!this.recording) return null;

    this.setState("processing");

    try {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;

      const transcript = await this.transcribeAudio(uri);
      if (transcript) {
        this.callbacks.onTranscript(transcript, true);
      }
      this.setState("idle");
      return transcript;
    } catch (e) {
      this.setState("idle");
      this.callbacks.onError(
        e instanceof Error ? e.message : "Could not process recording"
      );
      return null;
    }
  }

  private async transcribeAudio(uri: string | null): Promise<string | null> {
    if (!uri) return null;
    // Gemini STT not wired yet — use text chat for grounded RAG
    this.callbacks.onError(
      "Voice-to-text is not available yet. Please type your message for verified medical answers."
    );
    return null;
  }

  async speak(
    text: string,
    tone: "calm" | "reassuring" | "urgent" | "warm" = "calm"
  ): Promise<void> {
    if (this.interrupted) return;

    const rate = tone === "urgent" ? 1.05 : tone === "warm" ? 0.92 : 0.95;
    const pitch = tone === "reassuring" ? 0.95 : 1.0;

    this.setState("speaking");

    return new Promise((resolve) => {
      Speech.speak(text, {
        language: "en-US",
        rate,
        pitch,
        onDone: () => {
          if (!this.interrupted) this.setState("idle");
          resolve();
        },
        onStopped: () => {
          this.setState("idle");
          resolve();
        },
        onError: () => {
          this.setState("idle");
          resolve();
        },
      });
    });
  }

  async speakStreaming(
    tokens: AsyncIterable<string> | string[],
    tone: "calm" | "reassuring" | "urgent" | "warm" = "calm"
  ): Promise<void> {
    let buffer = "";
    const pauseAfter = /[.!?]\s/;

    const feed = async (token: string) => {
      if (this.interrupted) return;
      buffer += token;
      if (pauseAfter.test(buffer) || buffer.length > 120) {
        const sentence = buffer.trim();
        buffer = "";
        if (sentence) await this.speak(sentence, tone);
      }
    };

    if (Symbol.asyncIterator in Object(tokens)) {
      for await (const token of tokens as AsyncIterable<string>) {
        if (this.interrupted) break;
        await feed(token);
      }
    } else {
      for (const token of tokens as string[]) {
        if (this.interrupted) break;
        await feed(token);
      }
    }

    if (buffer.trim() && !this.interrupted) {
      await this.speak(buffer.trim(), tone);
    }
  }

  interrupt(): void {
    this.interrupted = true;
    Speech.stop();
    this.speechQueue = [];
    if (this.recording) {
      this.recording.stopAndUnloadAsync().catch(() => {});
      this.recording = null;
    }
    this.setState("idle");
  }

  resetInterrupt(): void {
    this.interrupted = false;
  }
}

export const voiceController = new VoiceController({
  onStateChange: () => {},
  onTranscript: () => {},
  onError: () => {},
});
