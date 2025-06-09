import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/home" options={{ title: "Clima App" }} />
      <Stack.Screen name="screens/details" options={{ title: "Detalles" }} />
    </Stack>
  );
}
