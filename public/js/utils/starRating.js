
export function renderStars(rating = 0, options = {}) {
  const {
    productId = null,
    withLink = false,
    withTooltip = false,
    starClass = '',
    includeContainer = false
  } = options;

  const starsHTML = Array.from({ length: 5 }, (_, i) => {
    const starIndex = i + 1;
    
    if (starIndex <= Math.floor(rating)) {
      return `<i class="fa-solid fa-star ${starClass}"></i>`;
    } else if (i < rating) {
      return `<i class="fa-regular fa-star-half-stroke ${starClass}"></i>`;
    } else {
      return `<i class="fa-regular fa-star ${starClass}"></i>`;
    }
  }).join('');

  if (!includeContainer && !withLink && !withTooltip) {
    return starsHTML;
  }

  let containerHTML = '';

  if (withLink && productId) {
    containerHTML = `
      <div class="product-rating" data-product-id="${productId}">
        <a href="/product/${productId}#tab3" class="rating-link">
          ${starsHTML}
        </a>
        ${withTooltip ? '<div class="rating-tooltip hidden"></div>' : ''}
      </div>
    `;
  } else if (includeContainer) {
    containerHTML = `
      <div class="product-rating" ${productId ? `data-product-id="${productId}"` : ''}>
        ${starsHTML}
        ${withTooltip ? '<div class="rating-tooltip hidden"></div>' : ''}
      </div>
    `;
  }

  return containerHTML || starsHTML;
}