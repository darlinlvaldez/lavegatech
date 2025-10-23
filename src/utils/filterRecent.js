export const filterRecentProducts = (productos, dias = 30) => {
  const hoy = new Date();
  return productos.filter(p => {
    if (!p.fecha_publicacion) return false;
    const fechaPub = new Date(p.fecha_publicacion);
    const diferenciaDias = (hoy - fechaPub) / (1000 * 60 * 60 * 24);
    return diferenciaDias <= dias;
  });
};