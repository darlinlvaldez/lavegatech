export function generarTituloExcel({ tipo, rango, mes, fecha, anio, desde, hasta }) {
  if (tipo === 'productos') {
    return 'Top Productos Vendidos';
  }

  if (tipo === 'fecha') {
    switch (rango) {
      case 'fecha-especifica':
        if (fecha) {
          const [y, m, d] = fecha.split('-').map(Number);
          return `Ventas (${d.toString().padStart(2, '0')}/${m
            .toString()
            .padStart(2, '0')}/${y})`;
        }
        break;

      case 'mes':
        if (mes) {
          const [y, m] = mes.split('-');
          const dateObj = new Date(y, m - 1, 1);
          return `Ventas (${dateObj.toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric',
          })})`;
        }
        break;

      case 'año':
        if (anio) {
          return `Ventas (Año ${anio})`;
        }
        break;

      case 'personalizado':
        if (desde && hasta) {
          const formatDate = (dateStr) => {
            const [y, m, d] = dateStr.split('-');
            return `${d}/${m}/${y}`;
          };
          return `Ventas (${formatDate(desde)} - ${formatDate(hasta)})`;
        }
        break;
    }
  }

  return 'Reporte de Ventas';
}