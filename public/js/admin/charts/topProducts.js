
let productos = [];
let tbody = null;
let tfoot = null;

function render(data) {
  tbody.innerHTML = '';
  tfoot.innerHTML = '';

  let totalCantidad = 0;
  let totalIngresos = 0;

  data.forEach((item, index) => {
    const nombre = item.nombre_producto || 'Producto';
    const especificaciones = item.especificaciones || '';
    const cantidad = Number(item.totalVendido || 0);
    const ingresos = Number(item.totalPrecio || 0);

    totalCantidad += cantidad;
    totalIngresos += ingresos;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td style="text-align:left; font-weight:bold">${index + 1}</td>
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

async function loadAllProductos() {
  const res = await fetch("/api/admin/allProducts-data");

  const response = await res.json();

  productos = response.todos || [];

  tbody = document.querySelector('#tablaTodosProductos tbody');
  tfoot = document.querySelector('#tablaTodosProductos tfoot');

  const searchInput = document.getElementById("searchTopProductos");
  const btnPDF = document.getElementById("btnDescargarPDF");
  const btnExcel = document.getElementById("btnExcel");

  render(productos);


  searchInput?.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = productos.filter(p =>
      (p.nombre_producto || '').toLowerCase().includes(searchTerm)
    );
    render(filtered);
  });

  btnPDF?.addEventListener("click", () => {
    generatePDF({
      container: ".container-report-pdf",
      filename: "LaVegaTech-Top-Productos.pdf",
      orientation: "landscape",
      useCORS: true,
      pagebreak: { mode: ["css", "legacy"] },
    });
  });

  btnPDF?.removeAttribute("disabled");

  btnExcel?.addEventListener("click", () => {
    const params = new URLSearchParams({
      tipo: "productos",
    });
    window.location.href = `/api/admin/export-excel?${params}`;
  });
}

function actualizarTopProductos() {
  const limite = document.getElementById('limite-select')?.value || '';

  const categorias = [...document.querySelectorAll('input[name="categoria"]:checked')]
    .map(c => c.value).join(',');

  const marcas = [...document.querySelectorAll('input[name="marca"]:checked')]
    .map(m => m.value).join(',');

  fetch(`/api/admin/top-productos?limite=${limite}&categoria=${categorias}&marca=${marcas}`)
    .then(res => res.json())
    .then(data => {
      productos = data.todos || [];
      render(productos);
    })
    .catch(err => console.error('Error filtrando productos:', err));
}

async function actualizarMarcasPorCategoria() {
  const categorias = [...document.querySelectorAll('input[name="categoria"]:checked')]
    .map(c => c.value)
    .join(',');

  const res = await fetch(`/api/admin/marcaCategoria?categoria=${categorias}`);
  const data = await res.json();

  const contenedor = document.querySelector('.filter-group.marcas');
  contenedor.innerHTML = '';

  data.marcas.forEach(m => {
    contenedor.insertAdjacentHTML('beforeend', `
      <label>
        <input type="checkbox" name="marca" value="${m.marca_id}"
               onchange="actualizarTopProductos()">
        ${m.marca} (${m.cantidad})
      </label>
    `);
  });
}

window.actualizarMarcasPorCategoria = actualizarMarcasPorCategoria;

loadAllProductos();