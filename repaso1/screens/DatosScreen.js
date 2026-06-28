import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Platform,
  Alert,
  Keyboard,
  StyleSheet
} from "react-native";

export default function DatosScreen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [Semestre, setSemestre] = useState('');


  const procesarRegistro = () => {

    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }

    if (!nombre || !carrera || !semestre ) {
      alertasManager("Validación", "Todos los campos son obligatorios");
      return;
    }

    alertasManager("Éxito", `Registro procesado para: ${nombre}`);
  };

  const alertasManager = (titulo, mensaje) => {

    if (Platform.OS === "web") {
      alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }

  };

  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
      />
     
  <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
      />
  
      <Button
        title="Registrar"
        onPress={procesarRegistro}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f6fa",
  },

  input: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

});