import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { colors } from "../../constants/theme";

const iconMap: Record<string, { name: string; color?: string }> = {
  "01d": { name: "wb-sunny", color: "#FDB813" },
  "01n": { name: "nightlight-round", color: "#2E3A59" },
  "02d": { name: "wb-cloudy", color: "#FDB813" },
  "02n": { name: "nights-stay", color: "#2E3A59" },
  "03d": { name: "cloud", color: "#808080" },
  "03n": { name: "cloud", color: "#505050" },
  "04d": { name: "cloud-queue", color: "#606060" },
  "04n": { name: "cloud-queue", color: "#404040" },
  "09d": { name: "grain", color: "#4A90E2" },
  "09n": { name: "grain", color: "#2C5D9E" },
  "10d": { name: "umbrella", color: "#4A90E2" },
  "10n": { name: "umbrella", color: "#2C5D9E" },
  "11d": { name: "flash-on", color: "#FFC107" },
  "11n": { name: "flash-on", color: "#FFA000" },
  "13d": { name: "ac-unit", color: "#B0E0E6" },
  "13n": { name: "ac-unit", color: "#87CEEB" },
  "50d": { name: "blur-on", color: "#9E9E9E" },
  "50n": { name: "blur-on", color: "#757575" },
};

export default function WeatherIcon({
  code,
  size = 64,
}: {
  code: string;
  size?: number;
}) {
  const iconConfig = iconMap[code] || {
    name: "help-outline",
    color: colors.primary,
  };

  return (
    <View style={{ alignItems: "center" }}>
      <MaterialIcons
        name={iconConfig.name as any}
        size={size}
        color={iconConfig.color}
      />
    </View>
  );
}
