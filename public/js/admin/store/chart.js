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
    mesSelect.style.display = rango === "mes" ? "inline-block" : "none";
    labelMesSelect.style.display = rango === "mes" ? "inline-block" : "none";

    fechaSelect.style.display =
      rango === "fecha-especifica" ? "inline-block" : "none";
    labelFechaSelect.style.display =
      rango === "fecha-especifica" ? "inline-block" : "none";

    if (rango !== "mes") mesSelect.value = "";
    if (rango !== "fecha-especifica") fechaSelect.value = "";
  }

  async function loadData() {
    const rango = rangoSelect.value;
    const tipoGrafico =
      tipoFiltro === "productos" ? "bar" : tipoGraficoSelect.value;
    const mes = mesSelect.value;
    const fecha = fechaSelect.value;

    let url = "";
    if (tipoFiltro === "fecha") {
      url = `/api/admin/ventas-por-fecha?rango=${rango}`;
      if (mes && rango === "mes") url += `&mes=${mes}`;
      if (fecha && rango === "fecha-especifica") url += `&fecha=${fecha}`;
    } else {
      url = `/api/admin/top-productos`;
    }

    const res = await fetch(url);
    const data = await res.json();

    let etiquetas = [];
    let valores = [];
    let precios = [];

    if (tipoFiltro === "fecha") {
      etiquetas = data.map((item) => {
        if (rango === "fecha-especifica") return item.fecha;
        if (rango === "mes") {
          const [year, month] = item.fecha.split("-");
          return `${month}/${year}`;
        }
        if (rango === "año") return item.fecha;
        const date = new Date(item.fecha);
        return date.toLocaleDateString("es-DO");
      });
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
            text: tipoFiltro === "fecha" ? `Ventas (${rango})` : "Top productos vendidos",
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
              text: tipoFiltro === "fecha" ? "Fecha" : "Producto",
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

  toggleInputs();
  loadData();
  toggleFiltroFecha();
});