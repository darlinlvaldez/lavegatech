function changeImage(productId, color) {
    const slickInstance = $('#product-main-img').slick('getSlick');
    const slides = $('#product-main-img img');

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].alt === color) {
            slickInstance.slickGoTo(i);
            break;
        }
    }
}

async function changeColor(selectOrEvent, productId) {
  let color;
  
  if (typeof selectOrEvent === 'object' && 'value' in selectOrEvent) {
    color = selectOrEvent.value;
  } else if (typeof selectOrEvent === 'string') {
    color = selectOrEvent;
  } else { return;
  }

  const encodedColor = encodeURIComponent(color);

  if ($('#selectedColor').val() !== color) {
    $('#selectedColor').val(color);
  }

  changeImage(productId, color);

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.dataset.color = color;
    
    const variantsByColor = window.productData.variantsByColor || {};
    const varianteId = variantsByColor[color];
    
    if (varianteId) {
      addToCartBtn.dataset.variantId = varianteId;
      console.log('Variante ID actualizado:', varianteId, 'para color:', color);
    }
  }
  
  history.replaceState({ color }, '', `/product/${productId}?color=${encodedColor}`);

  const stockColor = window.productData.stockByColor[color] || 0;

  const quantitySelect  = document.getElementById('productQuantity');
  if (quantitySelect ) {
    quantitySelect .innerHTML = '';
    const maxOptions = Math.min(stockColor); 
    for(let i = 1; i <= maxOptions; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      quantitySelect .appendChild(option);
    }
  }

  const stockElement = document.getElementById('stockDisponible');
  if (stockElement) {
    stockElement.textContent = `Cantidad disponible: ${stockColor}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const productRoot = document.getElementById('product-root');
    
    if (productRoot) {
        window.productData = {
            stockByColor: JSON.parse(productRoot.dataset.productStocks),
            variantsByColor: JSON.parse(productRoot.dataset.productVariantes || '{}'),
            productId: productRoot.dataset.productId
        };
    } else {
        window.productData = {
            stockByColor: {},
            variantsByColor: {},
            productId: null
        };
    }
    
    syncColorFromURL();
});

function syncColorFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const color = urlParams.get('color');
    if (color) {
        const decodedColor = decodeURIComponent(color);
        const colorSelect = document.getElementById('selectedColor');
        if (colorSelect) {colorSelect.value = decodedColor;
            colorSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

document.addEventListener('DOMContentLoaded', syncColorFromURL);