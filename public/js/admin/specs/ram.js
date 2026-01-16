import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let rams = [];
let ramsFiltradas = [];

const ramModal = document.getElementById("ramModal");
const ramForm = document.getElementById("ramForm");
const ramIdInput = document.getElementById("ramId");
const ramCapacidadInput = document.getElementById("ramCapacidad");
const ramTipoInput = document.getElementById("ramTipo");
const modalRAMTitle = document.getElementById("modalRAMTitle");
const cancelRAMModalBtn = document.getElementById("cancelRAMModalBtn");
const addRAMBtn = document.getElementById("addRAMBtn");
const ramTableBody = document.getElementById("ramTableBody");
const searchRAMInput = document.getElementById("searchRAMInput");

const ramErrorFields = ["capacidad", "tipo"];

function renderRAMs() {
  ramTableBody.innerHTML = "";

  const lista = ramsFiltradas.length > 0 ? ramsFiltradas : rams;

  lista.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.id}</td>
      <td>${r.capacidad || '-'}</td>
      <td>${r.tipo || '-'}</td>
      <td>
        <button onclick="editRAM(${r.id})" class="edit-button">Editar</button>
        <button onclick="deleteRAM(${r.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    ramTableBody.appendChild(row);
  });
}

searchRAMInput.addEventListener("input", () => {
  const query = searchRAMInput.value.trim().toLowerCase();
  ramsFiltradas = query ? rams.filter(r =>
    (r.capacidad && r.capacidad.toLowerCase().includes(query)) ||
    (r.tipo && r.tipo.toLowerCase().includes(query))
  ) : [];
  renderRAMs();
});

addRAMBtn.addEventListener("click", () => {
  modalRAMTitle.textContent = "Añadir Nueva RAM";
  ramForm.reset();
  ramIdInput.value = "";
  ramModal.classList.add("visible");
});

cancelRAMModalBtn.addEventListener("click", () => {
  ramModal.classList.remove("visible");
  clearError(ramErrorFields, "#ramForm");
});

ramForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(ramErrorFields, "#ramForm");

  const id = ramIdInput.value;
  const capacidad = ramCapacidadInput.value;
  const tipo = ramTipoInput.value;

  const body = JSON.stringify({ capacidad, tipo });
  const url = id ? `/api/specs/ram/${id}` : "/api/specs/ram";
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
        showValidation(data.errors, "#ramForm");
      } else {
        showToast(data.error || "Error al guardar la RAM.", "error");
      }
      return;
    }

    showToast(id ? "RAM actualizada." : "RAM agregada.", "success");
    ramModal.classList.remove("visible");
    fetchRAMs();
  } catch (err) {
    showToast("Error inesperado.", "error");
  }
});

window.editRAM = function (id) {
  const r = rams.find(x => x.id === id);
  if (r) {
    modalRAMTitle.textContent = "Editar RAM";
    ramIdInput.value = r.id;
    ramCapacidadInput.value = r.capacidad || "";
    ramTipoInput.value = r.tipo || "";
    ramModal.classList.add("visible");
  }
};

window.deleteRAM = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar RAM?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/ram/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchRAMs();
    showToast("RAM eliminada con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar la RAM.", "error");
  }
};

async function fetchRAMs() {
  try {
    const res = await fetch("/api/specs/ram");
    rams = await res.json();
    renderRAMs();
  } catch (err) {
    showToast("Error al cargar las RAMs.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRAMs();
});