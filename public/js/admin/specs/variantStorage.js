import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from '../showValidation.js';

let variantesAlm = [];
let variantesAlmFiltradas = [];
let almacenamientosDisponibles = [];
let movilesDisponibles = [];

const varianteAlmModal = document.getElementById("varianteAlmModal");
const varianteAlmForm = document.getElementById("varianteAlmForm");
const modalVarianteAlmTitle = document.getElementById("modalVarianteAlmTitle");
const cancelVarianteAlmModalBtn = document.getElementById("cancelVarianteAlmModalBtn");
const addVarianteAlmBtn = document.getElementById("addVarianteAlmBtn");
const variantesAlmTableBody = document.getElementById("variantesAlmTableBody");
const searchVariantesAlmInput = document.getElementById("searchVariantesAlmInput");
const movilIdAlmInput = document.getElementById("movilIdAlmInput");
const almacenamientoIdInput = document.getElementById("almacenamientoIdInput");
const movilesAlmSuggestions = document.getElementById("movilesAlmList");
const almacenamientosAlmSuggestions = document.getElementById("almacenamientosAlmList");

function renderVariantesAlm() {
  variantesAlmTableBody.innerHTML = "";

  const lista = variantesAlmFiltradas.length > 0 ? variantesAlmFiltradas : variantesAlm;

  lista.forEach(v => {
    const movil = movilesDisponibles.find(m => m.movil_id === v.movil_id) || {};
    const alm = almacenamientosDisponibles.find(a => a.id === v.almacenamiento_id) || {};
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movil.nombre_movil || v.nombre_movil || 'Vacío'}</td>
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
    const movil = movilesDisponibles.find(m => m.movil_id === v.movil_id) || {};
    const alm = almacenamientosDisponibles.find(a => a.id === v.almacenamiento_id) || {};
    return (
      (movil.nombre_movil && movil.nombre_movil.toLowerCase().includes(query)) ||
      (alm.capacidad && alm.capacidad.toLowerCase().includes(query)) ||
      (alm.tipo && alm.tipo.toLowerCase().includes(query))
    );
  }) : [];
  renderVariantesAlm();
});

function setupAutocomplete({ inputEl, suggestionsEl, dataArray, getTexto, onSelect = null }) {
  if (!Array.isArray(dataArray)) {
    console.error(`Datos no válidos para autocompletado en ${inputEl.id}`);
    return;
  }

  inputEl.addEventListener("input", () => {
    const query = inputEl.value.toLowerCase();
    suggestionsEl.innerHTML = "";

    if (query.length === 0) return;

    const resultados = dataArray.filter(val => {
      const texto = getTexto(val);
      return texto.toLowerCase().includes(query);
    });

    if (resultados.length === 0) {
      const noResults = document.createElement("div");
      noResults.textContent = "No hay coincidencias";
      noResults.className = "no-results";
      suggestionsEl.appendChild(noResults);
      return;
    }

    resultados.forEach(item => {
      const texto = getTexto(item);
      const div = document.createElement("div");
      div.textContent = texto;
      div.addEventListener("click", () => {
        inputEl.value = texto;
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
    dataArray: movilesDisponibles,
    getTexto: item => item.nombre_movil || "",
    onSelect: (item) => {
      movilIdAlmInput.dataset.id = item.movil_id;
    }
  });

  setupAutocomplete({
    inputEl: almacenamientoIdInput,
    suggestionsEl: almacenamientosAlmSuggestions,
    dataArray: almacenamientosDisponibles,
    getTexto: item => `${item.capacidad} ${item.tipo}`,
    onSelect: (item) => {
      almacenamientoIdInput.dataset.id = item.id;
    }
  });
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/specs/todos-productos");
    const productos = await res.json();

    movilesDisponibles = productos
      .filter(p => p.movil_id && p.nombre)
      .map(p => ({
        movil_id: p.movil_id,
        nombre_movil: p.nombre
      }));

    setupAlmAutocomplete();
  } catch (err) {
    console.error(err);
    showToast("Error al cargar móviles disponibles.", "#e74c3c", "alert-circle");
  }
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

varianteAlmForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movilId = parseInt(movilIdAlmInput.dataset.id);
  const almacenamientoId = parseInt(almacenamientoIdInput.dataset.id);

  if (!movilId || !almacenamientoId) {
    showToast("Debes seleccionar un móvil y un almacenamiento válidos.", "#e74c3c", "alert-circle");
    return;
  }

  const originalMovilId = varianteAlmForm.getAttribute("data-original-movil");
  const originalAlmacenamientoId = varianteAlmForm.getAttribute("data-original-almacenamiento");
  const isEditing = originalMovilId && originalAlmacenamientoId;

  const body = isEditing
    ? JSON.stringify({ nuevo_movil_id: movilId, nuevo_almacenamiento_id: almacenamientoId })
    : JSON.stringify({ movil_id: movilId, almacenamiento_id: almacenamientoId });

  const url = isEditing
    ? `/api/specs/variantes_almacenamiento/${originalMovilId}/${originalAlmacenamientoId}`
    : "/api/specs/variantes_almacenamiento";

  const method = isEditing ? "PUT" : "POST";

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

    showToast(isEditing ? "Variante de almacenamiento actualizada." : "Variante de almacenamiento agregada.", "#27ae60", "check-circle");

    varianteAlmModal.classList.remove("visible");
    varianteAlmForm.removeAttribute("data-original-movil");
    varianteAlmForm.removeAttribute("data-original-almacenamiento");
    fetchVariantesAlm();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editVarianteAlm = async function(movil_id, almacenamiento_id) {
  await fetchMovilesDisponibles();
  await fetchAlmacenamientosDisponibles();

  const movil = movilesDisponibles.find(m => m.movil_id === movil_id);
  const alm = almacenamientosDisponibles.find(a => a.id === almacenamiento_id);

  if (!movil || !alm) {
    showToast("No se encontró el móvil o el almacenamiento.", "#e74c3c", "alert-circle");
    return;
  }

  modalVarianteAlmTitle.textContent = "Editar Variante de Almacenamiento";
  movilIdAlmInput.dataset.id = movil.movil_id;
  almacenamientoIdInput.dataset.id = alm.id;
  movilIdAlmInput.value = movil.nombre_movil;
  almacenamientoIdInput.value = `${alm.capacidad} ${alm.tipo}`;

  varianteAlmForm.setAttribute("data-original-movil", movil_id);
  varianteAlmForm.setAttribute("data-original-almacenamiento", almacenamiento_id);

  varianteAlmModal.classList.add("visible");
};

addVarianteAlmBtn.addEventListener("click", async () => {
  modalVarianteAlmTitle.textContent = "Añadir Nueva Variante de Almacenamiento";
  varianteAlmForm.reset();
  movilIdAlmInput.value = "";
  almacenamientoIdInput.value = "";
  delete movilIdAlmInput.dataset.id;
  delete almacenamientoIdInput.dataset.id;
  varianteAlmForm.removeAttribute("data-original-movil");
  varianteAlmForm.removeAttribute("data-original-almacenamiento");

  await fetchMovilesDisponibles();
  await fetchAlmacenamientosDisponibles();

  varianteAlmModal.classList.add("visible");
});

cancelVarianteAlmModalBtn.addEventListener("click", () => {
  varianteAlmModal.classList.remove("visible");
});

window.deleteVarianteAlm = async function(movil_id, almacenamiento_id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante de Almacenamiento?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/variantes_almacenamiento/${movil_id}/${almacenamiento_id}`, {
      method: "DELETE",
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

document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovilesDisponibles();
  await fetchAlmacenamientosDisponibles();
  await fetchVariantesAlm();
  setupAlmAutocomplete();
  renderVariantesAlm();
});