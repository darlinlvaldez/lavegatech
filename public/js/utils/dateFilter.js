export function initDateFilters({
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
  onChange,
}) {
  function toggleInputs() {
    const rango = rangoSelect.value;

    mesSelect.style.display = labelMesSelect.style.display =
      rango === "mes" ? "inline-block" : "none";
    fechaSelect.style.display = labelFechaSelect.style.display =
      rango === "fecha-especifica" ? "inline-block" : "none";
    anioInput.style.display = labelAnioInput.style.display =
      rango === "año" ? "inline-block" : "none";
    fechaDesde.style.display =
      fechaHasta.style.display =
      labelFechaDesde.style.display =
      labelFechaHasta.style.display =
        rango === "personalizado" ? "inline-block" : "none";
  }

  rangoSelect.addEventListener("change", () => {
    toggleInputs();
    if (onChange) onChange();
  });

  [mesSelect, fechaSelect, anioInput, fechaDesde, fechaHasta].forEach((el) => {
    if (el) el.addEventListener("change", onChange);
    if (el?.type === "number") el.addEventListener("input", onChange);
  });

  toggleInputs();
}

export function buildDateQuery({
  rangoSelect,
  mesSelect,
  fechaSelect,
  anioInput,
  fechaDesde,
  fechaHasta,
}) {
  const rango = rangoSelect.value;
  const mes = mesSelect?.value;
  const fecha = fechaSelect?.value;
  const anio = anioInput?.value;
  const desde = fechaDesde?.value;
  const hasta = fechaHasta?.value;

  let query = `?rango=${rango}`;
  if (rango === "mes" && mes) query += `&mes=${mes}`;
  if (rango === "fecha-especifica" && fecha) query += `&fecha=${fecha}`;
  if (rango === "año" && anio) query += `&anio=${anio}`;
  if (rango === "personalizado" && desde && hasta)
    query += `&desde=${desde}&hasta=${hasta}`;

  return query;
}

export function dateTitle({ rango, fecha }) {
  if (rango !== "fecha-especifica" || !fecha) return "";

  const d = new Date(fecha);
  return d.toLocaleDateString("es-DO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}