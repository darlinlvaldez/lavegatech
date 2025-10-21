function calculateItem(item, stock = Infinity) {
    const precioFinal = Number(item.precio) || 0;
    const descuento = Number(item.descuento) || 0;
    const impuesto = Number(item.impuesto) || 0; 
    const cantidad = Math.min(Number(item.cantidad) || 1, stock);
    const especificaciones = item.especificaciones || "";
    const precioAntesDescuento = descuento > 0 ? precioFinal / (1 - descuento / 100) : precioFinal;
    const total = precioFinal * cantidad;

    const productId = item.id || item.producto_id;
    const color = item.colorSeleccionado || "";
    const varianteId = item.variante_id || null;

    return {
        precioFinal, descuento, impuesto, cantidad, especificaciones,
        precioAntesDescuento, total, productId, color, varianteId
    };
}

export { calculateItem };