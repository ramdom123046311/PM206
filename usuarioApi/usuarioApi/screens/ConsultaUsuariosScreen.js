import React, { useCallback, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import { useFocusEffect } from "expo-router";


const API_URL = "http://localhost:5000/v1/usuarios/";


export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);


  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!respuesta.ok) {
        const textoError = await respuesta.text();

        throw new Error(
          `Error ${respuesta.status}: ${textoError}`
        );
      }

      const datos = await respuesta.json();

      console.log("Respuesta API:", datos);

      if (Array.isArray(datos.usuarios)) {
        setUsuarios(datos.usuarios);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.log("Error API:", error);
      setUsuarios([]);
    }
  };


  /*
   * Se ejecuta cada vez que entras a la pestaña Listado.
   * Así aparecerán los usuarios agregados desde Alta.
   */
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );


  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>
        {item.nombre}
      </Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onRefresh={obtenerUsuarios}
        refreshing={false}
        ListEmptyComponent={
          <Text style={styles.info}>
            No hay usuarios registrados.
          </Text>
        }
      />
    </SafeAreaView>
  );
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
});