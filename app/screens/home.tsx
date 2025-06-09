import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ForecastCard from "../../components/ForecastCard";
import Title from "../../components/ui/Title";
import WeatherCard from "../../components/WeatherCard";
import { colors } from "../../constants/theme";
import useWeather, { useCurrentLocation } from "../../hooks/useWeather";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherSource, setWeatherSource] = useState<
    string | { lat: number; lon: number }
  >("");

  const { location, errorMsg, loading: locationLoading } = useCurrentLocation();

  useEffect(() => {
    if (location && !weatherSource) {
      setWeatherSource(location);
    }
  }, [location, weatherSource]);

  useEffect(() => {
    if (errorMsg && !weatherSource) {
      setWeatherSource("Medellín");
    }
  }, [errorMsg, weatherSource]);

  const {
    weather,
    forecast,
    loading: weatherLoading,
    error,
    cityName,
  } = useWeather(weatherSource);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setWeatherSource(searchQuery);
      Keyboard.dismiss();
    }
  };

  const handleUseCurrentLocation = () => {
    if (location) {
      setWeatherSource(location);
      setSearchQuery("");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
        <View style={styles.searchButtons}>
          <TouchableOpacity onPress={handleSearch}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.primary}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUseCurrentLocation}>
            <MaterialIcons
              name="my-location"
              size={24}
              color={colors.primary}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {errorMsg && <Text style={styles.locationError}>{errorMsg}</Text>}

      <WeatherCard
        city={
          typeof weatherSource === "string"
            ? weatherSource
            : cityName || "Tu ubicación"
        }
        weather={weather}
        loading={weatherLoading || locationLoading}
        error={error}
        isCurrentLocation={typeof weatherSource !== "string"}
      />

      {!weatherLoading && !locationLoading && !error && forecast.length > 0 && (
        <ForecastCard forecast={forecast} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    paddingTop: 20,
  },
  contentContainer: {
    padding: 20,
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
    paddingRight: 70,
    width: "100%",
    fontSize: 16,
    backgroundColor: "white",
  },
  searchButtons: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  locationIcon: {},
  locationError: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
