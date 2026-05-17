import React, { useCallback, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ChatBubble } from "./ChatBubble";
import { TypingAnimation } from "./TypingAnimation";
import { colors } from "@/src/theme/colors";
import { processMessageStreaming } from "@/src/ai/assistantPipeline";
import type { AssistantResponse, ChatMessage } from "@/src/ai/types";

interface HeraChatProps {
  onNavigate?: (screen: string) => void;
  emotionalSupportMode?: boolean;
}

export function HeraChat({
  onNavigate,
  emotionalSupportMode = false,
}: HeraChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm Hera — your companion for heart and pregnancy health. Ask me anything, or say something like \"show my heart trends.\"",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const listRef = useRef<FlatList>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      const streamId = `a_${Date.now()}`;
      setStreamingId(streamId);
      setMessages((prev) => [
        ...prev,
        {
          id: streamId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        },
      ]);

      await processMessageStreaming(
        trimmed,
        {
          onPartial: (partial) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === streamId ? { ...m, content: partial } : m
              )
            );
          },
          onComplete: (response: AssistantResponse) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === streamId
                  ? {
                      ...m,
                      content: response.response,
                      type: response.type,
                      citations: response.citations,
                      actions: response.actions,
                    }
                  : m
              )
            );
            setStreamingId(null);
            setLoading(false);

            response.actions.forEach((a) => {
              if (a.type === "navigate") onNavigate?.(a.screen);
            });
          },
          onError: () => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === streamId
                  ? {
                      ...m,
                      content:
                        "Something went wrong displaying the response. Please try again.",
                    }
                  : m
              )
            );
            setStreamingId(null);
            setLoading(false);
          },
        },
        { emotionalSupportMode }
      );

      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    },
    [loading, emotionalSupportMode, onNavigate]
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatBubble
            role={item.role}
            content={item.content}
            type={item.type}
            citations={item.citations}
            actions={item.actions}
            isStreaming={item.id === streamingId}
            onNavigate={onNavigate}
          />
        )}
        ListFooterComponent={
          loading && !streamingId ? <TypingAnimation /> : null
        }
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      <LinearGradient
        colors={[colors.blush, colors.white]}
        style={styles.inputBar}
      >
        <TextInput
          style={styles.input}
          placeholder="Ask Hera anything..."
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={2000}
          editable={!loading}
          onSubmitEditing={() => sendMessage(input)}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendDisabled]}
          onPress={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          accessibilityLabel="Send message"
        >
          <Ionicons name="arrow-up" size={22} color={colors.white} />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.blush,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.softPink,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.deepRed,
    alignItems: "center",
    justifyContent: "center",
  },
  sendDisabled: {
    opacity: 0.4,
  },
});
