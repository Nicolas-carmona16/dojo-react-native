import { StyleSheet, View } from "react-native";
import Title from "../../components/ui/Title";
import WeatherCard from "../../components/WeatherCard";
import { colors } from "../../constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Title>Clima App</Title>
      <WeatherCard city="Medellín" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardBackground,
  },
});
