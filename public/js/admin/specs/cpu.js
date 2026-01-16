import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let cpus = [];
let cpusFiltradas = [];

const cpuModal = document.getElementById("cpuModal");
const cpuForm = document.getElementById("cpuForm");
const cpuIdInput = document.getElementById("cpuId");
const cpuNombreInput = document.getElementById("cpuNombre");
const cpuNucleosInput = document.getElementById("cpuNucleos");
const cpuVelocidadInput = document.getElementById("cpuVelocidad");
const modalCpuTitle = document.getElementById("modalCpuTitle");
const cancelCpuModalBtn = document.getElementById("cancelCpuModalBtn");
const addCPUBtn = document.getElementById("addCPUBtn");
const cpusTableBody = document.getElementById("cpusTableBody");
const searchCPUsInput = document.getElementById("searchCPUsInput");

const cpuErrorFields = ["nombre", "nucleos", "velocidad"];

function renderCPUs() {
  cpusTableBody.innerHTML = "";

  const lista = cpusFiltradas.length > 0 ? cpusFiltradas : cpus;

  lista.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nombre || '-'}</td>
      <td>${c.nucleos || '-'}</td>
      <td>${c.velocidad || '-'}</td>
      <td>
        <button onclick="editCPU(${c.id})" class="edit-button">Editar</button>
        <button onclick="deleteCPU(${c.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    cpusTableBody.appendChild(row);
  });
}

searchCPUsInput.addEventListener("input", () => {
  const query = searchCPUsInput.value.trim().toLowerCase();
  cpusFiltradas = query ? cpus.filter(c =>
    (c.nombre && c.nombre.toLowerCase().includes(query)) ||
    (c.nucleos && c.nucleos.toLowerCase().includes(query)) ||
    (c.velocidad && c.velocidad.toLowerCase().includes(query))
  ) : [];
  renderCPUs();
});

addCPUBtn.addEventListener("click", () => {
  modalCpuTitle.textContent = "Añadir Nueva CPU";
  cpuForm.reset();
  cpuIdInput.value = "";
  cpuModal.classList.add("visible");
});

cancelCpuModalBtn.addEventListener("click", () => {
  cpuModal.classList.remove("visible");
  clearError(cpuErrorFields, "#cpuForm");
});

cpuForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(cpuErrorFields, "#cpuForm");

  const id = cpuIdInput.value;
  const nombre = cpuNombreInput.value.trim();
  const nucleos = cpuNucleosInput.value.trim();
  const velocidad = cpuVelocidadInput.value.trim();

  const body = JSON.stringify({ nombre, nucleos, velocidad });
  const url = id ? `/api/specs/cpu/${id}` : "/api/specs/cpu";
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
        showValidation(data.errors, "#cpuForm");
      } else {
        showToast(data.error || "Error al guardar la CPU.", "error");
      }
      return;
    }

    showToast(id ? "CPU actualizada." : "CPU agregada.", "success");
    cpuModal.classList.remove("visible");
    fetchCPUs();
  } catch (err) {
    showToast("Error inesperado.", "error");
  }
});

window.editCPU = function (id) {
  const c = cpus.find(x => x.id === id);
  if (c) {
    modalCpuTitle.textContent = "Editar CPU";
    cpuIdInput.value = c.id;
    cpuNombreInput.value = c.nombre || "";
    cpuNucleosInput.value = c.nucleos || "";
    cpuVelocidadInput.value = c.velocidad || "";
    cpuModal.classList.add("visible");
  }
};

window.deleteCPU = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar CPU?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/cpu/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchCPUs();
    showToast("CPU eliminada con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar la CPU.", "error");
  }
};

async function fetchCPUs() {
  try {
    const res = await fetch("/api/specs/cpu");
    cpus = await res.json();
    renderCPUs();
  } catch (err) {
    showToast("Error al cargar las CPUs.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCPUs();
});