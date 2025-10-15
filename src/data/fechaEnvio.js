export function obtenerFechaEntrega(dias = 2) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);

  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  return fecha.toLocaleDateString("es-ES", opciones);
}
