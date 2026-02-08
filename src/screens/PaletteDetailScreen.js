import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { getPaletteForTone } from "../services/paletteEngine";
import SwatchGrid from "../components/SwatchGrid";

export default function PaletteDetailScreen({ route }) {
  const analysis = route.params?.analysis || { undertone: "neutral", depth: 50 };
  const palette = getPaletteForTone({ undertone: analysis.undertone, depth: analysis.depth });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Palette detail</Text>
      <Text style={styles.subtitle}>
        Undertone: {analysis.undertone} • Depth bucket: {palette.depthBucket.label}
      </Text>
      <SwatchGrid title="Recommended colors" swatches={palette.recommendedColors} />
      <Text style={styles.sectionTitle}>Makeup families</Text>
      {Object.entries(palette.makeupFamilies).map(([category, items]) => (
        <Text key={category} style={styles.textLine}>
          {category}: {items.join(", ")}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#555" },
  sectionTitle: { marginTop: 12, fontWeight: "600" },
  textLine: { marginBottom: 6 },
});
