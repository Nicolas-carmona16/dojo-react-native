import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";
import WeatherIcon from "./ui/WeatherIcon";

type ForecastCardProps = {
  forecast: {
    date: string;
    temp: {
      min: number;
      max: number;
    };
    icon: string;
    description: string;
  }[];
};

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico 5 días</Text>

      <View style={styles.forecastList}>
        {forecast.map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.day}>{day.date}</Text>
            <WeatherIcon code={day.icon} size={36} />
            <View style={styles.temps}>
              <Text style={styles.tempMax}>{day.temp.max}°</Text>
              <Text style={styles.tempMin}>{day.temp.min}°</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  forecastList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastItem: {
    alignItems: "center",
    flex: 1,
  },
  day: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  temps: {
    flexDirection: "row",
    marginTop: 5,
  },
  tempMax: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 5,
  },
  tempMin: {
    fontSize: 16,
    color: "#999",
  },
});
