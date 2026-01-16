import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let dispositivos = [];
let filtrarDispositivos = [];
let cpus = [];
let gpus = [];
let pantallas = [];
let baterias = [];
let camaras = [];
let conectividades = [];
let dimensionespeso = [];
let productosSeleccionados = [];

const deviceModal = document.getElementById("deviceModal");
const deviceForm = document.getElementById("deviceForm");
const deviceModalTitle = document.getElementById("deviceModalTitle");
const cancelDeviceModalBtn = document.getElementById("cancelDeviceModalBtn");
const deviceIdInput = document.getElementById("deviceId");
const deviceCpuInput = document.getElementById("deviceCpu");
const deviceGpuInput = document.getElementById("deviceGpu");
const deviceScreenInput = document.getElementById("deviceScreen");
const searchDeviceInput = document.getElementById("searchDeviceInput");
const devicesTableBody = document.getElementById("devicesTableBody");
const addDeviceBtn = document.getElementById("addDeviceBtn");
const suggestionsCpu = document.getElementById("suggestionsCpu");
const suggestionsGpu = document.getElementById("suggestionsGpu");
const suggestionsScreen = document.getElementById("suggestionsScreen");
const deviceCameraInput = document.getElementById("deviceCamera");
const deviceBatteryInput = document.getElementById("deviceBattery");
const deviceConnectivityInput = document.getElementById("deviceConnectivity");
const deviceSizeWeightInput = document.getElementById("deviceSizeWeight");
const suggestionsCamera = document.getElementById("suggestionsCamera");
const suggestionsBattery = document.getElementById("suggestionsBattery");
const suggestionsConnectivity = document.getElementById("suggestionsConnectivity");
const suggestionsSizeWeight = document.getElementById("suggestionsSizeWeight");

const camposFormulario = ["cpu_id", "gpu_id", "pantalla_id", "camara_id", 
  "bateria_id", "conectividad_id", "dimensionespeso_id", "productIds"];

async function fetchAndSet(url, setTo) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al cargar ${url}`);
    const data = await res.json();
    setTo.length = 0;
    setTo.push(...data);
  } catch (err) {
    console.error(`Error en fetch ${url}:`, err);
    showToast(`Error al cargar ${url}`, "error");
  }
}

async function fetchAllSpecs() {
  await Promise.all([
    fetchAndSet('/api/specs/cpu', cpus),
    fetchAndSet('/api/specs/gpu', gpus),
    fetchAndSet('/api/specs/pantalla', pantallas),
    fetchAndSet('/api/specs/baterias', baterias),
    fetchAndSet('/api/specs/camaras', camaras),
    fetchAndSet('/api/specs/conectividades', conectividades),
    fetchAndSet('/api/specs/dimensionespeso', dimensionespeso)
  ]);
}

async function fetchTodosProductos() {
  try {
    const res = await fetch("/api/specs/todos-productos");
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error('Error al cargar todos los productos:', err);
    showToast("Error al cargar productos", "error");
    return [];
  }
}

function setupAutocomplete({ inputEl, suggestionsEl, dataArray, onSelect = null }) {
  if (!Array.isArray(dataArray)) {
    console.error(`Datos no válidos para autocompletado en ${inputEl.id}`);
    return;
  }

  inputEl.addEventListener("input", () => {
    const query = inputEl.value.toLowerCase();
    suggestionsEl.innerHTML = "";
    
    if (query.length === 0) return;

    const resultados = dataArray
      .filter(val => val && val.toLowerCase().includes(query))
      .slice(0, 10);

    if (resultados.length === 0) {
      const noResults = document.createElement("div");
      noResults.textContent = "No hay coincidencias";
      noResults.className = "no-results";
      suggestionsEl.appendChild(noResults);
      return;
    }

    resultados.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item;
      div.addEventListener("click", () => {
        inputEl.value = item;
        suggestionsEl.innerHTML = "";
        if (onSelect) onSelect(item);
      });
      suggestionsEl.appendChild(div);
    });
  });
}

function setupAllAutocompletes() {
  const configs = [
    { inputEl: deviceCpuInput, suggestionsEl: suggestionsCpu, data: cpus, format: c => c.nombre },
    { inputEl: deviceGpuInput, suggestionsEl: suggestionsGpu, data: gpus, format: g => g.modelo },
    { inputEl: deviceScreenInput, suggestionsEl: suggestionsScreen, 
      data: pantallas, format: p => `${p.tamaño} ${p.resolucion} ${p.tipo}` },
    { inputEl: deviceCameraInput, suggestionsEl: suggestionsCamera, 
      data: camaras, format: c => `${c.principal} / Selfie: ${c.selfie}` },
    { inputEl: deviceBatteryInput, suggestionsEl: suggestionsBattery, 
      data: baterias, format: b => `${b.capacidad} ${b.tipo} ${b.carga_rapida ? 'Carga rápida' : ''} ${b.carga_inalambrica ? 'Inalámbrica' : ''}` },
    { inputEl: deviceConnectivityInput, suggestionsEl: suggestionsConnectivity, 
      data: conectividades, format: c => `${c.red} ${c.wifi} ${c.bluetooth} ${c.nfc ? 'NFC' : ''}` },
    { inputEl: deviceSizeWeightInput, suggestionsEl: suggestionsSizeWeight, 
      data: dimensionespeso, format: d => `${d.altura}x${d.anchura}x${d.grosor} ${d.peso}g` },
  ];

  configs.forEach(({ inputEl, suggestionsEl, data, format }) => {
    setupAutocomplete({
      inputEl,
      suggestionsEl,
      dataArray: data.map(format)
    });
  });
}

document.addEventListener("click", (e) => {
  [
    { input: deviceCpuInput, suggestions: suggestionsCpu },
    { input: deviceGpuInput, suggestions: suggestionsGpu },
    { input: deviceScreenInput, suggestions: suggestionsScreen },
    { input: deviceCameraInput, suggestions: suggestionsCamera },
    { input: deviceBatteryInput, suggestions: suggestionsBattery },
    { input: deviceConnectivityInput, suggestions: suggestionsConnectivity },
    { input: deviceSizeWeightInput, suggestions: suggestionsSizeWeight }
  ].forEach(({ input, suggestions }) => {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.innerHTML = "";
    }
  });
});

async function fetchDispositivos() {
  try {
    const res = await fetch("/api/specs/moviles");
    if (!res.ok) {
      const text = await res.text();
      console.error('Error API moviles:', res.status, text);
      showToast("Error al cargar los dispositivos.", "error");
      return;
    }
    dispositivos = await res.json();
    console.log('Dispositivos recibidos:', dispositivos);
    filtrarDispositivos = [];
    renderMobiles();
  } catch (err) {
    console.error('Error en fetchDispositivos:', err);
    showToast("Error al cargar los dispositivos.", "error");
  }
}

function renderProductosSeleccionados() {
  const lista = document.getElementById("selectedMobilesList");
  lista.innerHTML = "";
  
  productosSeleccionados.forEach(producto => {
    const li = document.createElement("li");

    li.textContent = `${producto.nombre} ${producto.specs || ""}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.className = "remove-product-btn";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      productosSeleccionados = productosSeleccionados.filter(p => p.id !== producto.id);
      renderProductosSeleccionados();
    });
    
    li.prepend(removeBtn);
    lista.appendChild(li);
  });
}

searchMobileInput.addEventListener("input", async () => {
  const query = searchMobileInput.value.trim().toLowerCase();
  suggestionsMobile.innerHTML = "";
  
  if (query.length < 2) return;

  const todosProductos = await fetchTodosProductos();

  const resultados = todosProductos.filter(p => 
    p.nombre.toLowerCase().includes(query) &&
    !productosSeleccionados.some(sel => sel.id === p.id)
  ).slice(0, 10);

  if (resultados.length === 0) {
    const noResults = document.createElement("div");
    noResults.textContent = "No hay coincidencias";
    noResults.className = "no-results";
    suggestionsMobile.appendChild(noResults);
    return;
  }

  resultados.forEach(p => {
  const div = document.createElement("div");
  
  div.textContent = `${p.nombre} ${p.specs || ""}`;
  
  div.addEventListener("click", () => {
    productosSeleccionados.push({
      id: p.id,
      nombre: p.nombre,
      specs: p.specs
    });
    renderProductosSeleccionados();
    searchMobileInput.value = "";
    suggestionsMobile.innerHTML = "";
  });
  
  suggestionsMobile.appendChild(div);
});

});

function renderMobiles() {
  devicesTableBody.innerHTML = "";

  const lista = filtrarDispositivos.length > 0 ? filtrarDispositivos : dispositivos;

  lista.forEach((d) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${d.id}</td>
      <td>${d.nombre}</td>
      <td>${d.ram || 'Vacío'}</td>
      <td>${d.almacenamiento || 'Vacío'}</td>
      <td>
        <button onclick="editDispositivo(${d.id})" class="edit-button">Editar</button>
        <button onclick="deleteDispositivo(${d.id})" class="delete-button">Eliminar</button>
      </td>
    `;

    devicesTableBody.appendChild(row);
  });
}

searchDeviceInput.addEventListener("input", () => {
  const query = searchDeviceInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filtrarDispositivos = [];
  } else {
    filtrarDispositivos = dispositivos.filter((d) =>
      d.nombre.toLowerCase().includes(query)
    );
  }

  renderMobiles();
});

addDeviceBtn.addEventListener("click", () => {
  deviceModalTitle.textContent = "Añadir Dispositivo";
  deviceForm.reset();
  deviceIdInput.value = "";
  productosSeleccionados = []; 
  renderProductosSeleccionados();
  clearError(camposFormulario, "#deviceForm");
  deviceModal.classList.add("visible");
});

cancelDeviceModalBtn.addEventListener("click", () => {
  deviceModal.classList.remove("visible");
  clearError(camposFormulario, "#deviceForm");
});

window.editDispositivo = async function (movilId) {
  const dispositivo = dispositivos.find((d) => d.id === movilId);
  if (!dispositivo) return;

  deviceModalTitle.textContent = "Editar Dispositivo";
  deviceIdInput.value = dispositivo.id;
  deviceIdInput.dataset.movilId = dispositivo.id;

  const res = await fetch("/api/specs/todos-productos");
  if (res.ok) {
    const todos = await res.json();
    const productosAsociados = todos.filter(
      (p) => p.movil_id === dispositivo.id);     
      productosSeleccionados = productosAsociados.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      specs: p.specs
    }));
    renderProductosSeleccionados();
  }

  const cpu = cpus.find((c) => c.id === dispositivo.cpu_id);
  deviceCpuInput.value = cpu ? cpu.nombre : "";

  const gpu = gpus.find((g) => g.id === dispositivo.gpu_id);
  deviceGpuInput.value = gpu ? gpu.modelo : "";

  const pantalla = pantallas.find((p) => p.id === dispositivo.pantalla_id);
  deviceScreenInput.value = pantalla
    ? `${pantalla.tamaño} ${pantalla.resolucion} ${pantalla.tipo}`
    : "";

  const camara = camaras.find((c) => c.id === dispositivo.camara_id);
  deviceCameraInput.value = camara
    ? `${camara.principal} / Selfie: ${camara.selfie}`
    : "";

  const bateria = baterias.find((b) => b.id === dispositivo.bateria_id);
  deviceBatteryInput.value = bateria
    ? `${bateria.capacidad} ${bateria.tipo} ${
        bateria.carga_rapida ? "Carga rápida" : ""
      } ${bateria.carga_inalambrica ? "Inalámbrica" : ""}`.trim()
    : "";

  const conectividad = conectividades.find(
    (c) => c.id === dispositivo.conectividad_id
  );
  deviceConnectivityInput.value = conectividad
    ? `${conectividad.red} ${conectividad.wifi} ${conectividad.bluetooth} ${
        conectividad.nfc ? "NFC" : ""
      }`.trim()
    : "";

  const dimensiones = dimensionespeso.find(
    (d) => d.id === dispositivo.dimensionespeso_id
  );
  deviceSizeWeightInput.value = dimensiones
    ? `${dimensiones.altura}x${dimensiones.anchura}x${dimensiones.grosor} ${dimensiones.peso}g`
    : "";

  deviceModal.classList.add("visible");
};

function buscarIdPorNombre(array, inputValue, key = null, formatter = null) {
  if (!inputValue?.trim()) return null;
  inputValue = inputValue.trim();

  return array.find(item => {
    const value = formatter ? formatter(item).trim() : (key ? item[key]?.trim() : '');
    return value === inputValue || value.includes(inputValue) || inputValue.includes(value);
  })?.id ?? null;
}

deviceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(camposFormulario, "#deviceForm");

  const productoId = deviceIdInput.value;
  const movilId = deviceIdInput.dataset.movilId;

  if (productoId && !movilId) {
    showToast("No se encontró el dispositivo móvil asociado", "error");
    return;
  }

  const id = deviceIdInput.value;
  const productIds = productosSeleccionados.map(p => p.id);
  
  const body = {
  cpu_id: deviceCpuInput.value.trim() ? buscarIdPorNombre(cpus, deviceCpuInput.value.trim(), "nombre") : undefined,
  gpu_id: deviceGpuInput.value.trim() ? buscarIdPorNombre(gpus, deviceGpuInput.value.trim(), "modelo") : undefined,
  pantalla_id: deviceScreenInput.value.trim() ? buscarIdPorNombre(pantallas, deviceScreenInput.value.trim(), null, (p) =>
    `${p.tamaño} ${p.resolucion} ${p.tipo}`.trim()
  ) : undefined,
  camara_id: deviceCameraInput.value.trim() ? buscarIdPorNombre(camaras, deviceCameraInput.value.trim(), null, (c) =>
    `${c.principal} / Selfie: ${c.selfie}`.trim()
  ) : undefined,
  bateria_id: deviceBatteryInput.value.trim() ? buscarIdPorNombre(baterias, deviceBatteryInput.value.trim(), null, (b) =>
    `${b.capacidad} ${b.tipo} ${b.carga_rapida ? 'Carga rápida' : ''} ${b.carga_inalambrica ? 'Inalámbrica' : ''}`.trim()
  ) : undefined,
  conectividad_id: deviceConnectivityInput.value.trim() ? buscarIdPorNombre(conectividades, deviceConnectivityInput.value.trim(), null, (c) =>
    `${c.red} ${c.wifi} ${c.bluetooth} ${c.nfc ? 'NFC' : ''}`.trim()
  ) : undefined,
  dimensionespeso_id: deviceSizeWeightInput.value.trim() ? buscarIdPorNombre(dimensionespeso, deviceSizeWeightInput.value.trim(), null, (d) =>
    `${d.altura}x${d.anchura}x${d.grosor} ${d.peso}g`
  ) : undefined,
  productIds
};

  try {
    const url = productoId ? `/api/specs/movil/${productoId}` : "/api/specs/movil";
    const method = productoId ? "PUT" : "POST";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

  const data = await res.json();

  if (!res.ok) {
    if (data.validationError && Array.isArray(data.errors)) {
      showValidation(data.errors, "#deviceForm");
    } else {
      showToast(data.message || "Error al guardar el dispositivo.", "error");
    }
    return;
  }

  showToast(id ? "Dispositivo actualizado con éxito." : "Dispositivo agregado con éxito.", "success");
  deviceModal.classList.remove("visible");
  await fetchDispositivos();

  } catch (err) {
    showToast("Error inesperado al guardar el dispositivo.", "error");
  }
});

window.deleteDispositivo = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Dispositivo?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/movil/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

    await fetchDispositivos();
    showToast("Dispositivo eliminado con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar el dispositivo.", "error");
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchDispositivos();
    await fetchAllSpecs();
    
    setupAllAutocompletes();
    
    renderMobiles();
  } catch (error) {
    console.error("Error inicializando la aplicación:", error);
    showToast("Error al cargar los datos iniciales", "#e74c3c");
  }
});