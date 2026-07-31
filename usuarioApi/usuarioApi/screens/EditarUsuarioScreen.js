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

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  API_URL,
  headersAutenticados,
} from "../config/api";

export default function EditarUsuarioScreen() {
  const parametros = useLocalSearchParams();

  const id = String(parametros.id || "");

  const [nombre, setNombre] = useState(
    String(parametros.nombre || "")
  );

  const [edad, setEdad] = useState(
    String(parametros.edad || "")
  );

  const [guardando, setGuardando] =
    useState(false);

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

  const actualizarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadLimpia = edad.trim();
    const edadNumero = Number(edadLimpia);

    if (id === "") {
      mostrarMensaje(
        "Error",
        "No se recibió el identificador del usuario."
      );

      return;
    }

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
      setGuardando(true);

      const respuesta = await fetch(
        `${API_URL}${id}`,
        {
          method: "PUT",
          headers: headersAutenticados,
          body: JSON.stringify({
            nombre: nombreLimpio,
            edad: edadNumero,
          }),
        }
      );

      const datos = await respuesta.json();

      console.log(
        "Respuesta al actualizar:",
        datos
      );

      if (!respuesta.ok) {
        throw new Error(
          obtenerMensajeError(
            datos,
            "No fue posible actualizar el usuario."
          )
        );
      }

      mostrarMensaje(
        "Usuario actualizado",
        datos.message ||
          "Los datos fueron actualizados correctamente.",
        () => {
          router.replace({
            pathname: "/detalle-usuario",
            params: {
              id,
              nombre: nombreLimpio,
              edad: String(edadNumero),
            },
          });
        }
      );
    } catch (error) {
      console.error(
        "Error al actualizar usuario:",
        error
      );

      mostrarMensaje(
        "Error",
        error.message ||
          "No fue posible conectar con la API."
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Actualizar Usuario
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={!guardando}
          placeholder="Nombre del usuario"
        />

        <Text style={styles.label}>
          Edad
        </Text>

        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          editable={!guardando}
          keyboardType="numeric"
          placeholder="Edad del usuario"
        />

        <Pressable
          style={[
            styles.boton,
            guardando &&
              styles.botonDeshabilitado,
          ]}
          onPress={actualizarUsuario}
          disabled={guardando}
        >
          <Text style={styles.textoBoton}>
            {guardando
              ? "Guardando..."
              : "Guardar cambios"}
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
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  boton: {
    backgroundColor: "#FACC15",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: "#1F2937",
    fontWeight: "bold",
  },
});