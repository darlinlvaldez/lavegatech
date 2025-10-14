function cambiarImagen(productId, color) {
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

  if ($('#colorSeleccionado').val() !== color) {
    $('#colorSeleccionado').val(color);
  }

  cambiarImagen(productId, color);

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.dataset.color = color;
  }
  
  history.replaceState({ color }, '', `/product/${productId}?color=${encodedColor}`);

  const stockColor = window.productData.stocksPorColor[color] || 0;

  const cantidadSelect = document.getElementById('cantidad');
  if (cantidadSelect) {
    cantidadSelect.innerHTML = '';
    const maxOptions = Math.min(stockColor); 
    for(let i = 1; i <= maxOptions; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      cantidadSelect.appendChild(option);
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
            stocksPorColor: JSON.parse(productRoot.dataset.productStocks),
            productId: productRoot.dataset.productId
        };
    } else {window.productData = {
        stocksPorColor: {},
        productId: null};
    }
});

function syncColorFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const color = urlParams.get('color');
    if (color) {
        const decodedColor = decodeURIComponent(color);
        const colorSelect = document.getElementById('colorSeleccionado');
        if (colorSelect) {colorSelect.value = decodedColor;
            colorSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

document.addEventListener('DOMContentLoaded', syncColorFromURL);