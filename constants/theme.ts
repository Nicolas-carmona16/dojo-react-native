import { StyleSheet } from "react-native";

export const colors = {
  primary: "#3498db",
  background: "#f5f5f5",
  text: "#333",
};

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
