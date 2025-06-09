import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import Title from "../../components/ui/Title";
import WeatherCard from "../../components/WeatherCard";
import { colors } from "../../constants/theme";
import useWeather from "../../hooks/useWeather";

export default function HomeScreen() {
  const [city, setCity] = useState("Medellín");
  const [searchQuery, setSearchQuery] = useState("");
  const { weather, loading, error } = useWeather(city);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCity(searchQuery);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Title>Clima App</Title>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar ciudad..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={colors.primary}
          onPress={handleSearch}
          style={styles.searchIcon}
        />
      </View>

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
    position: "relative",
  },
  input: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 50,
    width: "100%",
    fontSize: 16,
    backgroundColor: "white",
  },
  searchIcon: {
    position: "absolute",
    right: 15,
  },
});
