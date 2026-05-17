import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/src/theme/colors";
import type { Citation, NavigateAction, ResponseType } from "@/src/ai/types";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  type?: ResponseType;
  citations?: Citation[];
  actions?: NavigateAction[];
  isStreaming?: boolean;
  onNavigate?: (screen: string) => void;
}

export function ChatBubble({
  role,
  content,
  type,
  citations = [],
  actions = [],
  isStreaming,
  onNavigate,
}: ChatBubbleProps) {
  const isUser = role === "user";
  const isEmergency = type === "emergency";

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAssistant,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
          isEmergency && styles.bubbleEmergency,
        ]}
      >
        {!isUser && (
          <Text style={styles.heraLabel}>Hera</Text>
        )}
        <Text
          style={[
            styles.text,
            isUser ? styles.textUser : styles.textAssistant,
            isEmergency && styles.textEmergency,
          ]}
        >
          {content}
          {isStreaming && <Text style={styles.cursor}>▍</Text>}
        </Text>

        {citations.length > 0 && (
          <View style={styles.citations}>
            {citations.slice(0, 2).map((c, i) => (
              <Text key={i} style={styles.citation}>
                {c.source}
                {c.title ? ` · ${c.title}` : ""}
              </Text>
            ))}
          </View>
        )}

        {actions.map((action, i) =>
          action.type === "navigate" ? (
            <TouchableOpacity
              key={i}
              style={[
                styles.actionButton,
                isEmergency && styles.actionEmergency,
              ]}
              onPress={() => onNavigate?.(action.screen)}
            >
              <Text style={styles.actionText}>
                Open {formatScreenLabel(action.screen)} →
              </Text>
            </TouchableOpacity>
          ) : null
        )}
      </View>
    </View>
  );
}

function formatScreenLabel(screen: string): string {
  return screen.replace(/([A-Z])/g, " $1").trim();
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  rowUser: {
    alignItems: "flex-end",
  },
  rowAssistant: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "88%",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleUser: {
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: colors.assistantBubble,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.blush,
  },
  bubbleEmergency: {
    backgroundColor: "#FFF0F2",
    borderColor: colors.emergency,
    borderWidth: 1.5,
  },
  heraLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.crimson,
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  textUser: {
    color: colors.white,
  },
  textAssistant: {
    color: colors.textPrimary,
  },
  textEmergency: {
    color: colors.emergency,
    fontWeight: "500",
  },
  cursor: {
    color: colors.crimson,
  },
  citations: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.blush,
  },
  citation: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
    fontStyle: "italic",
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: colors.deepRed,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  actionEmergency: {
    backgroundColor: colors.emergency,
  },
  actionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
