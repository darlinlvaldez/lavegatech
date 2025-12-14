async function loadAllProductos() {
  const res = await fetch('/api/admin/allProducts');
  const data = await res.json();

  const searchInput = document.getElementById("searchTopProductos");
  const tbody = document.querySelector('#tablaTodosProductos tbody');
  const tfoot = document.querySelector('#tablaTodosProductos tfoot');

  let productos = data; 

  function render(filteredData) {
    tbody.innerHTML = '';
    tfoot.innerHTML = '';

    let totalCantidad = 0;
    let totalIngresos = 0;

    filteredData.forEach(item => {
      const nombre = item.nombre_producto || 'Producto';
      const especificaciones = item.especificaciones || '';
      const cantidad = Number(item.totalVendido || 0);
      const ingresos = Number(item.totalPrecio || 0);

      totalCantidad += cantidad;
      totalIngresos += ingresos;

      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${nombre} ${especificaciones}</td>
          <td style="text-align:right">${cantidad}</td>
          <td style="text-align:right">$${formatPrice(ingresos)}</td>
        </tr>
      `);
    });

    tfoot.innerHTML = `
      <tr>
        <td style="text-align:right">Totales</td>
        <td style="text-align:right">${totalCantidad}</td>
        <td style="text-align:right">$${formatPrice(totalIngresos)}</td>
      </tr>
    `;
  }

  render(productos);

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = productos.filter(p =>
      (p.nombre_producto || '').toLowerCase().includes(searchTerm)
    );
    render(filtered);
  });
}

loadAllProductos();