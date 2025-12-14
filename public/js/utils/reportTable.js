export function renderTablaVentasBase({
  data,
  tableId,
  tituloId,
  tipo,
  rango,
  tituloExtra,
  fechaBase,
  mostrarTituloFecha, 
}) {
  const table = document.getElementById(tableId);
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  const tfoot = table.querySelector("tfoot");
  const titulo = document.getElementById(tituloId);

  thead.innerHTML = "";
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    titulo.textContent = "Sin datos";
    return;
  }

  if (tipo === "fecha") {

  titulo.textContent =
    rango === "fecha-especifica"
      ? `Ventas por hora (${tituloExtra})`
      : "Ventas";

    thead.innerHTML = `
      <tr>
        <th>${rango === "fecha-especifica" ? "Hora" : "Fecha"}</th>
        <th style="text-align:right">Ventas</th>
      </tr>
    `;

    let total = 0;
    data.forEach(item => {
      total += Number(item.totalVentas || 0);
      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
          <td>${formatDate(item.fecha, rango)}</td>
          <td style="text-align:right">$${formatPrice(item.totalVentas)}</td>
        </tr>`
      );
    });

    tfoot.innerHTML = `
      <tr>
        <td style="text-align:left;">Total</td>
        <td style="text-align:right">$${formatPrice(total)}</td>
      </tr>
    `;
  }

  if (tipo === "productos") {
    titulo.textContent = "Top productos";

    thead.innerHTML = `
      <tr>
        <th>Producto</th>
        <th style="text-align:right">Cantidad</th>
        <th style="text-align:right">Ingresos</th>
      </tr>
    `;

    let totalCantidad = 0;
    let totalIngresos = 0;

    data.forEach(item => {
      totalCantidad += Number(item.totalVendido);
      totalIngresos += Number(item.totalPrecio);

      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
          <td>${item.nombre_producto}</td>
          <td style="text-align:right">${item.totalVendido}</td>
          <td style="text-align:right">$${formatPrice(item.totalPrecio)}</td>

        </tr>`
      );
    });

    tfoot.innerHTML = `
      <tr>
        <td style="text-align:left">Totales</td>
        <td style="text-align:right">${totalCantidad}</td>
        <td style="text-align:right">$${formatPrice(totalIngresos)}</td>
      </tr>
    `;
  }
}

export function updateBotonVerTodos(tipo) {
  let btn = document.getElementById("btnVerTodos");

  if (!btn) {
    const contenedor = document.getElementById("tablaReporte");
    contenedor.insertAdjacentHTML(
      "afterend",
      `
      <div class="filtro-tipo" style="margin-top:10px;">
        <button id="btnVerTodos" class="active"></button>
      </div>
      `
    );
    btn = document.getElementById("btnVerTodos");
  }

  if (tipo === "fecha") {
    btn.textContent = "Ver más";
    btn.onclick = () => (window.location.href = "/admin/allSales");
  } else {
    btn.textContent = "Ver más";
    btn.onclick = () => (window.location.href = "/admin/allProducts");
  }
}

function formatHora12(hora) {
  const [h] = hora.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:00 ${ampm}`;
}

function cleanDate(fecha) {
  return fecha.split("T")[0];
}

export function formatDate(fecha, rango) {
  if (!fecha) return "";

  if (rango === "fecha-especifica") {
    return formatHora12(fecha);
  }

  fecha = cleanDate(fecha);

  if (rango === "mes") {
    const [year, month] = fecha.split("-");
    return `${month}/${year}`;
  }

  if (rango === "año" || rango === "personalizado") {
    return fecha;
  }

  const d = new Date(fecha);
  return d.toLocaleDateString("es-DO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}