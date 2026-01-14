let ratingTimeout;

export async function showRatingTooltip(ratingEl) {
  const tooltip = ratingEl.querySelector('.rating-tooltip');
  if (!tooltip) return;

  clearTimeout(ratingTimeout);

  tooltip.classList.add('active');
  tooltip.classList.remove('hidden');

  if (tooltip.dataset.loaded) return;

  const productId = ratingEl.dataset.productId;
  if (!productId) return;

  try {
    const res = await fetch(`/api/comparison/product/${productId}/rating-breakdown`);
    if (!res.ok) return;

    const data = await res.json();
    const totalReviews = data.reduce((sum, r) => sum + r.total, 0);

    tooltip.innerHTML = renderRatingBars(data, totalReviews, productId);
    tooltip.dataset.loaded = "true";
  } catch (err) {
    console.error("Error cargando tooltip:", err);
  }
}

export function hideRatingTooltip(ratingEl) {
  const tooltip = ratingEl.querySelector('.rating-tooltip');
  if (!tooltip) return;

  ratingTimeout = setTimeout(() => {
    tooltip.classList.remove('active');
    setTimeout(() => {
      if (!tooltip.classList.contains('active')) {
        tooltip.classList.add('hidden');
      }
    }, 250);
  }, 120);
}

function calculateAverageRating(data, totalReviews) {
  if (!totalReviews) return 0;

  const sum = data.reduce(
    (acc, r) => acc + r.stars * r.total,
    0
  );

  return (sum / totalReviews).toFixed(1);
}

function renderRatingBars(data, totalReviews, productId) {
  const baseData = [5, 4, 3, 2, 1];

  const averageRating = calculateAverageRating(data, totalReviews);

  const rows = baseData.map(stars => {
    const found = data.find(d => d.stars === stars);
    const total = found ? found.total : 0;

    const percent = totalReviews
      ? Math.round((total / totalReviews) * 100)
      : 0;

    return `
      <div class="rating-row">
       <span class="stars">
        ${stars}
        <i class="fa-solid fa-star rating-star"></i>
      </span>
        <div class="bar">
          <div class="fill" style="width:${percent}%"></div>
        </div>
        <span class="percent">${percent}%</span>
      </div>
    `;
  }).join('');

  return `
    <a href="/product/${productId}#tab3" class="rating-box">
      <div class="rating-summary">
        ${totalReviews > 0 ? `
            <div class="rating-average">
              <strong>${averageRating}</strong>
              <i class="fa-solid fa-star rating-star"></i>
              <span class="out-of">de 5</span>
            </div>
              <div class="rating-total">
                ${totalReviews} reseña${totalReviews !== 1 ? 's' : ''}
              </div>
            `
            : `<div class="no-reviews">Este producto aún no tiene reseñas</div>`
        }
      </div>

      ${totalReviews > 0 ? rows : ''}

    </a>
  `;
}