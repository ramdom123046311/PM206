import { Text, View, StyleSheet } from "react-native";
import { TarjetaMascota } from "./components/TarjetaMascota";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola mundo RN!</Text>
      <Text>------Componente simple-----</Text>
      <Text>------Componente compuesto-----</Text>

      <TarjetaMascota nombre="Tany" especie="Labrador" edad="5" />

      <Text>---------------------------------------------------------------------------------------</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});