import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import CaptureScreen from "./src/screens/CaptureScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import AdjustResultScreen from "./src/screens/AdjustResultScreen";
import TrendingLooksScreen from "./src/screens/TrendingLooksScreen";
import PaletteDetailScreen from "./src/screens/PaletteDetailScreen";
import StencilScreen from "./src/screens/StencilScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Capture" component={CaptureScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Adjust" component={AdjustResultScreen} />
        <Stack.Screen name="PaletteDetail" component={PaletteDetailScreen} />
        <Stack.Screen name="Trending" component={TrendingLooksScreen} />
        <Stack.Screen name="Stencil" component={StencilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
