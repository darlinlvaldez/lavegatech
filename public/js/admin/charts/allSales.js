import { initDateFilters, buildDateQuery, dateTitle } from "../../utils/dateFilter.js";
import { renderTablaVentasBase } from "../../utils/reportTable.js";

document.addEventListener("DOMContentLoaded", () => {
  const rangoSelect = document.getElementById("rangoSelect");
  const mesSelect = document.getElementById("mesSelect");
  const fechaSelect = document.getElementById("fechaSelect");
  const anioInput = document.getElementById("anioInput");
  const fechaDesde = document.getElementById("fechaDesde");
  const fechaHasta = document.getElementById("fechaHasta");
  const labelMesSelect = document.getElementById("labelMesSelect");
  const labelFechaSelect = document.getElementById("labelFechaSelect");
  const labelAnioInput = document.getElementById("labelAnioInput");
  const labelFechaDesde = document.getElementById("labelFechaDesde");
  const labelFechaHasta = document.getElementById("labelFechaHasta");
  const btnPDF = document.getElementById("btnDescargarPDF");

  async function loadData() {
    const url = `/api/admin/ventas-por-fecha${buildDateQuery({ rangoSelect, mesSelect, fechaSelect, anioInput, fechaDesde, fechaHasta })}`;
    const res = await fetch(url);
    const data = await res.json();

    const tituloExtra = dateTitle({
      rango: rangoSelect.value,
      fecha: fechaSelect.value,
      mes: mesSelect.value,
      anio: anioInput.value,
      desde: fechaDesde.value,
      hasta: fechaHasta.value,
    });

    renderTablaVentasBase({
      data,
      tableId: "reporteTable",
      tituloId: "tituloTablaVentas",
      tipo: "fecha",
      tituloExtra,
      rango: rangoSelect.value,
      fechaBase: fechaSelect.value,
      mostrarTituloFecha: true,
    });
  }

  const btnExcel = document.getElementById("btnExcel");

  btnExcel?.addEventListener("click", () => {
    const params = new URLSearchParams({
      tipo: "fecha",
      rango: rangoSelect.value,
      mes: mesSelect.value,
      fecha: fechaSelect.value,
      anio: anioInput.value,
      desde: fechaDesde.value,
      hasta: fechaHasta.value,
    });

    window.location.href = `/api/admin/export-excel?${params}`;
  });

  initDateFilters({
    rangoSelect,
    mesSelect,
    fechaSelect,
    anioInput,
    fechaDesde,
    fechaHasta,
    labelMesSelect,
    labelFechaSelect,
    labelAnioInput,
    labelFechaDesde,
    labelFechaHasta,
    onChange: loadData
  });

  btnPDF?.addEventListener("click", () => {
      generatePDF({
        container: ".container-report-pdf",
        filename: "LaVegaTech-Ventas.pdf",
        orientation: "landscape",
        useCORS: true,
        pagebreak: { mode: ["css", "legacy"] },
      });
    });

    btnPDF?.removeAttribute("disabled");

  loadData();
});