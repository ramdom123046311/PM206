import React, { useState } from "react";

import {
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
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

export default function DetalleUsuarioScreen() {
  const parametros = useLocalSearchParams();

  const id = String(parametros.id || "");
  const nombre = String(
    parametros.nombre || ""
  );
  const edad = String(parametros.edad || "");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [eliminando, setEliminando] =
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

  const abrirFormularioEdicion = () => {
    router.push({
      pathname: "/editar-usuario",
      params: {
        id,
        nombre,
        edad,
      },
    });
  };

  const eliminarUsuario = async () => {
    if (id === "") {
      mostrarMensaje(
        "Error",
        "No se recibió el identificador del usuario."
      );

      return;
    }

    try {
      setEliminando(true);

      const respuesta = await fetch(
        `${API_URL}${id}`,
        {
          method: "DELETE",
          headers: headersAutenticados,
        }
      );

      const datos = await respuesta.json();

      console.log(
        "Respuesta al eliminar:",
        datos
      );

      if (!respuesta.ok) {
        throw new Error(
          obtenerMensajeError(
            datos,
            "No fue posible eliminar el usuario."
          )
        );
      }

      setModalVisible(false);

      mostrarMensaje(
        "Usuario eliminado",
        datos.message ||
          "El usuario fue eliminado correctamente.",
        () => {
          router.replace("/(tabs)/consulta");
        }
      );
    } catch (error) {
      console.error(
        "Error al eliminar usuario:",
        error
      );

      mostrarMensaje(
        "Error",
        error.message ||
          "No fue posible conectar con la API."
      );
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Detalles del Usuario
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nombre
        </Text>

        <Text style={styles.valor}>
          {nombre}
        </Text>

        <View style={styles.linea} />

        <Text style={styles.label}>
          Edad
        </Text>

        <Text style={styles.valor}>
          {edad} años
        </Text>

        <Pressable
          style={styles.botonActualizar}
          onPress={abrirFormularioEdicion}
        >
          <Text style={styles.textoBoton}>
            Actualizar
          </Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() =>
            setModalVisible(true)
          }
        >
          <Text style={styles.textoBoton}>
            Eliminar
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>
              Confirmar eliminación
            </Text>

            <Text style={styles.textoModal}>
              ¿Estás seguro de que deseas
              eliminar al usuario {nombre}?
            </Text>

            <View style={styles.accionesModal}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() =>
                  setModalVisible(false)
                }
                disabled={eliminando}
              >
                <Text
                  style={styles.textoCancelar}
                >
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.botonConfirmar,
                  eliminando &&
                    styles.botonDeshabilitado,
                ]}
                onPress={eliminarUsuario}
                disabled={eliminando}
              >
                <Text style={styles.textoBoton}>
                  {eliminando
                    ? "Eliminando..."
                    : "Sí, eliminar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 13,
    color: "#6B7280",
  },

  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 5,
  },

  linea: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  botonActualizar: {
    backgroundColor: "#FACC15",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 28,
  },

  botonEliminar: {
    backgroundColor: "#EF4444",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  fondoModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 25,
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
  },

  tituloModal: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#DC2626",
    textAlign: "center",
  },

  textoModal: {
    color: "#4B5563",
    textAlign: "center",
    marginVertical: 20,
  },

  accionesModal: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  botonCancelar: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
  },

  botonConfirmar: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
  },

  textoCancelar: {
    color: "#1F2937",
    fontWeight: "bold",
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },
});