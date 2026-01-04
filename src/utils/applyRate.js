export const applyTaxDiscount = (products) => {
  return products.map(product => {
    const price = Number(product.price ?? product.precio);
    const taxRate = Number(product.tax ?? product.impuesto) / 100 || 0;       
    const discountRate  = Number(product.discount ?? product.descuento) / 100 || 0; 

    const priceWithTax = price * (1 + taxRate);

    const finalPrice = priceWithTax * (1 - discountRate );

    return {
      ...product,
      price: finalPrice
    };
  });
};