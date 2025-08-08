export function getMensajeError(error) {
  let mensaje = "Error desconocido";

  if (error.response?.data) {
    mensaje = typeof error.response.data === "string"
      ? error.response.data
      : error.response.data.message || mensaje;
  } else if (error.message) {
    mensaje = error.message;
  }

  return mensaje;
}