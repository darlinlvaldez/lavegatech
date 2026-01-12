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

  document.getElementById("stockDisponible").textContent =
    `Cantidad disponible: ${variants[index].stock}`;

  const qty = document.getElementById("productQuantity");
  qty.innerHTML = "";
  for (let i = 1; i <= variants[index].stock; i++) {
    qty.append(new Option(i, i));
  }

  const btn = document.getElementById("add-to-cart-btn");
  btn.dataset.variantId = variantId;
  btn.dataset.stock = variants[index].stock;
  btn.dataset.color = variants[index].color;

  const productId = btn.dataset.id;
  history.replaceState(null, "", `/product/${productId}?variant=${variantId}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const productRoot = document.getElementById("product-root");
  if (!productRoot) return;

  window.productData = {
    variants: JSON.parse(productRoot.dataset.variants),
  };

  const params = new URLSearchParams(window.location.search);
  const variantId = params.get("variant");

  if (variantId) {
    setTimeout(() => {
      const select = document.getElementById("variantSelect");
      if (!select) return;

      select.value = variantId;
      changeVariant(select);
    }, 0);
  }
});