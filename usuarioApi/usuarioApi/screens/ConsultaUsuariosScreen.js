import React, {
  useCallback,
  useState,
} from "react";

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  router,
  useFocusEffect,
} from "expo-router";

import { API_URL } from "../config/api";

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const obtenerUsuarios = useCallback(async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const datos = await respuesta.json();

      console.log(
        "Respuesta de usuarios:",
        datos
      );

      if (!respuesta.ok) {
        throw new Error(
          obtenerMensajeError(
            datos,
            "No fue posible consultar usuarios."
          )
        );
      }

      setUsuarios(
        Array.isArray(datos.usuarios)
          ? datos.usuarios
          : []
      );
    } catch (errorPeticion) {
      console.error(
        "Error al consultar usuarios:",
        errorPeticion
      );

      setUsuarios([]);
      setError(
        errorPeticion.message ||
          "No fue posible conectar con la API."
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [obtenerUsuarios])
  );

  const abrirDetalle = (usuario) => {
    router.push({
      pathname: "/detalle-usuario",
      params: {
        id: String(usuario.id),
        nombre: String(usuario.nombre),
        edad: String(usuario.edad),
      },
    });
  };

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>
        {item.nombre}
      </Text>

      <View style={styles.linea} />

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable
        style={styles.botonDetalle}
        onPress={() => abrirDetalle(item)}
      >
        <Text style={styles.textoDetalle}>
          Ver detalles →
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTexto}>
            {error}
          </Text>

          <Pressable
            onPress={obtenerUsuarios}
            style={styles.botonReintentar}
          >
            <Text style={styles.textoReintentar}>
              Reintentar
            </Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={usuarios}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        refreshing={cargando}
        onRefresh={obtenerUsuarios}
        ListEmptyComponent={
          !cargando && error === "" ? (
            <Text style={styles.sinUsuarios}>
              No hay usuarios registrados.
            </Text>
          ) : null
        }
      />
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

  return mensajePredeterminado;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },

  linea: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: "#4B5563",
  },

  botonDetalle: {
    marginTop: 16,
    alignSelf: "flex-end",
  },

  textoDetalle: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  errorContainer: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },

  errorTexto: {
    color: "#DC2626",
    textAlign: "center",
  },

  botonReintentar: {
    marginTop: 10,
    alignSelf: "center",
  },

  textoReintentar: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  sinUsuarios: {
    color: "#4B5563",
    textAlign: "center",
    marginTop: 30,
  },
});