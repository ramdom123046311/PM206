import React, { useState } from "react";

import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

import { router } from "expo-router";


const API_URL = "http://localhost:5000/v1/usuarios/";

export default function AltaUsuariosScreen() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargando, setCargando] = useState(false);


  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };


  const guardarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadLimpia = edad.trim();
    const edadNumero = Number(edadLimpia);

    if (nombreLimpio === "" || edadLimpia === "") {
      mostrarMensaje(
        "Campos vacíos",
        "Llena todos los campos."
      );

      return;
    }

    if (
      !Number.isInteger(edadNumero) ||
      edadNumero <= 0
    ) {
      mostrarMensaje(
        "Edad inválida",
        "Ingresa una edad válida mayor que cero."
      );

      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(API_URL, {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nombre: nombreLimpio,
          edad: edadNumero,
        }),
      });

      const datos = await respuesta.json();

      console.log("Respuesta al guardar:", datos);

      if (!respuesta.ok) {
        let mensajeError = "No fue posible agregar el usuario.";

        if (typeof datos.detail === "string") {
          mensajeError = datos.detail;
        } else if (datos.detail) {
          mensajeError = JSON.stringify(datos.detail);
        }

        throw new Error(mensajeError);
      }

      mostrarMensaje(
        "Usuario agregado",
        datos.mensaje ||
          "El usuario fue agregado correctamente."
      );

      setNombre("");
      setEdad("");

      /*
       * Después de guardar, abre la pestaña del listado.
       * ConsultaUsuariosScreen volverá a consultar la API.
       */
      router.replace("/(tabs)/consulta");
    } catch (error) {
      console.error("Error al guardar usuario:", error);

      mostrarMensaje(
        "Error",
        error.message ||
          "No fue posible conectar con la API."
      );
    } finally {
      setCargando(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          Registro de Usuarios
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
          editable={!cargando}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
          editable={!cargando}
        />

        <Pressable
          style={styles.boton}
          onPress={guardarUsuario}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando
              ? "Guardando..."
              : "Agregar Usuario"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1F2937",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
  },

  boton: {
    backgroundColor: "#29bb0c",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});