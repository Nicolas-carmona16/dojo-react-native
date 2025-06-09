import { StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../constants/theme";

type WeatherCardProps = {
  city: string;
  temperature?: number;
  description?: string;
};

export default function WeatherCard({
  city,
  temperature = 21,
  description = "Soleado",
}: WeatherCardProps) {
  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "300",
    color: colors.primary,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});
