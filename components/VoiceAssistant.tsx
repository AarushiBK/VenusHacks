import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";
import { VoiceController, type VoiceState } from "@/src/ai/voiceController";
import {
  processMessageStreaming,
} from "@/src/ai/assistantPipeline";
import type { AssistantResponse } from "@/src/ai/types";

interface VoiceAssistantProps {
  visible: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
  emotionalSupportMode?: boolean;
}

const STATE_LABELS: Record<VoiceState, string> = {
  idle: "Tap to speak with Hera",
  listening: "Listening...",
  processing: "Thinking...",
  speaking: "Hera is speaking",
};

export function VoiceAssistant({
  visible,
  onClose,
  onNavigate,
  emotionalSupportMode = false,
}: VoiceAssistantProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  const pulse = useRef(new Animated.Value(1)).current;
  const controllerRef = useRef<VoiceController | null>(null);

  useEffect(() => {
    controllerRef.current = new VoiceController({
      onStateChange: setVoiceState,
      onTranscript: (text, isFinal) => {
        if (isFinal) setTranscript(text);
      },
      onError: (msg) => setError(msg),
    });
    return () => controllerRef.current?.interrupt();
  }, []);

  useEffect(() => {
    if (voiceState === "listening" || voiceState === "speaking") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulse.setValue(1);
    }
  }, [voiceState, pulse]);

  const handleMicPress = useCallback(async () => {
    const ctrl = controllerRef.current;
    if (!ctrl) return;

    setError(null);
    ctrl.resetInterrupt();

    if (voiceState === "listening") {
      const text = await ctrl.stopListening();
      if (!text) return;

      setTranscript(text);
      setResponse("");
      setVoiceState("processing");

      await processMessageStreaming(
        text,
        {
          onPartial: (partial) => setResponse(partial),
          onComplete: async (res: AssistantResponse) => {
            setResponse(res.response);
            res.actions.forEach((a) => {
              if (a.type === "navigate") onNavigate?.(a.screen);
            });
            await ctrl.speak(res.response, res.voiceTone);
          },
          onError: () => {
            setError("Something went wrong. Please try again.");
            setVoiceState("idle");
          },
        },
        { emotionalSupportMode }
      );
    } else if (voiceState === "speaking") {
      ctrl.interrupt();
    } else {
      setTranscript("");
      setResponse("");
      await ctrl.startListening();
    }
  }, [voiceState, emotionalSupportMode, onNavigate]);

  const handleClose = () => {
    controllerRef.current?.interrupt();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient
          colors={[colors.deepRed, colors.crimson, colors.gradientEnd]}
          style={styles.sheet}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.title}>Hera Voice</Text>
          <Text style={styles.subtitle}>{STATE_LABELS[voiceState]}</Text>

          <Animated.View
            style={[
              styles.orbContainer,
              { transform: [{ scale: pulse }] },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.orb,
                voiceState === "listening" && styles.orbListening,
                voiceState === "speaking" && styles.orbSpeaking,
              ]}
              onPress={handleMicPress}
              activeOpacity={0.85}
            >
              <Ionicons
                name={
                  voiceState === "listening"
                    ? "stop"
                    : voiceState === "speaking"
                      ? "hand-left"
                      : "mic"
                }
                size={48}
                color={colors.deepRed}
              />
            </TouchableOpacity>
          </Animated.View>

          {transcript ? (
            <View style={styles.transcriptBox}>
              <Text style={styles.label}>You said</Text>
              <Text style={styles.transcript}>{transcript}</Text>
            </View>
          ) : null}

          {response ? (
            <View style={styles.responseBox}>
              <Text style={styles.label}>Hera</Text>
              <Text style={styles.response} numberOfLines={6}>
                {response}
              </Text>
            </View>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.disclaimer}>
            This information is educational and not a medical diagnosis.
          </Text>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 20,
    paddingBottom: 48,
    paddingHorizontal: 24,
    minHeight: "70%",
    alignItems: "center",
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    marginTop: 8,
    marginBottom: 32,
  },
  orbContainer: {
    marginVertical: 24,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  orbListening: {
    borderWidth: 4,
    borderColor: colors.softPink,
  },
  orbSpeaking: {
    borderWidth: 4,
    borderColor: colors.blush,
  },
  transcriptBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  responseBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  transcript: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
  },
  response: {
    fontSize: 15,
    color: colors.white,
    lineHeight: 22,
  },
  error: {
    color: colors.blush,
    marginTop: 12,
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
