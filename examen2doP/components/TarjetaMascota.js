import { Button, Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";

export const TarjetaMascota = ({ nombre, especie, edad }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.nombre}>{nombre}</Text>

      {mostrar && (
        <View>
          <Text>Especie: {especie}</Text>
          <Text>Edad: {edad}</Text>
        </View>
      )}

      <Button
        title={mostrar ? "Ocultar mascota" : "Mostrar mascota"}
        onPress={() => setMostrar(!mostrar)}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  nombre: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  tarjeta: {
    borderWidth: 3,
    margin: 20,
    padding: 25,
    borderRadius: 10,
  },
});