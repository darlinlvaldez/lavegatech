import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from './showValidation.js';

let dispositivos = [];
let filtrarDispositivos = [];
let cpus = [];
let gpus = [];
let pantallas = [];
let baterias = [];
let camaras = [];
let conectividades = [];
let dimensionespeso = [];
let productos = [];

let dispositivoIdSeleccionado = null;

const deviceModal = document.getElementById("deviceModal");
const deviceForm = document.getElementById("deviceForm");
const deviceModalTitle = document.getElementById("deviceModalTitle");
const cancelDeviceModalBtn = document.getElementById("cancelDeviceModalBtn");
const deviceIdInput = document.getElementById("deviceId");
const deviceNameInput = document.getElementById("deviceName");
const deviceCpuInput = document.getElementById("deviceCpu");
const deviceGpuInput = document.getElementById("deviceGpu");
const deviceScreenInput = document.getElementById("deviceScreen");
const searchDeviceInput = document.getElementById("searchDeviceInput");
const devicesTableBody = document.getElementById("devicesTableBody");
const addDeviceBtn = document.getElementById("addDeviceBtn");
const suggestionsDevice = document.getElementById("suggestionsDevice");
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

const deviceErrorFields = [
  "nombre", "cpu", "gpu", "pantalla", "camara", "bateria", "conectividad", "dimensionespeso"
];

async function fetchCpus() {
  const res = await fetch('/api/specs/cpu');
  cpus = await res.json();
}

async function fetchGpus() {
  const res = await fetch('/api/specs/gpu');
  gpus = await res.json();
}

async function fetchPantallas() {
  const res = await fetch('/api/specs/pantalla');
  pantallas = await res.json();
}

async function fetchBaterias() {
  const res = await fetch('/api/specs/baterias');
  baterias = await res.json();
}

async function fetchCamaras() {
  const res = await fetch('/api/specs/camaras');
  camaras = await res.json();
}

async function fetchConectividades() {
  const res = await fetch('/api/specs/conectividades');
  conectividades = await res.json();
}

async function fetchDimensiones() {
  const res = await fetch('/api/specs/dimensionespeso');
  dimensionespeso = await res.json();
}

async function fetchAllSpecs() {
  await Promise.all([
    fetchCpus(),
    fetchGpus(),
    fetchPantallas(),
    fetchBaterias(),
    fetchCamaras(),
    fetchConectividades(),
    fetchDimensiones()
  ]);
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
  
setupAutocomplete({
  inputEl: deviceCpuInput,
  suggestionsEl: suggestionsCpu,
  dataArray: cpus.map(cpu => cpu.nombre)
});

setupAutocomplete({
  inputEl: deviceGpuInput,
  suggestionsEl: suggestionsGpu,
  dataArray: gpus.map(gpu => gpu.modelo)
});

setupAutocomplete({
  inputEl: deviceScreenInput,
  suggestionsEl: suggestionsScreen,
  dataArray: pantallas.map(p => `${p.tamaño} ${p.resolucion} ${p.tipo}`)
});

setupAutocomplete({
  inputEl: deviceNameInput,
  suggestionsEl: suggestionsDevice,
  dataArray: productos.map(p => p.nombre)
});

setupAutocomplete({
  inputEl: deviceCameraInput,
  suggestionsEl: suggestionsCamera,
  dataArray: camaras.map(c => `${c.principal} / Selfie: ${c.selfie}`)
});

setupAutocomplete({
  inputEl: deviceBatteryInput,
  suggestionsEl: suggestionsBattery,
  dataArray: baterias.map(b => `${b.capacidad} ${b.tipo} ${b.carga_rapida ? 'Carga rápida' : ''} ${b.carga_inalambrica ? 'Inalámbrica' : ''}`)
});

setupAutocomplete({
  inputEl: deviceConnectivityInput,
  suggestionsEl: suggestionsConnectivity,
  dataArray: conectividades.map(c => `${c.red} ${c.wifi} ${c.bluetooth} ${c.nfc ? 'NFC' : ''}`)
});

setupAutocomplete({
  inputEl: deviceSizeWeightInput,
  suggestionsEl: suggestionsSizeWeight,
  dataArray: dimensionespeso.map(d => `${d.altura}x${d.anchura}x${d.grosor} ${d.peso}g`)
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
      showToast("Error al cargar los dispositivos.", "#e74c3c", "alert-circle");
      return;
    }
    dispositivos = await res.json();
    console.log('Dispositivos recibidos:', dispositivos);
    filtrarDispositivos = [];
    renderMobiles();
  } catch (err) {
    console.error('Error en fetchDispositivos:', err);
    showToast("Error al cargar los dispositivos.", "#e74c3c", "alert-circle");
  }
}


function renderMobiles() {
  devicesTableBody.innerHTML = "";

  const lista = filtrarDispositivos.length > 0 ? filtrarDispositivos : dispositivos;

  lista.forEach((d) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${d.id}</td>
      <td>${d.nombre}</td>
      <td>${d.ram || '-'}</td>
      <td>${d.cpu || '-'}</td>
      <td>${d.almacenamiento || '-'}</td>
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
  clearError(deviceErrorFields, "#deviceForm");
  deviceModal.classList.add("visible");
});

cancelDeviceModalBtn.addEventListener("click", () => {
  deviceModal.classList.remove("visible");
  clearError(deviceErrorFields, "#deviceForm");
});

window.editDispositivo = function (id) {
  const dispositivo = dispositivos.find(d => d.id === id);
  if (!dispositivo) return;

  deviceModalTitle.textContent = "Editar Dispositivo";
  deviceIdInput.value = dispositivo.id;
  dispositivoIdSeleccionado = dispositivo.id;

  deviceNameInput.value = dispositivo.nombre;
  deviceNameInput.readOnly = true;
  deviceCpuInput.value = dispositivo.cpu;
  deviceGpuInput.value = dispositivo.gpu;
  deviceScreenInput.value = dispositivo.pantalla;
  deviceCameraInput.value = dispositivo.camara || "";
  deviceBatteryInput.value = dispositivo.bateria || "";
  deviceConnectivityInput.value = dispositivo.conectividad || "";
  deviceSizeWeightInput.value = dispositivo.dimensionespeso || "";

  clearError(deviceErrorFields, "#deviceForm");
  deviceModal.classList.add("visible");
};

function buscarIdPorNombre(array, valorInput, campoNombre = null, formatter = null) {
  return array.find(item => {
    const comparacion = formatter ? formatter(item) : item[campoNombre];
    return comparacion === valorInput;
  })?.id || null;
}

deviceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(deviceErrorFields, "#deviceForm");

  if (!dispositivoIdSeleccionado) {
    showValidation([{ path: "nombre", message: "Debe seleccionar un dispositivo válido de la lista" }], "#deviceForm");
    return;
  }

  const id = deviceIdInput.value;

const body = {
  cpu_id: buscarIdPorNombre(cpus, deviceCpuInput.value.trim(), "nombre"),
  gpu_id: buscarIdPorNombre(gpus, deviceGpuInput.value.trim(), "modelo"),
  pantalla_id: buscarIdPorNombre(pantallas, deviceScreenInput.value.trim(), null, (p) =>
    `${p.tamaño} ${p.resolucion} ${p.tipo}`.trim()
  ),
  camara_id: buscarIdPorNombre(camaras, deviceCameraInput.value.trim(), null, (c) =>
    `${c.principal} / Selfie: ${c.selfie}`.trim()
  ),
  bateria_id: buscarIdPorNombre(baterias, deviceBatteryInput.value.trim(), null, (b) =>
    `${b.capacidad} ${b.tipo} ${b.carga_rapida ? 'Carga rápida' : ''} ${b.carga_inalambrica ? 'Inalámbrica' : ''}`.trim()
  ),
  conectividad_id: buscarIdPorNombre(conectividades, deviceConnectivityInput.value.trim(), null, (c) =>
    `${c.red} ${c.wifi} ${c.bluetooth} ${c.nfc ? 'NFC' : ''}`.trim()
  ),
  dimensionespeso_id: buscarIdPorNombre(dimensionespeso, deviceSizeWeightInput.value.trim(), null, (d) =>
    `${d.altura}x${d.anchura}x${d.grosor} ${d.peso}g`
  )
};


  try {
    const res = await fetch(id ? `/api/specs/movil/${id}` : "/api/specs/movil", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#deviceForm");
      } else {
        showToast(data.message || "Error al guardar el dispositivo.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Dispositivo actualizado con éxito." : "Dispositivo agregado con éxito.", "#27ae60", "check-circle");
    deviceModal.classList.remove("visible");
    await fetchDispositivos();

  } catch (err) {
    showToast("Error inesperado al guardar el dispositivo.", "#e74c3c", "alert-circle");
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
    showToast("Dispositivo eliminado con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar el dispositivo.", "#e74c3c", "alert-circle");
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