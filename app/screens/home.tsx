import { StyleSheet, Text, View } from "react-native";
import Title from "../../components/ui/Title";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Title>Dojo de React Native</Title>
      <Text style={styles.subtitle}>Dojo Práctico</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
});
