import { Platform } from "react-native";

const IP_COMPUTADORA = "192.168.1.84";

export const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/v1/usuarios/"
    : `http://${IP_COMPUTADORA}:5000/v1/usuarios/`;

const CREDENCIALES_BASIC = "YWRtaW46MTIzNA==";

export const headersPublicos = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const headersAutenticados = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Basic ${CREDENCIALES_BASIC}`,
};