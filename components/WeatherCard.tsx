import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../constants/theme";
import WeatherIcon from "./ui/WeatherIcon";

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
        <Text style={styles.loadingText}>Buscando clima...</Text>
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

      {weather?.icon && <WeatherIcon code={weather.icon} size={80} />}

      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{weather?.temp}°</Text>
        <Text style={styles.celsius}>C</Text>
      </View>

      <Text style={styles.description}>
        {weather?.description
          ? weather.description.charAt(0).toUpperCase() +
            weather.description.slice(1)
          : ""}
      </Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MaterialIcons name="water-drop" size={20} color="#4A90E2" />
          <Text style={styles.detailText}>Humedad: {weather?.humidity}%</Text>
        </View>
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
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  celsius: {
    fontSize: 24,
    marginLeft: 2,
    marginTop: 5,
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.text,
  },
  details: {
    marginTop: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
});
