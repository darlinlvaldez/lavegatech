document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  async function searchProducts(query) {
    try {
      const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error en la búsqueda');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  
  function displayResults(products) {
    searchResults.innerHTML = '';

    if (products.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No se encontraron productos</div>';
      searchResults.style.display = 'block';
      return;
    }
    
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'search-result-item';
      productElement.innerHTML = `
        <a href="/product/${product.id}${product.colores ? `?color=${encodeURIComponent(product.colores.split(',')[0])}` : ''}">
          <img src="${product.imagen?.split(',')[0]}" alt="${product.nombre}">
          <div class="product-info">
            <h4>${product.nombre} ${product.especificaciones || ""}</h4>
            <p>${product.categoria === 'moviles' ? 'Móviles' : product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}</p>
          </div>
          <div class="product-price">
            $${formatPrice(Number(product.precio))}
            ${product.descuento > 0 ? `<del class="product-old-price">$${formatPrice(Number(product.precio) / (1 - product.descuento / 100))}</del>` : ''}
          </div>
        </a>
      `;
      searchResults.appendChild(productElement);
    });
    searchResults.style.display = 'block';
  }
    
  searchInput.addEventListener("focus", async function () {
    const query = this.value.trim();
    if (query.length >= 2) {
      const products = await searchProducts(query);
      displayResults(products);
    }
  });

  searchInput.addEventListener('input', async function() {
    const query = this.value.trim();
    if (query.length >= 2) {
      const products = await searchProducts(query);
      displayResults(products);
    } else {
      searchResults.style.display = 'none';
    }
  });

  document.addEventListener('click', function(e) {
    if (!searchForm.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
});