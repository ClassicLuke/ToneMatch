import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SwatchGrid({ title, swatches }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {swatches.map((swatch) => (
          <View key={`${swatch.name}-${swatch.hex}`} style={styles.swatch}>
            <View style={[styles.chip, { backgroundColor: swatch.hex }]} />
            <Text style={styles.label}>{swatch.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  swatch: { width: 96, alignItems: "center" },
  chip: { width: 64, height: 64, borderRadius: 12, marginBottom: 6 },
  label: { fontSize: 12, textAlign: "center" },
});
