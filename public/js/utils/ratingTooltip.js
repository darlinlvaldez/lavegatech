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
    const res = await fetch(`/comparison/product/${productId}/rating-breakdown`);
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
    }, 300);
  }, 100);
}

function renderRatingBars(data, totalReviews, productId) {
  return `
    <a href="/product/${productId}#tab3" class="rating-box">
      ${data
        .sort((a, b) => b.stars - a.stars)
        .map(r => {
          const percent = Math.round((r.total / totalReviews) * 100);
          return `
            <div class="rating-row">
              <span class="stars">${r.stars}★</span>
              <div class="bar">
                <div class="fill" style="width:${percent}%"></div>
              </div>
              <span class="percent">${percent}%</span>
            </div>
          `;
        }).join('')
      }
    </a>
  `;
}
