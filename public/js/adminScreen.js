import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from './showValidation.js';

let pantallas = [];
let pantallasFiltradas = [];

const pantallaModal = document.getElementById("pantallaModal");
const pantallaForm = document.getElementById("pantallaForm");
const pantallaIdInput = document.getElementById("pantallaId");
const pantallaTipoInput = document.getElementById("pantallaTipo");
const pantallaResolucionInput = document.getElementById("pantallaResolucion");
const pantallaFrecuenciaInput = document.getElementById("pantallaFrecuencia");
const pantallaProteccionInput = document.getElementById("pantallaProteccion");
const pantallaTamañoInput = document.getElementById("pantallaTamaño");
const modalPantallaTitle = document.getElementById("modalPantallaTitle");
const cancelPantallaModalBtn = document.getElementById("cancelPantallaModalBtn");
const addPantallaBtn = document.getElementById("addPantallaBtn");
const pantallasTableBody = document.getElementById("pantallasTableBody");
const searchPantallasInput = document.getElementById("searchPantallasInput");

const pantallaErrorFields = ["tipo", "resolucion", "tamaño", "frecuencia", "proteccion" ];

function renderPantallas() {
  pantallasTableBody.innerHTML = "";

  const lista = pantallasFiltradas.length > 0 ? pantallasFiltradas : pantallas;

  lista.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.tamaño}</td>
      <td>${p.resolucion}</td>
      <td>${p.tipo}</td>
      <td>${p.frecuencia}</td>
      <td>${p.proteccion}</td>
      <td>
        <button onclick="editPantalla(${p.id})" class="edit-button">Editar</button>
        <button onclick="deletePantalla(${p.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    pantallasTableBody.appendChild(row);
  });
}

searchPantallasInput.addEventListener("input", () => {
  const query = searchPantallasInput.value.trim().toLowerCase();
  pantallasFiltradas = query ? pantallas.filter(p =>
    p.tipo.toLowerCase().includes(query) ||
    p.resolucion.toLowerCase().includes(query) ||
    p.tamaño.toLowerCase().includes(query) ||
    p.frecuencia.toLowerCase().includes(query) ||
    p.proteccion.toLowerCase().includes(query)
  ) : [];
  renderPantallas();
});

addPantallaBtn.addEventListener("click", () => {
  modalPantallaTitle.textContent = "Añadir Nueva Pantalla";
  pantallaForm.reset();
  pantallaIdInput.value = "";
  pantallaModal.classList.add("visible");
});

cancelPantallaModalBtn.addEventListener("click", () => {
  pantallaModal.classList.remove("visible");
  clearError(pantallaErrorFields, "#pantallaForm");
});

pantallaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(pantallaErrorFields, "#pantallaForm");

  const id = pantallaIdInput.value;
  const tipo = pantallaTipoInput.value;
  const resolucion = pantallaResolucionInput.value;
  const tamaño = pantallaTamañoInput.value;
  const frecuencia = pantallaFrecuenciaInput.value;
  const proteccion = pantallaProteccionInput.value;

  const body = JSON.stringify({ tipo, resolucion, tamaño, frecuencia, proteccion });
  const url = id ? `/api/specs/pantalla/${id}` : "/api/specs/pantalla";
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
        showValidation(data.errors, "#pantallaForm");
      } else {
        showToast(data.error || "Error al guardar la pantalla.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Pantalla actualizada." : "Pantalla agregada.", "#27ae60", "check-circle");
    pantallaModal.classList.remove("visible");
    fetchPantallas();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editPantalla = function (id) {
  const p = pantallas.find(x => x.id === id);
  if (p) {
    modalPantallaTitle.textContent = "Editar Pantalla";
    pantallaIdInput.value = p.id;
    pantallaTipoInput.value = p.tipo;
    pantallaResolucionInput.value = p.resolucion;
    pantallaTamañoInput.value = p.tamaño;
    pantallaFrecuenciaInput.value = p.frecuencia;
    pantallaProteccionInput.value = p.proteccion;
    pantallaModal.classList.add("visible");
  }
};

window.deletePantalla = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Pantalla?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/pantalla/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchPantallas();
    showToast("Pantalla eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la pantalla.", "#e74c3c", "alert-circle");
  }
};

async function fetchPantallas() {
  const res = await fetch("/api/specs/pantalla");
  pantallas = await res.json();
  renderPantallas();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPantallas();
});