import { renderTablaVentasBase, formatDate, updateBotonVerTodos } from "../../utils/reportTable.js";
import { initDateFilters, buildDateQuery, dateTitle   } from "../../utils/dateFilter.js";

document.addEventListener("DOMContentLoaded", () => {
  const rangoSelect = document.getElementById("rangoSelect");
  const tipoGraficoSelect = document.getElementById("tipoGraficoSelect");
  const mesSelect = document.getElementById("mesSelect");
  const fechaSelect = document.getElementById("fechaSelect");
  const labelMesSelect = document.getElementById("labelMesSelect");
  const labelFechaSelect = document.getElementById("labelFechaSelect");
  const contenedorFiltrosFecha = document.getElementById(
    "contenedorFiltrosFecha"
  );
  const anioInput = document.getElementById("anioInput");
  const labelAnioInput = document.getElementById("labelAnioInput");
  const fechaDesde = document.getElementById("fechaDesde");
  const fechaHasta = document.getElementById("fechaHasta");
  const labelFechaDesde = document.getElementById("labelFechaDesde");
  const labelFechaHasta = document.getElementById("labelFechaHasta");

  const ctx = document.getElementById("ventasChart").getContext("2d");
  let ventasChart = null;
  let tipoFiltro = "fecha";

  const barBackgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(199, 199, 199, 0.6)",
  ];

  const barBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(199, 199, 199, 1)",
  ];

  function toggleFiltroFecha() {
    contenedorFiltrosFecha.style.display =
      tipoFiltro === "productos" ? "none" : "block";
  }

  async function loadData() {
    let url =
      tipoFiltro === "fecha"
        ? `/api/admin/ventas-por-fecha${buildDateQuery({
            rangoSelect,
            mesSelect,
            fechaSelect,
            anioInput,
            fechaDesde,
            fechaHasta,
          })}`
        : `/api/admin/top-productos`;

    const res = await fetch(url);
    const responseData = await res.json();
    const data = tipoFiltro === "productos" ? responseData.todos : responseData;

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
      tableId: "tablaReporte",
      tituloId: "tablaTitulo",
      tipo: tipoFiltro,
      tituloExtra,
      rango: rangoSelect.value,
      fechaBase: fechaSelect.value,
      mostrarTituloFecha: true,
    });

    if (tipoFiltro === "fecha") {
      const totalVendido = data.reduce(
        (sum, item) => sum + Number(item.totalVentas),
        0
      );
      const totalPedidos = data.length;
      const ticketPromedio = totalPedidos > 0 ? totalVendido / totalPedidos : 0;

      document.getElementById("resumenVentas").innerHTML = `
        Total vendido: <strong>$${formatPrice(totalVendido)}</strong><br>
        Total de pedidos: <strong>${totalPedidos}</strong><br>
        Ticket promedio: <strong>$${formatPrice(ticketPromedio)}</strong>`;
    } else {
      document.getElementById("resumenVentas").innerHTML = "";
    }

    const etiquetas =
      tipoFiltro === "fecha"
        ? data.map((item) => formatDate(item.fecha, rangoSelect.value))
        : data.map((item) => item.nombre_producto);

    const especificaciones =
      tipoFiltro === "productos"
        ? data.map((item) => item.especificaciones || "")
        : [];

    const valores =
      tipoFiltro === "fecha"
        ? data.map((item) => Number(item.totalVentas))
        : data.map((item) => Number(item.totalVendido));

    const precios =
      tipoFiltro === "productos"
        ? data.map((item) => Number(item.totalPrecio))
        : [];

    if (ventasChart) ventasChart.destroy();

    window.chartReadyForPDF = false;

    Chart.register(ChartDataLabels);

    const tipoGraficoActual =
      tipoFiltro === "productos" ? "bar" : tipoGraficoSelect.value;

    ventasChart = new Chart(ctx, {
      type: tipoGraficoActual,
      data: {
        labels: etiquetas,
        datasets: [
          tipoGraficoActual === "line"
            ? {
                label: `Ventas (${rangoSelect.value})`,
                data: valores,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.15)",
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                pointBorderColor: "#fff",
              }
            : {
                label:
                  tipoFiltro === "fecha"
                    ? `Ventas (${rangoSelect.value})`
                    : "Top productos (cantidad)",
                data: valores,
                backgroundColor: barBackgroundColors,
                borderColor: barBorderColors,
                borderWidth: 2,
              },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            window.chartReadyForPDF = true;
            document
              .getElementById("btnDescargarPDF")
              ?.removeAttribute("disabled");
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text:
              tipoFiltro === "productos"
                ? "Top productos vendidos"
                : tituloExtra
                ? ["Ventas", tituloExtra]
                : "Ventas",
            font: { size: 20, weight: "bold" },
            padding: { top: 12, bottom: 30 },
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const i = tooltipItems[0].dataIndex;
                return tipoFiltro === "productos"
                  ? `${tooltipItems[0].label} ${especificaciones[i]}`
                  : tooltipItems[0].label;
              },
              label: (context) =>
                tipoFiltro === "productos"
                  ? `${context.parsed.y} unidades - $${formatPrice(
                      precios[context.dataIndex]
                    )}`
                  : `$${formatPrice(context.parsed.y)}`,
            },
          },
          datalabels:
            tipoFiltro === "productos"
              ? {
                  anchor: "end",
                  align: "top",
                  offset: 0,
                  formatter: (value, ctx) =>
                    `$${formatPrice(precios[ctx.dataIndex])}`,
                  font: { weight: "bold", size: 14 },
                }
              : false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: tipoFiltro === "fecha" ? "Fecha" : "Producto(s)",
            },
          },
          y: {
            title: {
              display: true,
              text: tipoFiltro === "fecha" ? "Ventas ($)" : "Cantidad vendida",
            },
            beginAtZero: true,
          },
        },
      },
    });

    updateBotonVerTodos(tipoFiltro);
  }

  if (tipoFiltro === "productos") {
    const btnPDF = document.getElementById("btnDescargarPDF");
    btnPDF?.removeAttribute("disabled");
    window.chartReadyForPDF = true;
  }

  document.getElementById("btnFecha").addEventListener("click", () => {
    tipoFiltro = "fecha";
    document.getElementById("btnFecha").classList.add("active");
    document.getElementById("btnProductos").classList.remove("active");
    toggleFiltroFecha();
    loadData();
  });

  document.getElementById("btnProductos").addEventListener("click", () => {
    tipoFiltro = "productos";
    document.getElementById("btnProductos").classList.add("active");
    document.getElementById("btnFecha").classList.remove("active");
    toggleFiltroFecha();
    loadData();
  });

  const btnPDF = document.getElementById("btnDescargarPDF");

  btnPDF?.addEventListener("click", () => {
    if (!window.chartReadyForPDF) return;

    generatePDF({
      container: ".container-report-pdf",
      filename:
        tipoFiltro === "productos"
          ? "LaVegaTech-Top-Productos.pdf"
          : "LaVegaTech-Reporte-Ventas.pdf",
      orientation: "landscape",
      useCORS: true,
      pagebreak: {
        mode: ["css", "legacy"],
      },
    });
  });

  tipoGraficoSelect.addEventListener("change", () => {
    if (tipoFiltro === "fecha") {
      loadData();
    }
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
    onChange: loadData,
  });

  document.getElementById("btnExcel").addEventListener("click", () => {
    const params = new URLSearchParams({
      tipo: tipoFiltro,
      rango: rangoSelect.value,
      mes: mesSelect.value,
      fecha: fechaSelect.value,
      anio: anioInput.value,
      desde: fechaDesde.value,
      hasta: fechaHasta.value,
      limit: tipoFiltro === "productos" ? 10 : null,
    });

    window.location.href = `/api/admin/export-excel?${params}`;
  });

  loadData();
  toggleFiltroFecha();
});