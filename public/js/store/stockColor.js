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

  const stock = variants[index].stock;

  document.getElementById("stockDisponible").textContent =
    `Cantidad disponible: ${stock}`;

  const qtySelect = document.getElementById("productQuantity");
  const outLabel = document.getElementById("outOfStockLabel");

  qtySelect.innerHTML = "";

  if (stock > 0) {
    qtySelect.style.display = "block";
    outLabel.style.display = "none";

    for (let i = 1; i <= stock; i++) {
      qtySelect.append(new Option(i, i));
    }
  } else {
    qtySelect.style.display = "none";
    outLabel.style.display = "inline-block";
  }

  const btn = document.getElementById("add-to-cart-btn");
  btn.dataset.variantId = variantId;
  btn.dataset.stock = stock;
  btn.dataset.color = variants[index].color;

  btn.disabled = stock <= 0;

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