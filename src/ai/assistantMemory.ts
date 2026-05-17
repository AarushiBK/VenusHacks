import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ChatMessage } from "./types";

const MEMORY_KEY = "@hera/assistant_memory";
const MAX_MESSAGES = 20;

export class AssistantMemory {
  private messages: ChatMessage[] = [];
  private loaded = false;

  async load(): Promise<void> {
    if (this.loaded) return;
    try {
      const raw = await AsyncStorage.getItem(MEMORY_KEY);
      if (raw) {
        this.messages = JSON.parse(raw) as ChatMessage[];
      }
    } catch {
      this.messages = [];
    }
    this.loaded = true;
  }

  async save(): Promise<void> {
    try {
      await AsyncStorage.setItem(MEMORY_KEY, JSON.stringify(this.messages));
    } catch {
      // persist best-effort
    }
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    if (this.messages.length > MAX_MESSAGES) {
      this.messages = this.messages.slice(-MAX_MESSAGES);
    }
  }

  getRecentMessages(count = 10): ChatMessage[] {
    return this.messages.slice(-count);
  }

  getContextForPrompt(count = 8): { role: string; content: string }[] {
    return this.getRecentMessages(count).map((m) => ({
      role: m.role,
      content: m.content,
    }));
  }

  async clear(): Promise<void> {
    this.messages = [];
    await AsyncStorage.removeItem(MEMORY_KEY);
  }

  getMessageCount(): number {
    return this.messages.length;
  }
}

export const assistantMemory = new AssistantMemory();
