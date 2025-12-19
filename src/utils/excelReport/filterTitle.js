export function salesTitle({ tipo, rango, mes, fecha, anio, desde, hasta, limit, categorias, totalProductos }) {
  if (tipo === 'productos') {
    let titulo = 'Top ';

    const numero = limit ? Number(limit) : (totalProductos || 0);
    titulo += numero ? `${numero} ` : '';
    titulo += 'productos';

    if (categorias && categorias.length) {
      titulo += ` (${categorias.join(', ')})`;
    }
    return titulo;
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