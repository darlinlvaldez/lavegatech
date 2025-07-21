import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from './showValidation.js';

let variantesAlm = [];
let variantesAlmFiltradas = [];
let almacenamientosDisponibles = [];
let movilesDisponibles = [];

const varianteAlmModal = document.getElementById("varianteAlmModal");
const varianteAlmForm = document.getElementById("varianteAlmForm");
const varianteAlmIdInput = document.getElementById("varianteAlmId");
const movilIdAlmInput = document.getElementById("movilIdAlm");
const almacenamientoIdInput = document.getElementById("almacenamientoId");
const modalVarianteAlmTitle = document.getElementById("modalVarianteAlmTitle");
const cancelVarianteAlmModalBtn = document.getElementById("cancelVarianteAlmModalBtn");
const addVarianteAlmBtn = document.getElementById("addVarianteAlmBtn");
const variantesAlmTableBody = document.getElementById("variantesAlmTableBody");
const searchVariantesAlmInput = document.getElementById("searchVariantesAlmInput");

function renderVariantesAlm() {
  variantesAlmTableBody.innerHTML = "";

  const lista = variantesAlmFiltradas.length > 0 ? variantesAlmFiltradas : variantesAlm;

  lista.forEach(v => {
    const movil = movilesDisponibles.find(m => m.id === v.movil_id) || {};
    const alm = almacenamientosDisponibles.find(a => a.id === v.almacenamiento_id) || {};
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movil.nombre || v.movil_id}</td>
      <td>${alm.capacidad ? `${alm.capacidad} ${alm.tipo}` : v.almacenamiento_id}</td>
      <td>
        <button onclick="editVarianteAlm(${v.movil_id}, ${v.almacenamiento_id})" class="edit-button">Editar</button>
        <button onclick="deleteVarianteAlm(${v.movil_id}, ${v.almacenamiento_id})" class="delete-button">Eliminar</button>
      </td>
    `;
    variantesAlmTableBody.appendChild(row);
  });
}

searchVariantesAlmInput.addEventListener("input", () => {
  const query = searchVariantesAlmInput.value.trim().toLowerCase();
  variantesAlmFiltradas = query ? variantesAlm.filter(v => {
    const movil = movilesDisponibles.find(m => m.id === v.movil_id) || {};
    const alm = almacenamientosDisponibles.find(a => a.id === v.almacenamiento_id) || {};
    return (
      (movil.nombre && movil.nombre.toLowerCase().includes(query)) ||
      (alm.capacidad && alm.capacidad.toLowerCase().includes(query)) ||
      (alm.tipo && alm.tipo.toLowerCase().includes(query))
    );
  }) : [];
  renderVariantesAlm();
});

addVarianteAlmBtn.addEventListener("click", async () => {
  modalVarianteAlmTitle.textContent = "Añadir Nueva Variante de Almacenamiento";
  varianteAlmForm.reset();
  varianteAlmIdInput.value = "";
  
  await fetchAlmacenamientosDisponibles();
  await fetchMovilesDisponibles();
  
  varianteAlmModal.classList.add("visible");
});

cancelVarianteAlmModalBtn.addEventListener("click", () => {
  varianteAlmModal.classList.remove("visible");
});

varianteAlmForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movil_id = movilIdAlmInput.value;
  const almacenamiento_id = almacenamientoIdInput.value;

  const body = JSON.stringify({ movil_id, almacenamiento_id });
  const url = "/api/specs/variantes-alm";
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

    showToast("Variante de almacenamiento agregada.", "#27ae60", "check-circle");
    varianteAlmModal.classList.remove("visible");
    fetchVariantesAlm();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editVarianteAlm = function(movil_id, almacenamiento_id) {
};

window.deleteVarianteAlm = async function(movil_id, almacenamiento_id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante de Almacenamiento?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/variantes_almacenamiento?movil_id=${movil_id}&almacenamiento_id=${almacenamiento_id}`, { 
      method: "DELETE" 
    });
    if (!res.ok) throw new Error();
    await fetchVariantesAlm();
    showToast("Variante de almacenamiento eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la variante.", "#e74c3c", "alert-circle");
  }
};

async function fetchVariantesAlm() {
  try {
    const res = await fetch("/api/specs/variantes_almacenamiento");
    variantesAlm = await res.json();
    renderVariantesAlm();
  } catch (err) {
    showToast("Error al cargar las variantes de almacenamiento.", "#e74c3c", "alert-circle");
  }
}

async function fetchAlmacenamientosDisponibles() {
  try {
    const res = await fetch("/api/specs/variantes_almacenamiento");
    almacenamientosDisponibles = await res.json();
    almacenamientoIdInput.innerHTML = almacenamientosDisponibles.map(a => 
      `<option value="${a.id}">${a.capacidad} ${a.tipo}</option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar almacenamientos disponibles.", "#e74c3c", "alert-circle");
  }
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/moviles");
    movilesDisponibles = await res.json();
    movilIdAlmInput.innerHTML = movilesDisponibles.map(m => 
      `<option value="${m.id}">${m.nombre}</option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar móviles disponibles.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchVariantesAlm();
});