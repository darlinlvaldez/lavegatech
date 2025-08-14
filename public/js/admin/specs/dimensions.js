import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from '../showValidation.js';

let dimensiones = [];
let dimensionesFiltradas = [];

const dimensionesModal = document.getElementById("dimensionesModal");
const dimensionesForm = document.getElementById("dimensionesForm");
const dimensionesIdInput = document.getElementById("dimensionesId");
const dimensionesAlturaInput = document.getElementById("dimensionesAltura");
const dimensionesAnchuraInput = document.getElementById("dimensionesAnchura");
const dimensionesGrosorInput = document.getElementById("dimensionesGrosor");
const dimensionesPesoInput = document.getElementById("dimensionesPeso");
const modalDimensionesTitle = document.getElementById("modalDimensionesTitle");
const cancelDimensionesModalBtn = document.getElementById("cancelDimensionesModalBtn");
const addDimensionesBtn = document.getElementById("addDimensionesBtn");
const dimensionesTableBody = document.getElementById("dimensionesTableBody");
const searchDimensionesInput = document.getElementById("searchDimensionesInput");

const dimensionesErrorFields = ["altura", "anchura", "grosor", "peso"];

function renderDimensiones() {
  dimensionesTableBody.innerHTML = "";

  const lista = dimensionesFiltradas.length > 0 ? dimensionesFiltradas : dimensiones;

  lista.forEach(d => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.id}</td>
      <td>${d.altura || '-'}</td>
      <td>${d.anchura || '-'}</td>
      <td>${d.grosor || '-'}</td>
      <td>${d.peso || '-'}</td>
      <td>
        <button onclick="editDimensiones(${d.id})" class="edit-button">Editar</button>
        <button onclick="deleteDimensiones(${d.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    dimensionesTableBody.appendChild(row);
  });
}

searchDimensionesInput.addEventListener("input", () => {
  const query = searchDimensionesInput.value.trim().toLowerCase();
  dimensionesFiltradas = query ? dimensiones.filter(d =>
    (d.altura && d.altura.toLowerCase().includes(query)) ||
    (d.anchura && d.anchura.toLowerCase().includes(query)) ||
    (d.grosor && d.grosor.toLowerCase().includes(query)) ||
    (d.peso && d.peso.toLowerCase().includes(query))
  ) : [];
  renderDimensiones();
});

addDimensionesBtn.addEventListener("click", () => {
  modalDimensionesTitle.textContent = "Añadir Nueva Dimensión";
  dimensionesForm.reset();
  dimensionesIdInput.value = "";
  dimensionesModal.classList.add("visible");
});

cancelDimensionesModalBtn.addEventListener("click", () => {
  dimensionesModal.classList.remove("visible");
  clearError(dimensionesErrorFields, "#dimensionesForm");
});

dimensionesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(dimensionesErrorFields, "#dimensionesForm");

  const id = dimensionesIdInput.value;
  const altura = dimensionesAlturaInput.value.trim();
  const anchura = dimensionesAnchuraInput.value.trim();
  const grosor = dimensionesGrosorInput.value.trim();
  const peso = dimensionesPesoInput.value.trim();

  const body = JSON.stringify({ altura, anchura, grosor, peso });
  const url = id ? `/api/specs/dimensionespeso/${id}` : "/api/specs/dimensionespeso";
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
        showValidation(data.errors, "#dimensionesForm");
      } else {
        showToast(data.error || "Error al guardar la dimensión.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Dimensión actualizada." : "Dimensión agregada.", "#27ae60", "check-circle");
    dimensionesModal.classList.remove("visible");
    fetchDimensiones();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editDimensiones = function (id) {
  const d = dimensiones.find(x => x.id === id);
  if (d) {
    modalDimensionesTitle.textContent = "Editar Dimensión";
    dimensionesIdInput.value = d.id;
    dimensionesAlturaInput.value = d.altura || "";
    dimensionesAnchuraInput.value = d.anchura || "";
    dimensionesGrosorInput.value = d.grosor || "";
    dimensionesPesoInput.value = d.peso || "";
    dimensionesModal.classList.add("visible");
  }
};

window.deleteDimensiones = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Dimensión?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/dimensionespeso/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchDimensiones();
    showToast("Dimensión eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la dimensión.", "#e74c3c", "alert-circle");
  }
};

async function fetchDimensiones() {
  try {
    const res = await fetch("/api/specs/dimensionespeso");
    dimensiones = await res.json();
    renderDimensiones();
  } catch (err) {
    showToast("Error al cargar las dimensiones.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDimensiones();
});