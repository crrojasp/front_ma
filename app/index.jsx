import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function StartPage() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green"></ActivityIndicator>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#90cdf4", // Color de fondo
    paddingTop: 20, // Relleno superior
  },
  text: {
    fontSize: 24, // Tamaño de fuente
    fontWeight: "bold",
    color: "#000", // Color de texto
    textAlign: "center", // Centrado de texto
  },
});