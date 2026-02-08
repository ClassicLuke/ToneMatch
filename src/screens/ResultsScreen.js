import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import SwatchGrid from "../components/SwatchGrid";
import { getPaletteForTone } from "../services/paletteEngine";

function groupByCategory(colors) {
  return colors.reduce((acc, color) => {
    if (!acc[color.category]) acc[color.category] = [];
    acc[color.category].push(color);
    return acc;
  }, {});
}

export default function ResultsScreen({ navigation, route }) {
  const analysis = route.params?.analysis || {
    depth: 50,
    depthBucket: { label: "Medium" },
    undertone: "neutral",
    undertoneConfidence: 0.6,
  };

  const palette = getPaletteForTone({
    undertone: analysis.undertone,
    depth: analysis.depth,
  });
  const grouped = groupByCategory(palette.recommendedColors);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your results</Text>
      <Text style={styles.resultText}>
        Your photo suggests tone depth {analysis.depth} ({analysis.depthBucket.label}).
      </Text>
      <Text style={styles.resultText}>
        Undertone: {analysis.undertone} ({Math.round(analysis.undertoneConfidence * 100)}% confidence)
      </Text>
      <Text style={styles.disclaimer}>
        You can adjust the result if the lighting affected your photo.
      </Text>

      <SwatchGrid title="Neutrals" swatches={grouped.neutral || []} />
      <SwatchGrid title="Accents" swatches={grouped.accent || []} />
      <SwatchGrid title="Bolds" swatches={grouped.bold || []} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Makeup families</Text>
        {Object.entries(palette.makeupFamilies).map(([key, values]) => (
          <Text key={key} style={styles.cardText}>
            {key}: {values.join(", ")}
          </Text>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Button title="Adjust result" onPress={() => navigation.navigate("Adjust", { analysis })} />
        <Button title="See trending looks" onPress={() => navigation.navigate("Trending", { analysis })} />
        <Button title="Try stencil" onPress={() => navigation.navigate("Stencil", { analysis })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  resultText: { fontSize: 16, marginBottom: 4 },
  disclaimer: { fontSize: 13, color: "#555" },
  card: { padding: 16, backgroundColor: "#F7F7F7", borderRadius: 16, marginTop: 12 },
  cardTitle: { fontWeight: "600", marginBottom: 8 },
  cardText: { marginBottom: 4 },
  buttonRow: { gap: 12, marginTop: 16 },
});
