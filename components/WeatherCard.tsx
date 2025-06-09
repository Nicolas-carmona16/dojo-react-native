import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../constants/theme";

type WeatherCardProps = {
  city: string;
  weather: {
    temp: number;
    description: string;
    humidity: number;
    icon: string;
  } | null;
  loading?: boolean;
  error?: string | null;
};

export default function WeatherCard({
  city,
  weather,
  loading = false,
  error = null,
}: WeatherCardProps) {
  if (loading) {
    return (
      <View style={[styles.card, globalStyles.shadow]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, globalStyles.shadow]}>
        <MaterialIcons name="error-outline" size={40} color="red" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temperature}>{weather?.temp}°C</Text>
      <Text style={styles.description}>{weather?.description}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Humedad: {weather?.humidity}%</Text>
      </View>
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
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  details: {
    marginTop: 15,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
});
