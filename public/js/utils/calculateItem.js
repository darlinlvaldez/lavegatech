function calculateItem(item, stock = Infinity) {
    const finalPrice = Number(item.precio) || 0;
    const descuento = Number(item.descuento) || 0;
    const impuesto = Number(item.impuesto) || 0; 
    const cantidad = Math.min(Number(item.cantidad) || 1, stock);
    const specs = item.specs || "";
    const precioAntesDescuento = descuento > 0 ? finalPrice / (1 - descuento / 100) : finalPrice;
    const total = finalPrice * cantidad;

    const productId = item.producto_id || item.id;
    const color = item.colorSeleccionado || "";
    const varianteId = item.variante_id || null;

    return {
        finalPrice, descuento, impuesto, cantidad, specs,
        precioAntesDescuento, total, productId, color, varianteId
    };
}

export { calculateItem };