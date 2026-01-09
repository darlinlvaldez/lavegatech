export const applyTaxDiscount = (products) => {
  return products.map(product => {
    const price = Number(product.price);
    const taxRate = Number(product.tax) / 100 || 0;       
    const discountRate  = Number(product.discount) / 100 || 0; 

    const priceWithTax = price * (1 + taxRate);

    const finalPrice = priceWithTax * (1 - discountRate );

    return {
      ...product,
      price: finalPrice
    };
  });
};