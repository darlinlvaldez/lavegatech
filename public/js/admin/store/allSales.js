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

  function toggleInputs() {
    const rango = rangoSelect.value;

    const showMes = rango === "mes";
    mesSelect.style.display = labelMesSelect.style.display = showMes ? "inline-block" : "none";

    const showFecha = rango === "fecha-especifica";
    fechaSelect.style.display = labelFechaSelect.style.display = showFecha ? "inline-block" : "none";

    const showAnio = rango === "año";
    anioInput.style.display = labelAnioInput.style.display = showAnio ? "inline-block" : "none";

    const showPersonalizado = rango === "personalizado";
    fechaDesde.style.display = fechaHasta.style.display =
    labelFechaDesde.style.display = labelFechaHasta.style.display =
      showPersonalizado ? "inline-block" : "none";
  }

  async function loadData() {
    const rango = rangoSelect.value;
    const mes = mesSelect.value;
    const fecha = fechaSelect.value;
    const anio = anioInput.value;
    const desde = fechaDesde.value;
    const hasta = fechaHasta.value;

    let url = `/api/admin/ventas-por-fecha?rango=${rango}`;

    if (rango === "mes" && mes) url += `&mes=${mes}`;
    if (rango === "fecha-especifica" && fecha) url += `&fecha=${fecha}`;
    if (rango === "año" && anio) url += `&anio=${anio}`;
    if (rango === "personalizado" && desde && hasta) url += `&desde=${desde}&hasta=${hasta}`;

    const res = await fetch(url);
    const data = await res.json();

    renderTablaVentas(data);
  }

  rangoSelect.addEventListener("change", () => {
    toggleInputs();
    loadData();
  });

  mesSelect.addEventListener("change", loadData);
  fechaSelect.addEventListener("change", loadData);
  anioInput.addEventListener("input", loadData);
  fechaDesde.addEventListener("change", loadData);
  fechaHasta.addEventListener("change", loadData);

  toggleInputs();
  loadData();
});

renderTablaVentasBase({
  data,
  tableId: "reporteTable",
  tituloId: "tituloTablaVentas",
  rango: rangoSelect.value,
  fechaBase: fechaSelect.value,
  mostrarTituloFecha: true
});