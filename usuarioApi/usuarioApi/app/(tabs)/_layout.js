import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="alta"
      screenOptions={{
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      <Tabs.Screen
        name="alta"
        options={{
          title: "Formulario",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-add"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="consulta"
        options={{
          title: "Listado",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}