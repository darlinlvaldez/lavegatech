import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from './showValidation.js';

let baterias = [];
let bateriasFiltradas = [];

const bateriaModal = document.getElementById("bateriaModal");
const bateriaForm = document.getElementById("bateriaForm");
const bateriaIdInput = document.getElementById("bateriaId");
const bateriaCapacidadInput = document.getElementById("bateriaCapacidad");
const bateriaTipoInput = document.getElementById("bateriaTipo");
const bateriaCargaRapidaInput = document.getElementById("bateriaCargaRapida");
const bateriaCargaInalambricaInput = document.getElementById("bateriaCargaInalambrica");
const modalBateriaTitle = document.getElementById("modalBateriaTitle");
const cancelBateriaModalBtn = document.getElementById("cancelBateriaModalBtn");
const addBateriaBtn = document.getElementById("addBateriaBtn");
const bateriasTableBody = document.getElementById("bateriasTableBody");
const searchBateriasInput = document.getElementById("searchBateriasInput");

const bateriaErrorFields = ["capacidad", "tipo", "carga_rapida"];

function renderBaterias() {
  bateriasTableBody.innerHTML = "";

  const lista = bateriasFiltradas.length > 0 ? bateriasFiltradas : baterias;

  lista.forEach(b => {
    const cargaInalambricaText = b.carga_inalambrica ? "Sí" : "No";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.id}</td>
      <td>${b.capacidad || '-'}</td>
      <td>${b.tipo || '-'}</td>
      <td>${b.carga_rapida || '-'}</td>
      <td>${cargaInalambricaText}</td>
      <td>
        <button onclick="editBateria(${b.id})" class="edit-button">Editar</button>
        <button onclick="deleteBateria(${b.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    bateriasTableBody.appendChild(row);
  });
}

searchBateriasInput.addEventListener("input", () => {
  const query = searchBateriasInput.value.trim().toLowerCase();
  bateriasFiltradas = query ? baterias.filter(b =>
    (b.capacidad && b.capacidad.toLowerCase().includes(query)) ||
    (b.tipo && b.tipo.toLowerCase().includes(query)) ||
    (b.carga_rapida && b.carga_rapida.toLowerCase().includes(query)) ||
    (b.carga_inalambrica && (b.carga_inalambrica ? "sí" : "no").includes(query))
  ) : [];
  renderBaterias();
});

addBateriaBtn.addEventListener("click", () => {
  modalBateriaTitle.textContent = "Añadir Nueva Batería";
  bateriaForm.reset();
  bateriaIdInput.value = "";
  bateriaCargaInalambricaInput.checked = false;
  bateriaModal.classList.add("visible");
});

cancelBateriaModalBtn.addEventListener("click", () => {
  bateriaModal.classList.remove("visible");
  clearError(bateriaErrorFields, "#bateriaForm");
});

bateriaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(bateriaErrorFields, "#bateriaForm");

  const id = bateriaIdInput.value;
  const capacidad = bateriaCapacidadInput.value.trim();
  const tipo = bateriaTipoInput.value.trim();
  const carga_rapida = bateriaCargaRapidaInput.value.trim();
  const carga_inalambrica = bateriaCargaInalambricaInput.checked ? 1 : 0;

  const body = JSON.stringify({ capacidad, tipo, carga_rapida, carga_inalambrica });
  const url = id ? `/api/specs/baterias/${id}` : "/api/specs/baterias";
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
        showValidation(data.errors, "#bateriaForm");
      } else {
        showToast(data.error || "Error al guardar la batería.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Batería actualizada." : "Batería agregada.", "#27ae60", "check-circle");
    bateriaModal.classList.remove("visible");
    fetchBaterias();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editBateria = function (id) {
  const b = baterias.find(x => x.id === id);
  if (b) {
    modalBateriaTitle.textContent = "Editar Batería";
    bateriaIdInput.value = b.id;
    bateriaCapacidadInput.value = b.capacidad || "";
    bateriaTipoInput.value = b.tipo || "";
    bateriaCargaRapidaInput.value = b.carga_rapida || "";
    bateriaCargaInalambricaInput.checked = b.carga_inalambrica ? true : false;
    bateriaModal.classList.add("visible");
  }
};

window.deleteBateria = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Batería?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/baterias/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchBaterias();
    showToast("Batería eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la batería.", "#e74c3c", "alert-circle");
  }
};

async function fetchBaterias() {
  try {
    const res = await fetch("/api/specs/baterias");
    baterias = await res.json();
    renderBaterias();
  } catch (err) {
    showToast("Error al cargar las baterías.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBaterias();
});