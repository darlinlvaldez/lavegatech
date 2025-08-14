import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from '../showValidation.js';

let gpus = [];
let gpusFiltradas = [];

const gpuModal = document.getElementById("gpuModal");
const gpuForm = document.getElementById("gpuForm");
const gpuIdInput = document.getElementById("gpuId");
const gpuModeloInput = document.getElementById("gpuModelo");
const gpuNucleosInput = document.getElementById("gpuNucleos");
const modalGpuTitle = document.getElementById("modalGpuTitle");
const cancelGpuModalBtn = document.getElementById("cancelGpuModalBtn");
const addGPUBtn = document.getElementById("addGPUBtn");
const gpusTableBody = document.getElementById("gpusTableBody");
const searchGPUsInput = document.getElementById("searchGPUsInput");

const gpuErrorFields = ["modelo", "nucleos"];

function renderGPUs() {
  gpusTableBody.innerHTML = "";

  const lista = gpusFiltradas.length > 0 ? gpusFiltradas : gpus;

  lista.forEach(gpu => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${gpu.id}</td>
      <td>${gpu.modelo || '-'}</td>
      <td>${gpu.nucleos || '-'}</td>
      <td>
        <button onclick="editGPU(${gpu.id})" class="edit-button">Editar</button>
        <button onclick="deleteGPU(${gpu.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    gpusTableBody.appendChild(row);
  });
}

searchGPUsInput.addEventListener("input", () => {
  const query = searchGPUsInput.value.trim().toLowerCase();
  gpusFiltradas = query ? gpus.filter(gpu =>
    (gpu.modelo && gpu.modelo.toLowerCase().includes(query)) ||
    (gpu.nucleos && gpu.nucleos.toLowerCase().includes(query))
  ) : [];
  renderGPUs();
});

addGPUBtn.addEventListener("click", () => {
  modalGpuTitle.textContent = "Añadir Nueva GPU";
  gpuForm.reset();
  gpuIdInput.value = "";
  gpuModal.classList.add("visible");
});

cancelGpuModalBtn.addEventListener("click", () => {
  gpuModal.classList.remove("visible");
  clearError(gpuErrorFields, "#gpuForm");
});

gpuForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(gpuErrorFields, "#gpuForm");

  const id = gpuIdInput.value;
  const modelo = gpuModeloInput.value.trim();
  const nucleos = gpuNucleosInput.value.trim();

  const body = JSON.stringify({ modelo, nucleos });
  const url = id ? `/api/specs/gpu/${id}` : "/api/specs/gpu";
  const method = id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#gpuForm");
      } else {
        showToast(data.error || "Error al guardar la GPU.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "GPU actualizada." : "GPU agregada.", "#27ae60", "check-circle");
    gpuModal.classList.remove("visible");
    fetchGPUs();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editGPU = function (id) {
  const gpu = gpus.find(x => x.id === id);
  if (gpu) {
    modalGpuTitle.textContent = "Editar GPU";
    gpuIdInput.value = gpu.id;
    gpuModeloInput.value = gpu.modelo || "";
    gpuNucleosInput.value = gpu.nucleos || "";
    gpuModal.classList.add("visible");
  }
};

window.deleteGPU = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar GPU?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/gpu/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchGPUs();
    showToast("GPU eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la GPU.", "#e74c3c", "alert-circle");
  }
};

async function fetchGPUs() {
  try {
    const res = await fetch("/api/specs/gpu");
    gpus = await res.json();
    renderGPUs();
  } catch (err) {
    showToast("Error al cargar las GPUs.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchGPUs();
});