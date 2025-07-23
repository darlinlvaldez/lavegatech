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

  const movilNombre = document.getElementById("movilIdAlmInput").value.trim();
  const almTexto = document.getElementById("almacenamientoIdInput").value.trim();

  const movil = movilesDisponibles.find(m => m.nombre.trim().toLowerCase() === movilNombre.toLowerCase());
  const alm = almacenamientosDisponibles.find(a => (`${a.capacidad} ${a.tipo}`).trim().toLowerCase() === almTexto.toLowerCase());

  if (!movil || !alm) {
    showToast("Debes seleccionar un móvil y un almacenamiento válidos.", "#e74c3c", "alert-circle");
    return;
  }

  const originalMovilId = varianteAlmForm.getAttribute("data-original-movil");
  const originalAlmacenamientoId = varianteAlmForm.getAttribute("data-original-almacenamiento");
  const isEditing = originalMovilId && originalAlmacenamientoId;

  const body = JSON.stringify({
    movil_id: movil.id,
    almacenamiento_id: alm.id
  });

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

    showToast(
      isEditing ? "Variante de almacenamiento actualizada." : "Variante de almacenamiento agregada.",
      "#27ae60",
      "check-circle"
    );

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

async function fetchAlmacenamientosDisponibles() {
  try {
    const res = await fetch("/api/specs/almacenamiento"); 
    almacenamientosDisponibles = await res.json();

    const datalistAlm = document.getElementById("almacenamientosAlmList");
    datalistAlm.innerHTML = almacenamientosDisponibles.map(a => 
      `<option value="${a.capacidad} ${a.tipo}" data-id="${a.id}"></option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar almacenamientos disponibles.", "#e74c3c", "alert-circle");
  }
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/specs/moviles");
    movilesDisponibles = await res.json();

    const datalistMov = document.getElementById("movilesAlmList");
    datalistMov.innerHTML = movilesDisponibles.map(m => 
      `<option value="${m.nombre}" data-id="${m.id}"></option>`
    ).join('');
  } catch (err) {
    showToast("Error al cargar móviles disponibles.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovilesDisponibles();
  await fetchAlmacenamientosDisponibles();
  await fetchVariantesAlm();
});