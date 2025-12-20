export function salesSummary(data) {
  const totalVendido = data.reduce(
    (sum, r) => sum + Number(r.totalVentas || 0),
    0
  );

  const totalPedidos = data.reduce(
    (sum, r) => sum + Number(r.totalPedidos || 0),
    0
  );

  const ticketPromedio = totalPedidos > 0
    ? totalVendido / totalPedidos
    : 0;

  const ventaMaxima = Math.max(...data.map(r => Number(r.totalVentas || 0)));
  const ventaMinima = Math.min(...data.map(r => Number(r.totalVentas || 0)));

  return {
    totalVendido,
    totalPedidos,
    ticketPromedio,
    ventaMaxima,
    ventaMinima
  };
}