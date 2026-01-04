function calculateItem(item, stock = Infinity) {
    const finalPrice = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const tax = Number(item.tax) || 0; 
    const quantity = Math.min(Number(item.quantity) || 1, stock);
    const specs = item.specs || "";
    const originalPrice = discount > 0 ? finalPrice / (1 - discount / 100) : finalPrice;
    const total = finalPrice * quantity;

    const productId = item.productId || item.id;
    const color = item.selectedColor || "";
    const variantId = item.variantId || null;

    return {
        finalPrice, discount, tax, quantity, specs,
        originalPrice, total, productId, color, variantId
    };
}

export { calculateItem };