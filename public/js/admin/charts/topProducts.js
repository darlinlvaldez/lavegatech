async function loadAllProductos() {
  const res = await fetch("/api/admin/allProducts");
  const response = await res.json();
  const productosData = response.todos;

  const searchInput = document.getElementById("searchTopProductos");
  const tbody = document.querySelector('#tablaTodosProductos tbody');
  const tfoot = document.querySelector('#tablaTodosProductos tfoot');

  let productos = productosData.map((item, index) => ({
    ...item, rankGlobal: index + 1}));

  function render(filteredData) {
    tbody.innerHTML = '';
    tfoot.innerHTML = '';

    let totalCantidad = 0;
    let totalIngresos = 0;

    filteredData.forEach((item) => {
      const nombre = item.nombre_producto || 'Producto';
      const especificaciones = item.especificaciones || '';
      const cantidad = Number(item.totalVendido || 0);
      const ingresos = Number(item.totalPrecio || 0);

      totalCantidad += cantidad;
      totalIngresos += ingresos;

      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="text-align:left; font-weight:bold">${item.rankGlobal}</td>
          <td>${nombre} ${especificaciones}</td>
          <td style="text-align:right">${cantidad}</td>
          <td style="text-align:right">$${formatPrice(ingresos)}</td>
        </tr>
      `);
    });

    tfoot.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:left; font-weight:bold">Totales</td>
        <td style="text-align:right; font-weight:bold">${totalCantidad}</td>
        <td style="text-align:right; font-weight:bold">$${formatPrice(totalIngresos)}</td>
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