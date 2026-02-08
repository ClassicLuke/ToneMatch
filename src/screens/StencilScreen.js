import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";

function ToggleRow({ label, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

export default function StencilScreen() {
  const [showBrows, setShowBrows] = useState(true);
  const [showEyes, setShowEyes] = useState(true);
  const [showBlush, setShowBlush] = useState(true);
  const [showContour, setShowContour] = useState(false);
  const [showLips, setShowLips] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stencil overlay</Text>
      <Text style={styles.subtitle}>
        This is a prototype overlay aligned with landmark guides. It is guidance, not exact AR.
      </Text>
      <View style={styles.preview}>
        <View style={styles.faceOutline} />
        {showBrows && <View style={styles.browGuide} />}
        {showEyes && <View style={styles.eyeGuide} />}
        {showBlush && <View style={styles.blushGuide} />}
        {showContour && <View style={styles.contourGuide} />}
        {showLips && <View style={styles.lipGuide} />}
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Layers</Text>
        <ToggleRow label="Brows" value={showBrows} onValueChange={setShowBrows} />
        <ToggleRow label="Eyes" value={showEyes} onValueChange={setShowEyes} />
        <ToggleRow label="Blush" value={showBlush} onValueChange={setShowBlush} />
        <ToggleRow label="Contour" value={showContour} onValueChange={setShowContour} />
        <ToggleRow label="Lips" value={showLips} onValueChange={setShowLips} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#555" },
  preview: {
    height: 360,
    borderRadius: 24,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  faceOutline: {
    width: 200,
    height: 260,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  browGuide: {
    position: "absolute",
    top: 90,
    width: 140,
    height: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(120,60,40,0.6)",
  },
  eyeGuide: {
    position: "absolute",
    top: 120,
    width: 160,
    height: 30,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(80,80,120,0.6)",
  },
  blushGuide: {
    position: "absolute",
    top: 160,
    width: 170,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(200,100,120,0.5)",
  },
  contourGuide: {
    position: "absolute",
    top: 150,
    width: 190,
    height: 90,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(120,90,60,0.5)",
  },
  lipGuide: {
    position: "absolute",
    top: 220,
    width: 90,
    height: 30,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(200,80,90,0.6)",
  },
  card: { padding: 16, backgroundColor: "#F7F7F7", borderRadius: 16 },
  sectionTitle: { fontWeight: "600", marginBottom: 8 },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  toggleLabel: { fontSize: 14 },
});
