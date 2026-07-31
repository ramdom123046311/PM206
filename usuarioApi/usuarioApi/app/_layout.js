import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="detalle-usuario"
        options={{
          title: "Detalle del usuario",
          headerBackTitle: "Listado",
        }}
      />

      <Stack.Screen
        name="editar-usuario"
        options={{
          title: "Actualizar usuario",
          headerBackTitle: "Detalle",
        }}
      />
    </Stack>
  );
}