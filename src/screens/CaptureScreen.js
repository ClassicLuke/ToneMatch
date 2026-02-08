import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { detectFace } from "../services/faceDetect";
import { captureSamplePixels, mockHistogram } from "../services/camera";
import { runQualityChecks } from "../services/qualityCheck";
import { analyzeTone } from "../services/toneAnalyze";

export default function CaptureScreen({ navigation }) {
  const [status, setStatus] = useState("Ready to capture");
  const [issues, setIssues] = useState([]);

  const handleCapture = async () => {
    setStatus("Analyzing...");
    setIssues([]);

    const faceData = await detectFace();
    const quality = runQualityChecks({
      faceCount: faceData.faceCount,
      faceSizeRatio: faceData.faceSizeRatio,
      histogram: mockHistogram(),
      avgRgb: { r: 180, g: 150, b: 130 },
      laplacianVariance: 120,
    });

    if (!quality.ok) {
      setStatus("Retake needed");
      setIssues(quality.failures);
      return;
    }

    const samples = await captureSamplePixels();
    const analysis = analyzeTone(samples, 0.85);
    setStatus("Analysis complete");
    navigation.navigate("Results", {
      analysis,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Capture selfie</Text>
      <Text style={styles.subtitle}>We check lighting + clarity before analyzing.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live guidance</Text>
        <Text style={styles.cardText}>• Face centered and filling the frame</Text>
        <Text style={styles.cardText}>• No harsh shadows</Text>
        <Text style={styles.cardText}>• Neutral expression</Text>
      </View>
      <Button title="Capture (demo)" onPress={handleCapture} />
      <Text style={styles.status}>{status}</Text>
      {issues.length > 0 && (
        <View style={styles.issueBox}>
          {issues.map((issue) => (
            <Text key={issue} style={styles.issueText}>{issue}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#555" },
  card: { padding: 16, backgroundColor: "#F5F5F5", borderRadius: 16 },
  cardTitle: { fontWeight: "600", marginBottom: 8 },
  cardText: { marginBottom: 4 },
  status: { marginTop: 8, fontWeight: "600" },
  issueBox: { marginTop: 8, padding: 12, backgroundColor: "#FDECEC", borderRadius: 12 },
  issueText: { color: "#8A1F1F" },
});
