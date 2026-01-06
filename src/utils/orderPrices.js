export function calculateItemSubtotal({ price, quantity, tax, discount }) {
  const base = Number(price) || 0;
  const qty = Number(quantity) || 0;
  const taxRate = Number(tax) / 100 || 0;
  const discountRate = Number(discount) / 100 || 0;

  const priceWithDiscount = base * (1 - discountRate);
  const priceWithTax = priceWithDiscount * (1 + taxRate);

  return priceWithTax * qty;
}