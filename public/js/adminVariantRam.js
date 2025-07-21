import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from './showValidation.js';

let variantesRAM = [];
let variantesFiltradas = [];
let ramsDisponibles = [];
let movilesDisponibles = [];

const varianteRAMModal = document.getElementById("varianteRAMModal");
const varianteRAMForm = document.getElementById("varianteRAMForm");
const varianteRAMIdInput = document.getElementById("varianteRAMId");
const movilIdInput = document.getElementById("movilId");
const ramIdInput = document.getElementById("ramId");
const modalVarianteRAMTitle = document.getElementById("modalVarianteRAMTitle");
const cancelVarianteRAMModalBtn = document.getElementById("cancelVarianteRAMModalBtn");
const addVarianteRAMBtn = document.getElementById("addVarianteRAMBtn");
const variantesRAMTableBody = document.getElementById("variantesRAMTableBody");
const searchVariantesRAMInput = document.getElementById("searchVariantesRAMInput");

function renderVariantesRAM() {
  variantesRAMTableBody.innerHTML = "";

  const lista = variantesFiltradas.length > 0 ? variantesFiltradas : variantesRAM;

  lista.forEach(v => {
    const movil = movilesDisponibles.find(m => m.id === v.movil_id) || {};
    const ram = ramsDisponibles.find(r => r.id === v.ram_id) || {};
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movil.nombre || v.movil_id}</td>
      <td>${ram.capacidad ? `${ram.capacidad} ${ram.tipo}` : v.ram_id}</td>
      <td>
        <button onclick="editVarianteRAM(${v.movil_id}, ${v.ram_id})" class="edit-button">Editar</button>
        <button onclick="deleteVarianteRAM(${v.movil_id}, ${v.ram_id})" class="delete-button">Eliminar</button>
      </td>
    `;
    variantesRAMTableBody.appendChild(row);
  });
}

searchVariantesRAMInput.addEventListener("input", () => {
  const query = searchVariantesRAMInput.value.trim().toLowerCase();
  variantesFiltradas = query ? variantesRAM.filter(v => {
    const movil = movilesDisponibles.find(m => m.id === v.movil_id) || {};
    const ram = ramsDisponibles.find(r => r.id === v.ram_id) || {};
    return (
      (movil.nombre && movil.nombre.toLowerCase().includes(query)) ||
      (ram.capacidad && ram.capacidad.toLowerCase().includes(query)) ||
      (ram.tipo && ram.tipo.toLowerCase().includes(query))
    );
  }) : [];
  renderVariantesRAM();
});

addVarianteRAMBtn.addEventListener("click", async () => {
  modalVarianteRAMTitle.textContent = "Añadir Nueva Variante RAM";
  varianteRAMForm.reset();
  varianteRAMIdInput.value = "";
  
  // Cargar selects
  await fetchRAMsDisponibles();
  await fetchMovilesDisponibles();
  
  varianteRAMModal.classList.add("visible");
});

cancelVarianteRAMModalBtn.addEventListener("click", () => {
  varianteRAMModal.classList.remove("visible");
});

varianteRAMForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movil_id = movilIdInput.value;
  const ram_id = ramIdInput.value;

  const body = JSON.stringify({ movil_id, ram_id });
  const url = "/api/specs/variantes_ram";
  const method = "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Error al guardar la variante.", "#e74c3c", "alert-circle");
      return;
    }

    showToast("Variante RAM agregada.", "#27ae60", "check-circle");
    varianteRAMModal.classList.remove("visible");
    fetchVariantesRAM();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editVarianteRAM = function(movil_id, ram_id) {
};

window.deleteVarianteRAM = async function(movil_id, ram_id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante RAM?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/variantes_ram?movil_id=${movil_id}&ram_id=${ram_id}`, { 
      method: "DELETE" 
    });
    if (!res.ok) throw new Error();
    await fetchVariantesRAM();
    showToast("Variante RAM eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la variante.", "#e74c3c", "alert-circle");
  }
};

async function fetchVariantesRAM() {
  try {
    const res = await fetch("/api/specs/variantes_ram");
    variantesRAM = await res.json();
    renderVariantesRAM();
  } catch (err) {
    showToast("Error al cargar las variantes RAM.", "#e74c3c", "alert-circle");
  }
}

async function fetchRAMsDisponibles() {
  try {
    const res = await fetch("/api/specs/variantes_ram");
    ramsDisponibles = await res.json();
    ramIdInput.innerHTML = ramsDisponibles.map(r => 
      `<option value="${r.id}">${r.capacidad} ${r.tipo}</option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar RAMs disponibles.", "#e74c3c", "alert-circle");
  }
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/moviles");
    movilesDisponibles = await res.json();
    movilIdInput.innerHTML = movilesDisponibles.map(m => 
      `<option value="${m.id}">${m.nombre}</option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar móviles disponibles.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchVariantesRAM();
});