import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { VenaChat } from "@/components/VenaChat";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { colors } from "@/src/theme/colors";
import type { AppScreen } from "@/src/ai/types";

const SCREEN_ROUTES: Partial<Record<AppScreen, string>> = {
  Home: "/",
  HeartDashboard: "/heart",
  PregnancyInsights: "/pregnancy",
  SymptomTracker: "/symptoms",
  EmergencyResources: "/emergency",
  Wearables: "/wearables",
  Reports: "/reports",
  Settings: "/settings",
  ChatHistory: "/history",
  EducationHub: "/education",
  RiskScanner: "/risk",
  PostpartumRecovery: "/postpartum",
};

export default function HomeScreen() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [supportMode, setSupportMode] = useState(false);

  const handleNavigate = (screen: string) => {
    const route = SCREEN_ROUTES[screen as AppScreen];
    if (route && route !== "/") {
      router.push(route as never);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.deepRed, colors.crimson]}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.title}>Vena</Text>
              <Text style={styles.tagline}>
                Your heart & pregnancy companion
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.supportToggle,
                supportMode && styles.supportToggleActive,
              ]}
              onPress={() => setSupportMode((v) => !v)}
            >
              <Ionicons
                name="heart"
                size={20}
                color={supportMode ? colors.deepRed : colors.white}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.chatContainer}>
        <VenaChat
          onNavigate={handleNavigate}
          emotionalSupportMode={supportMode}
        />
      </View>

      <TouchableOpacity
        style={styles.voiceFab}
        onPress={() => setVoiceOpen(true)}
        accessibilityLabel="Open voice assistant"
      >
        <LinearGradient
          colors={[colors.crimson, colors.deepRed]}
          style={styles.voiceFabInner}
        >
          <Ionicons name="mic" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>

      <VoiceAssistant
        visible={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onNavigate={handleNavigate}
        emotionalSupportMode={supportMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 8,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  supportToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  supportToggleActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  chatContainer: {
    flex: 1,
    marginTop: -12,
    backgroundColor: colors.offWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  voiceFab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    shadowColor: colors.deepRed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  voiceFabInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
