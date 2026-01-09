import { showRatingTooltip, hideRatingTooltip } from './ratingTooltip.js';

document.addEventListener('mouseover', (e) => {
  const rating = e.target.closest('.product-rating');
  if (rating) showRatingTooltip(rating);
});

document.addEventListener('mouseout', (e) => {
  const rating = e.target.closest('.product-rating');
  if (rating) hideRatingTooltip(rating);
});

document.addEventListener('click', (e) => {
  const rating = e.target.closest('.product-rating.clickable-rating');
  if (!rating) return;

  if (e.target.closest('.rating-tooltip')) return;

  const productId = rating.dataset.productId;
  if (!productId) return;

  window.location.href = `/product/${productId}#tab3`;
});

const hash = window.location.hash;
if (hash) {
  const tabLink = document.querySelector(`.tab-nav a[href="${hash}"]`);
  if (tabLink) tabLink.click();
}