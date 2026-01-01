export function esProductoNuevo(fechaPublicacion, dias = 30) {
  if (!fechaPublicacion) return false;

  const fechaPub = new Date(fechaPublicacion);
  const hoy = new Date();

  const diffMs = hoy - fechaPub; 
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  return diffDias <= dias;
}