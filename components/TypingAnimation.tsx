import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "@/src/theme/colors";

interface TypingAnimationProps {
  visible?: boolean;
}

export function TypingAnimation({ visible = true }: TypingAnimationProps) {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (!visible) return;

    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 320,
            useNativeDriver: true,
          }),
        ])
      );

    const a1 = animate(dot1, 0);
    const a2 = animate(dot2, 160);
    const a3 = animate(dot3, 320);
    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [visible, dot1, dot2, dot3]);

  if (!visible) return null;

  return (
    <View style={styles.container} accessibilityLabel="Hera is typing">
      {[dot1, dot2, dot3].map((opacity, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { opacity, transform: [{ scale: opacity }] }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.crimson,
  },
});
