import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Title from "../../components/ui/Title";
import WeatherCard from "../../components/WeatherCard";
import { colors } from "../../constants/theme";
import useWeather from "../../hooks/useWeather";

export default function HomeScreen() {
  const [city, setCity] = useState("Bogotá");
  const { weather, loading, error } = useWeather(city);

  return (
    <View style={styles.container}>
      <Title>Clima App</Title>

      <TextInput
        style={styles.input}
        placeholder="Buscar ciudad..."
        value={city}
        onChangeText={setCity}
      />

      <WeatherCard
        city={city}
        weather={weather}
        loading={loading}
        error={error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardBackground,
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
    width: "100%",
  },
});
