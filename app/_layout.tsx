import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tab)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
