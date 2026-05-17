import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors } from "@/src/theme/colors";

interface ScreenPlaceholderProps {
  title: string;
  description: string;
}

export function ScreenPlaceholder({ title, description }: ScreenPlaceholderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back to Vena</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{description}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.offWhite, padding: 24 },
  back: { marginBottom: 16 },
  backText: { color: colors.crimson, fontSize: 16 },
  title: { fontSize: 28, fontWeight: "700", color: colors.deepRed },
  body: { fontSize: 16, lineHeight: 24, color: colors.textSecondary, marginTop: 12 },
});
