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
const modalVarianteAlmTitle = document.getElementById("modalVarianteAlmTitle");
const cancelVarianteAlmModalBtn = document.getElementById("cancelVarianteAlmModalBtn");
const addVarianteAlmBtn = document.getElementById("addVarianteAlmBtn");
const variantesAlmTableBody = document.getElementById("variantesAlmTableBody");
const searchVariantesAlmInput = document.getElementById("searchVariantesAlmInput");
const movilIdAlmInput = document.getElementById("movilIdAlmInput");
const almacenamientoIdInput = document.getElementById("almacenamientoIdInput");
const movilesAlmSuggestions = document.getElementById("movilesAlmList");
const almacenamientosAlmSuggestions = document.getElementById("almacenamientosAlmList");

const varianteAlmErrorFields = ["movil_id", "almacenamiento_id"];

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
  clearError(varianteAlmErrorFields, "#varianteAlmForm");
});

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

function setupAlmAutocomplete() {
  setupAutocomplete({
    inputEl: movilIdAlmInput,
    suggestionsEl: movilesAlmSuggestions,
    dataArray: movilesDisponibles.map(m => m.nombre),
    onSelect: () => {}
  });

  setupAutocomplete({
    inputEl: almacenamientoIdInput,
    suggestionsEl: almacenamientosAlmSuggestions,
    dataArray: almacenamientosDisponibles.map(a => `${a.capacidad} ${a.tipo}`),
    onSelect: () => {}
  });
}

async function fetchAlmacenamientosDisponibles() {
  try {
    const res = await fetch("/api/specs/almacenamiento"); 
    almacenamientosDisponibles = await res.json();
    setupAlmAutocomplete();
  } catch (err) {
    showToast("Error al cargar almacenamientos disponibles.", "#e74c3c", "alert-circle");
  }
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/specs/moviles");
    movilesDisponibles = await res.json();
    setupAlmAutocomplete();
  } catch (err) {
    showToast("Error al cargar móviles disponibles.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("click", (e) => {
  if (!movilIdAlmInput.contains(e.target)) {
    movilesAlmSuggestions.innerHTML = "";
  }
  if (!almacenamientoIdInput.contains(e.target)) {
    almacenamientosAlmSuggestions.innerHTML = "";
  }
});

varianteAlmForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(varianteAlmErrorFields, "#varianteAlmForm");

  const movilNombre = movilIdAlmInput.value.trim();
  const almTexto = almacenamientoIdInput.value.trim();

  const movil = movilesDisponibles.find(m => m.nombre.trim().toLowerCase() === movilNombre.toLowerCase());
  const alm = almacenamientosDisponibles.find(a => (`${a.capacidad} ${a.tipo}`).trim().toLowerCase() === almTexto.toLowerCase());

  if (!movil || !alm) {
    showToast("Debes seleccionar un móvil y un almacenamiento válidos.", "#e74c3c", "alert-circle");
    return;
  }

  const originalMovilId = varianteAlmForm.getAttribute("data-original-movil");
  const originalAlmacenamientoId = varianteAlmForm.getAttribute("data-original-almacenamiento");
  const isEditing = originalMovilId && originalAlmacenamientoId;

  const requestData = { movil_id: movil.id, almacenamiento_id: alm.id };

  if (isEditing) {
    requestData.nuevo_movil_id = movil.id;
    requestData.nuevo_almacenamiento_id = alm.id;
  }

  try {
    const res = await fetch(isEditing
      ? `/api/specs/variantes_almacenamiento/${originalMovilId}/${originalAlmacenamientoId}`
      : "/api/specs/variantes_almacenamiento", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#varianteAlmForm");
      } else {
        showToast(data.error || "Error al guardar la variante.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(isEditing ? "Variante de almacenamiento actualizada." : "Variante de almacenamiento agregada.",
      "#27ae60", "check-circle");

    varianteAlmModal.classList.remove("visible");
    varianteAlmForm.removeAttribute("data-original-movil");
    varianteAlmForm.removeAttribute("data-original-almacenamiento");

    await fetchVariantesAlm();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editVarianteAlm = async function(movil_id, almacenamiento_id) {
  await fetchAlmacenamientosDisponibles();
  await fetchMovilesDisponibles();

  const movil = movilesDisponibles.find(m => m.id == movil_id);
  const alm = almacenamientosDisponibles.find(a => a.id == almacenamiento_id);

  if (!movil || !alm) {
    showToast("No se encontró el móvil o el almacenamiento.", "#e74c3c", "alert-circle");
    return;
  }

  modalVarianteAlmTitle.textContent = "Editar Variante de Almacenamiento";
  document.getElementById("movilIdAlmInput").value = movil.nombre;  
  document.getElementById("almacenamientoIdInput").value = `${alm.capacidad} ${alm.tipo}`;

  varianteAlmForm.setAttribute("data-original-movil", movil_id);
  varianteAlmForm.setAttribute("data-original-almacenamiento", almacenamiento_id);

  varianteAlmModal.classList.add("visible");
};

window.deleteVarianteAlm = async function(movil_id, almacenamiento_id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante de Almacenamiento?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
   const res = await fetch(`/api/specs/variantes_almacenamiento/${movil_id}/${almacenamiento_id}`, { 
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
    variantesAlmFiltradas = [];
    renderVariantesAlm();
  } catch (err) {
    showToast("Error al cargar las variantes de almacenamiento.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovilesDisponibles();
  await fetchAlmacenamientosDisponibles();
  await fetchVariantesAlm();
  setupAlmAutocomplete();
});