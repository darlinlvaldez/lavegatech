function formatPrice(price) {
  const value = Number(price);

  if (isNaN(value)) return "0.00";

  return value
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}