const TopProductos = {
  productos: [],
  tbody: null,
  tfoot: null,
  marcasSelect: null,

  async init() {
    this.productos = [];
    this.tbody = document.querySelector("#tablaTodosProductos tbody");
    this.tfoot = document.querySelector("#tablaTodosProductos tfoot");
    this.marcasSelect = new Choices(document.getElementById("selectMarcas"), {
      removeItemButton: true,
      searchEnabled: true,
      placeholderValue: "Seleccionar marcas",
      shouldSort: false,
    });

    document.querySelectorAll('input[name="categoria"]').forEach((c) => {
      c.addEventListener("change", () => {
        this.actualizarMarcasPorCategoria();
        this.actualizarTopProductos();
        this.updateTitle();
      });
    });

    document
      .getElementById("limite-select")
      ?.addEventListener("change", () => this.actualizarTopProductos());
    document
      .getElementById("selectMarcas")
      ?.addEventListener("change", () => this.actualizarTopProductos());
    document
      .getElementById("btnVolver")
      ?.addEventListener("click", () => window.history.back());

    await this.loadAllProductos();
  },

  render(data) {
    this.tbody.innerHTML = "";
    this.tfoot.innerHTML = "";

    let totalCantidad = 0;
    let totalIngresos = 0;

    data.forEach((item, index) => {
      const nombre = item.nombre_producto || "Producto";
      const especificaciones = item.especificaciones || "";
      const cantidad = Number(item.totalVendido || 0);
      const ingresos = Number(item.totalPrecio || 0);

      totalCantidad += cantidad;
      totalIngresos += ingresos;

      this.tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <td style="text-align:left; font-weight:bold">${index + 1}</td>
          <td>${nombre} ${especificaciones}</td>
          <td style="text-align:right">${cantidad}</td>
          <td style="text-align:right">$${formatPrice(ingresos)}</td>
        </tr>
      `
      );
    });

    this.tfoot.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:left; font-weight:bold">Totales</td>
        <td style="text-align:right; font-weight:bold">${totalCantidad}</td>
        <td style="text-align:right; font-weight:bold">$${formatPrice(
          totalIngresos
        )}</td>
      </tr>
    `;
  },

  async loadAllProductos() {
    const res = await fetch("/api/admin/top-productos");
    const response = await res.json();
    this.productos = response.todos || [];

    const searchInput = document.getElementById("searchTopProductos");
    const btnPDF = document.getElementById("btnDescargarPDF");
    const btnExcel = document.getElementById("btnExcel");

    this.render(this.productos);

    searchInput?.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = this.productos.filter((p) =>
        (p.nombre_producto || "").toLowerCase().includes(searchTerm)
      );
      this.render(filtered);
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
      const params = new URLSearchParams({ tipo: "productos" });
      window.location.href = `/api/admin/export-excel?${params}`;
    });
  },

  async actualizarTopProductos() {
    const limite = document.getElementById("limite-select")?.value || "";
    const categorias = [
      ...document.querySelectorAll('input[name="categoria"]:checked'),
    ]
      .map((c) => c.value)
      .join(",");
    const marcas = this.marcasSelect.getValue(true).join(",");

    try {
      const res = await fetch(
        `/api/admin/top-productos?limite=${limite}&categoria=${categorias}&marca=${marcas}`
      );
      const data = await res.json();
      this.productos = data.todos || [];
      this.render(this.productos);
    } catch (err) {
      console.error("Error filtrando productos:", err);
    }
  },

  async actualizarMarcasPorCategoria() {
    const categorias = [
      ...document.querySelectorAll('input[name="categoria"]:checked'),
    ].map((c) => c.value);
    if (!categorias.length) return;

    const res = await fetch(
      `/api/admin/marcaCategoria?categoria=${categorias.join(",")}`
    );
    const data = await res.json();

    this.marcasSelect.clearChoices();
    this.marcasSelect.setChoices(
      data.marcas.map((m) => ({
        value: m.marca_id,
        label: `${m.marca} (${m.cantidad})`,
      })),
      "value",
      "label",
      true
    );
  },

  updateTitle() {
    const categorias = [
      ...document.querySelectorAll('input[name="categoria"]:checked'),
    ].map((c) => c.dataset.name || c.nextSibling.textContent.trim());

    let title = "Top productos";

    if (categorias.length === 1) {
      title += ` (${categorias[0]})`;
    } else if (categorias.length > 1) {
      const mostrar = categorias.slice(0, 3).join(", ");
      title += ` (${mostrar}${
        categorias.length > 3 ? ` +${categorias.length - 3} más` : ""
      })`;
    }

    document.querySelector("#tituloTopProductos").textContent = title;
  },
};

TopProductos.init();