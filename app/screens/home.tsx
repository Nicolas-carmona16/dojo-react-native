import { StyleSheet, Text, View } from "react-native";
import WeatherCard from "../../components/WeatherCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App del Clima</Text>
      <WeatherCard city="Bogotá" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
});
