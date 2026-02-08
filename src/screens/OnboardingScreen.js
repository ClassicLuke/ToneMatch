import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function OnboardingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ToneMatch</Text>
      <Text style={styles.subtitle}>Privacy-first skin tone + palette assistant</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Before you start</Text>
        <Text style={styles.cardText}>• No makeup, no filter</Text>
        <Text style={styles.cardText}>• Face centered, neutral expression</Text>
        <Text style={styles.cardText}>• Indirect daylight, plain background</Text>
        <Text style={styles.cardText}>• Avoid strong shadows or color casts</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Privacy promises</Text>
        <Text style={styles.cardText}>• Photo processed on-device when possible</Text>
        <Text style={styles.cardText}>• No identity or age inference</Text>
        <Text style={styles.cardText}>• You can manually adjust results anytime</Text>
      </View>
      <Button title="Start capture" onPress={() => navigation.navigate("Capture")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
