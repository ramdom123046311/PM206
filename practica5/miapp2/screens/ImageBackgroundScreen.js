import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

export default function FondoPantalla() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashText}>
          Cargando aplicación...
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://picsum.photos/500/900'
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>
          Bienvenido a React Native
        </Text>

        <Text style={styles.subtitulo}>
          Ejemplo de ImageBackground y SplashScreen
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },

  splashText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  background: {
    flex: 1,
    width: '100%'
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },

  titulo: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10
  },

  subtitulo: {
    fontSize: 18,
    color: '#ffffff'
  }
});