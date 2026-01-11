function changeVariantById(variantId) {
  const select = document.getElementById("variantSelect");
  if (!select) return;

  select.value = variantId;
  select.dispatchEvent(new Event("change"));
}

function changeVariant(select) {
  if (syncingFromSlick) return;

  const variantId = select.value;
  const variants = window.productData.variants;
  const index = variants.findIndex(v => v.id == variantId);
  if (index === -1) return;

  syncingFromSlick = true;
  $("#product-main-img").slick("slickGoTo", index);
  syncingFromSlick = false;

  // stock
  document.getElementById("stockDisponible").textContent =
    `Cantidad disponible: ${variants[index].stock}`;

  // cantidad
  const qty = document.getElementById("productQuantity");
  qty.innerHTML = "";
  for (let i = 1; i <= variants[index].stock; i++) {
    qty.append(new Option(i, i));
  }

  document.getElementById("add-to-cart-btn").dataset.variantId = variantId;

  const productId = document.getElementById("add-to-cart-btn").dataset.id;
  history.replaceState(null, "", `/product/${productId}?variant=${variantId}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const productRoot = document.getElementById("product-root");
  if (!productRoot) return;

  window.productData = {
    variants: JSON.parse(productRoot.dataset.variants),
  };
});