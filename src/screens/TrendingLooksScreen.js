import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { getTrendingLooks } from "../services/lookEngine";

export default function TrendingLooksScreen({ route }) {
  const analysis = route.params?.analysis || { undertone: "neutral", depth: 50 };
  const looks = getTrendingLooks({ undertone: analysis.undertone, depth: analysis.depth });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trending looks</Text>
      {looks.map((look) => (
        <View key={look.id} style={styles.card}>
          <Text style={styles.cardTitle}>{look.name}</Text>
          <Text style={styles.meta}>Difficulty: {look.difficulty} • Vibe: {look.vibe}</Text>
          <Text style={styles.sectionTitle}>Steps</Text>
          {look.steps.map((step) => (
            <Text key={step} style={styles.step}>• {step}</Text>
          ))}
          <Text style={styles.sectionTitle}>Swatches</Text>
          <View style={styles.swatchRow}>
            {look.swatches.map((swatch) => (
              <View key={swatch.hex} style={styles.swatchItem}>
                <View style={[styles.swatchChip, { backgroundColor: swatch.hex }]} />
                <Text style={styles.swatchLabel}>{swatch.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      {looks.length === 0 && (
        <Text style={styles.empty}>No curated looks yet for this combo. More coming soon.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  card: { backgroundColor: "#F7F7F7", borderRadius: 16, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  meta: { color: "#555", marginBottom: 8 },
  sectionTitle: { fontWeight: "600", marginTop: 8, marginBottom: 4 },
  step: { marginBottom: 4 },
  swatchRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  swatchItem: { width: 90, alignItems: "center" },
  swatchChip: { width: 56, height: 56, borderRadius: 12, marginBottom: 6 },
  swatchLabel: { fontSize: 12, textAlign: "center" },
  empty: { color: "#555" },
});
