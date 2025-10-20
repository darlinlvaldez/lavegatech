export const impuestoDescuento = (productos) => {
  return productos.map(producto => {
    const precio = Number(producto.precio);
    const tasaImpuesto = Number(producto.impuesto) / 100 || 0;       
    const tasaDescuento = Number(producto.descuento) / 100 || 0; 

    const precioConImpuesto = precio * (1 + tasaImpuesto);

    const precioFinal = precioConImpuesto * (1 - tasaDescuento);

    return {
      ...producto,
      precio: precioFinal
    };
  });
};