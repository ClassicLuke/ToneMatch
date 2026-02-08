import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Pressable } from "react-native";
import { UNDERTONES } from "../models/types";
import { getPaletteForTone } from "../services/paletteEngine";

function ToneButton({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.toneButton, active && styles.toneButtonActive]}
    >
      <Text style={[styles.toneButtonText, active && styles.toneButtonTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function AdjustResultScreen({ navigation, route }) {
  const initial = route.params?.analysis || { undertone: "neutral", depth: 50 };
  const [undertone, setUndertone] = useState(initial.undertone);
  const [depth, setDepth] = useState(initial.depth);

  const palette = useMemo(() => getPaletteForTone({ undertone, depth }), [undertone, depth]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adjust your result</Text>
      <Text style={styles.subtitle}>Use this if the lighting was warmer or cooler.</Text>

      <Text style={styles.sectionTitle}>Undertone</Text>
      <View style={styles.row}>
        {UNDERTONES.map((tone) => (
          <ToneButton
            key={tone}
            label={tone}
            active={undertone === tone}
            onPress={() => setUndertone(tone)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Depth: {depth}</Text>
      <View style={styles.row}>
        <Button title="-" onPress={() => setDepth((prev) => Math.max(0, prev - 5))} />
        <Button title="+" onPress={() => setDepth((prev) => Math.min(100, prev + 5))} />
      </View>
      <Text style={styles.helpText}>Depth bucket: {palette.depthBucket.label}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Updated palette preview</Text>
        <Text style={styles.cardText}>Neutrals: {palette.recommendedColors.filter((c) => c.category === "neutral").map((c) => c.name).join(", ")}</Text>
        <Text style={styles.cardText}>Accents: {palette.recommendedColors.filter((c) => c.category === "accent").map((c) => c.name).join(", ")}</Text>
        <Text style={styles.cardText}>Bolds: {palette.recommendedColors.filter((c) => c.category === "bold").map((c) => c.name).join(", ")}</Text>
      </View>

      <Button
        title="Apply updates"
        onPress={() =>
          navigation.navigate("Results", {
            analysis: {
              ...initial,
              undertone,
              depth,
              depthBucket: palette.depthBucket,
              undertoneConfidence: initial.undertoneConfidence || 0.6,
            },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#555" },
  sectionTitle: { marginTop: 12, fontWeight: "600" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  toneButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 12,
  },
  toneButtonActive: {
    backgroundColor: "#222",
  },
  toneButtonText: { color: "#222" },
  toneButtonTextActive: { color: "#FFF" },
  helpText: { color: "#555" },
  card: { padding: 16, backgroundColor: "#F7F7F7", borderRadius: 16 },
  cardTitle: { fontWeight: "600", marginBottom: 8 },
  cardText: { marginBottom: 4 },
});
