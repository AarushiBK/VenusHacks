import type { ChatMessage } from "./types";

/** In-memory stub (Next.js chat uses request history instead). */
export class AssistantMemory {
  private messages: ChatMessage[] = [];

  async load(): Promise<void> {}

  async save(): Promise<void> {}

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    if (this.messages.length > 20) {
      this.messages = this.messages.slice(-20);
    }
  }

  getRecentMessages(count = 10): ChatMessage[] {
    return this.messages.slice(-count);
  }

  async clear(): Promise<void> {
    this.messages = [];
  }
}

export const assistantMemory = new AssistantMemory();
