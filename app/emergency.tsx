import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors } from "@/src/theme/colors";

export default function EmergencyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Emergency Resources</Text>
      <Text style={styles.body}>
        If you are experiencing a medical emergency, call your local emergency
        number immediately.
      </Text>
      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => Linking.openURL("tel:911")}
      >
        <Text style={styles.callText}>Call 911 (US)</Text>
      </TouchableOpacity>
      <Text style={styles.disclaimer}>
        This information is educational and not a medical diagnosis.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.offWhite, padding: 24 },
  back: { marginBottom: 16 },
  backText: { color: colors.crimson, fontSize: 16 },
  title: { fontSize: 28, fontWeight: "700", color: colors.emergency },
  body: { fontSize: 16, lineHeight: 24, color: colors.textPrimary, marginTop: 12 },
  callBtn: {
    marginTop: 24,
    backgroundColor: colors.emergency,
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },
  callText: { color: colors.white, fontSize: 18, fontWeight: "700" },
  disclaimer: {
    marginTop: 32,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
});
