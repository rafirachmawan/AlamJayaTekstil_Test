import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 🔥 ROUTE WAJIB DAFTAR */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="list" />
        <Stack.Screen name="add" />
        <Stack.Screen name="scan" />
      </Stack>
    </ThemeProvider>
  );
}
