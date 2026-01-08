import { showRatingTooltip, hideRatingTooltip } from './ratingTooltip.js';

document.addEventListener('mouseover', e => {
  const ratingEl = e.target.closest('.product-rating');
  if (!ratingEl) return;

  showRatingTooltip(ratingEl);
});

document.addEventListener('mouseout', e => {
  const ratingEl = e.target.closest('.product-rating');
  if (!ratingEl) return;

  hideRatingTooltip(ratingEl);
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash !== "#tab3") return;

  const tabLink = document.querySelector('a[data-toggle="tab"][href="#tab3"]');
  const tabPane = document.getElementById("tab3");

  if (!tabLink || !tabPane) return;

  if (window.jQuery && typeof jQuery.fn.tab === "function") {
    jQuery(tabLink).tab("show");
  } else {
    tabLink.click();
  }

  setTimeout(() => {
    tabPane.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 200);
});

document.addEventListener("click", (e) => {
  const rating = e.target.closest(".product-rating");
  if (!rating) return;

  const productId = rating.dataset.productId;
  if (!productId) return;

  window.location.href = `/product/${productId}#tab3`;
});
