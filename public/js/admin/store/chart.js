import { renderTablaVentasBase, formatDate } from "../../utils/reportTable.js";

document.addEventListener("DOMContentLoaded", () => {
  const rangoSelect = document.getElementById("rangoSelect");
  const tipoGraficoSelect = document.getElementById("tipoGraficoSelect");
  const mesSelect = document.getElementById("mesSelect");
  const fechaSelect = document.getElementById("fechaSelect");
  const labelMesSelect = document.getElementById("labelMesSelect");
  const labelFechaSelect = document.getElementById("labelFechaSelect");
  const contenedorFiltrosFecha = document.getElementById("contenedorFiltrosFecha");
  const anioInput = document.getElementById("anioInput");
  const labelAnioInput = document.getElementById("labelAnioInput");
  const fechaDesde = document.getElementById("fechaDesde");
  const fechaHasta = document.getElementById("fechaHasta");
  const labelFechaDesde = document.getElementById("labelFechaDesde");
  const labelFechaHasta = document.getElementById("labelFechaHasta");
  const btn = document.getElementById("btnVerTodos");

  const ctx = document.getElementById("ventasChart").getContext("2d");
  let ventasChart = null;
  let tipoFiltro = "fecha";

  document.getElementById("btnFecha").addEventListener("click", () => {
    tipoFiltro = "fecha";
    document.getElementById("btnFecha").classList.add("active");
    document.getElementById("btnProductos").classList.remove("active");
    loadData();
    toggleFiltroFecha();
  });

  document.getElementById("btnProductos").addEventListener("click", () => {
    tipoFiltro = "productos";
    document.getElementById("btnProductos").classList.add("active");
    document.getElementById("btnFecha").classList.remove("active");
    loadData();
    toggleFiltroFecha();
  });

  function toggleFiltroFecha() {
    if (tipoFiltro === "productos") {
      contenedorFiltrosFecha.style.display = "none";
    } else {
      contenedorFiltrosFecha.style.display = "block";
      toggleInputs();
    }
  }

  function toggleInputs() {
    const rango = rangoSelect.value;

    const showMes = rango === "mes";
    mesSelect.style.display = showMes ? "inline-block" : "none";
    labelMesSelect.style.display = showMes ? "inline-block" : "none";

    const showFecha = rango === "fecha-especifica";
    fechaSelect.style.display = showFecha ? "inline-block" : "none";
    labelFechaSelect.style.display = showFecha ? "inline-block" : "none";

    const showAnio = rango === "año";
    anioInput.style.display = showAnio ? "inline-block" : "none";
    labelAnioInput.style.display = showAnio ? "inline-block" : "none";

    const showPersonalizado = rango === "personalizado";
    fechaDesde.style.display = showPersonalizado ? "inline-block" : "none";
    fechaHasta.style.display = showPersonalizado ? "inline-block" : "none";
    labelFechaDesde.style.display = showPersonalizado ? "inline-block" : "none";
    labelFechaHasta.style.display = showPersonalizado ? "inline-block" : "none";
  }

  async function loadData() {
    const rango = rangoSelect.value;
    const tipoGrafico =
      tipoFiltro === "productos" ? "bar" : tipoGraficoSelect.value;
    const mes = mesSelect.value;
    const fecha = fechaSelect.value;

    const anio = anioInput.value;
    const fechaDesdeValor = fechaDesde.value;
    const fechaHastaValor = fechaHasta.value;

    let tituloExtra = "";

    let url = "";

    if (rango === "año" && anio) {
      url += `&anio=${anio}`;
    }

    if (rango === "personalizado" && fechaDesdeValor && fechaHastaValor) {
      url += `&desde=${fechaDesdeValor}&hasta=${fechaHastaValor}`;
    }

    if (tipoFiltro === "fecha") {
      url = `/api/admin/ventas-por-fecha?rango=${rango}`;

      if (rango === "mes" && mes) url += `&mes=${mes}`;
      if (rango === "fecha-especifica" && fecha) url += `&fecha=${fecha}`;
      if (rango === "año" && anio) url += `&anio=${anio}`;
      if (rango === "personalizado" && fechaDesdeValor && fechaHastaValor)
        url += `&desde=${fechaDesdeValor}&hasta=${fechaHastaValor}`;
    } else {
      url = `/api/admin/top-productos`;
    }

    if (rango === "fecha-especifica" && fecha) {
      const d = new Date(fecha);
      tituloExtra = d.toLocaleDateString("es-DO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (btn) btn.remove();

    if (tipoFiltro === "fecha") {
      renderBotonVerTodos({
        tableContainerId: "tablaReporte",
        texto: "Ver todas",
        url: "/admin/allSales",
      });
    } else {
      renderBotonVerTodos({
        tableContainerId: "tablaReporte",
        texto: "Ver todos",
        url: "/admin/allProducts",
      });
    }

    const res = await fetch(url);
    const data = await res.json();
    
   renderTablaVentasBase({
  data,
  tableId: "tablaReporte",
  tituloId: "tablaTitulo",
  tipo: tipoFiltro, // 👈 CLAVE
  rango,
  fechaBase: fecha,
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
    Total vendido: <strong>$${totalVendido.toFixed(2)}</strong><br>
    Total de pedidos: <strong>${totalPedidos}</strong><br>
    Ticket promedio: <strong>$${ticketPromedio.toFixed(2)}</strong>`;
    } else {
      document.getElementById("resumenVentas").innerHTML = "";
    }

    let etiquetas = [];
    let valores = [];
    let precios = [];

    if (tipoFiltro === "fecha") {
      etiquetas = data.map((item) => formatDate(item.fecha, rango));

      valores = data.map((item) => Number(item.totalVentas));
    } else {
      etiquetas = data.map((item) => item.nombre_producto);
      valores = data.map((item) => Number(item.totalVendido));
      precios = data.map((item) => Number(item.totalPrecio));
    }

    if (ventasChart) ventasChart.destroy();

    Chart.register(ChartDataLabels);

    ventasChart = new Chart(ctx, {
      type: tipoGrafico,
      data: {
        labels: etiquetas,
        datasets: [
          {
            label:
              tipoFiltro === "fecha"
                ? `Ventas (${rango})`
                : "Top productos (cantidad)",
            data: valores,
            backgroundColor:
              tipoGrafico === "bar"
                ? [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(199, 199, 199, 0.6)",
                  ]
                : "transparent",
            borderColor:
              tipoGrafico === "bar"
                ? [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(199, 199, 199, 1)",
                  ]
                : "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: tipoGrafico === "line",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text:
              rango === "fecha-especifica"
                ? [`Ventas por hora`, tituloExtra]
                : tipoFiltro === "fecha"
                ? `Ventas (${rango})`
                : "Top productos vendidos",
            font: {
              size: 18,
              weight: "bold",
            },
            padding: {
              top: 12,
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                if (tipoFiltro === "productos") {
                  const index = context.dataIndex;
                  return `${context.dataset.label}: ${context.parsed.y} unidades - $${precios[index]}`;
                } else {
                  return `${context.dataset.label}: $${context.parsed.y}`;
                }
              },
            },
          },
          datalabels:
            tipoFiltro === "productos"
              ? {
                  anchor: "end",
                  align: "top",
                  offset: -5,
                  formatter: function (value, ctx) {
                    const index = ctx.dataIndex;
                    return `$${precios[index]}`;
                  },
                  font: { weight: "bold", size: 12 },
                }
              : false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text:
                tipoFiltro === "fecha"
                  ? rango === "fecha-especifica"
                    ? "Hora"
                    : "Fecha"
                  : "Producto",
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
  }

  rangoSelect.addEventListener("change", () => {
    toggleInputs();
    loadData();
  });

  tipoGraficoSelect.addEventListener("change", loadData);
  mesSelect.addEventListener("change", loadData);
  fechaSelect.addEventListener("change", loadData);
  anioInput.addEventListener("input", loadData);
  fechaDesde.addEventListener("change", loadData);
  fechaHasta.addEventListener("change", loadData);

  toggleInputs();
  loadData();
  toggleFiltroFecha();
});

function renderBotonVerTodos({ tableContainerId, texto, url }) {
  const contenedor = document.getElementById(tableContainerId);
  if (!contenedor || document.getElementById("btnVerTodos")) return;

  contenedor.insertAdjacentHTML(
    "afterend",
    `
    <div class="filtro-tipo" style="margin-top:10px;">
      <button id="btnVerTodos" class="active">${texto}</button>
    </div>
    `
  );

  document.getElementById("btnVerTodos").onclick = () => {
    window.location.href = url;
  };
}

renderBotonVerTodos({
  tableContainerId: "reporteTable",
  texto: "Ver todas",
  url: "/admin/allSales"
});