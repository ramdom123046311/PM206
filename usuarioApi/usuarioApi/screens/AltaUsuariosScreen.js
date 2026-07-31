import React, { useState } from "react";

import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";

import {
  API_URL,
  headersPublicos,
} from "../config/api";

export default function AltaUsuariosScreen() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (
    titulo,
    mensaje,
    accionFinal
  ) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);

      if (accionFinal) {
        accionFinal();
      }

      return;
    }

    Alert.alert(
      titulo,
      mensaje,
      [
        {
          text: "Aceptar",
          onPress: accionFinal,
        },
      ]
    );
  };

  const guardarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadLimpia = edad.trim();
    const edadNumero = Number(edadLimpia);

    if (
      nombreLimpio === "" ||
      edadLimpia === ""
    ) {
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
        "Edad incorrecta",
        "Ingresa una edad válida mayor que cero."
      );

      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(
        API_URL,
        {
          method: "POST",
          headers: headersPublicos,
          body: JSON.stringify({
            nombre: nombreLimpio,
            edad: edadNumero,
          }),
        }
      );

      const datos = await respuesta.json();

      console.log(
        "Respuesta al crear usuario:",
        datos
      );

      if (!respuesta.ok) {
        throw new Error(
          obtenerMensajeError(
            datos,
            "No fue posible agregar el usuario."
          )
        );
      }

      setNombre("");
      setEdad("");

      mostrarMensaje(
        "Usuario agregado",
        datos.mensaje ||
          "El usuario fue agregado correctamente.",
        () => {
          router.replace("/(tabs)/consulta");
        }
      );
    } catch (error) {
      console.error(
        "Error al crear usuario:",
        error
      );

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
          style={[
            styles.boton,
            cargando && styles.botonDeshabilitado,
          ]}
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

function obtenerMensajeError(
  datos,
  mensajePredeterminado
) {
  if (typeof datos?.detail === "string") {
    return datos.detail;
  }

  if (datos?.detail) {
    return JSON.stringify(datos.detail);
  }

  if (typeof datos?.message === "string") {
    return datos.message;
  }

  return mensajePredeterminado;
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
    backgroundColor: "#29BB0C",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});