import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from '../showValidation.js';

let camaras = [];
let camarasFiltradas = [];

const camaraModal = document.getElementById("camaraModal");
const camaraForm = document.getElementById("camaraForm");
const camaraIdInput = document.getElementById("camaraId");
const camaraPrincipalInput = document.getElementById("camaraPrincipal");
const camaraSelfieInput = document.getElementById("camaraSelfie");
const camaraVideoInput = document.getElementById("camaraVideo");
const modalCamaraTitle = document.getElementById("modalCamaraTitle");
const cancelCamaraModalBtn = document.getElementById("cancelCamaraModalBtn");
const addCamaraBtn = document.getElementById("addCamaraBtn");
const camarasTableBody = document.getElementById("camarasTableBody");
const searchCamarasInput = document.getElementById("searchCamarasInput");

const camaraErrorFields = ["principal", "selfie", "video"];

function renderCamaras() {
  camarasTableBody.innerHTML = "";

  const lista = camarasFiltradas.length > 0 ? camarasFiltradas : camaras;

  lista.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.principal || '-'}</td>
      <td>${c.selfie || '-'}</td>
      <td>${c.video || '-'}</td>
      <td>
        <button onclick="editCamara(${c.id})" class="edit-button">Editar</button>
        <button onclick="deleteCamara(${c.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    camarasTableBody.appendChild(row);
  });
}

searchCamarasInput.addEventListener("input", () => {
  const query = searchCamarasInput.value.trim().toLowerCase();
  camarasFiltradas = query ? camaras.filter(c =>
    (c.principal && c.principal.toLowerCase().includes(query)) ||
    (c.selfie && c.selfie.toLowerCase().includes(query)) ||
    (c.video && c.video.toLowerCase().includes(query))
  ) : [];
  renderCamaras();
});

addCamaraBtn.addEventListener("click", () => {
  modalCamaraTitle.textContent = "Añadir Nueva Cámara";
  camaraForm.reset();
  camaraIdInput.value = "";
  camaraModal.classList.add("visible");
});

cancelCamaraModalBtn.addEventListener("click", () => {
  camaraModal.classList.remove("visible");
  clearError(camaraErrorFields, "#camaraForm");
});

camaraForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(camaraErrorFields, "#camaraForm");

  const id = camaraIdInput.value;
  const principal = camaraPrincipalInput.value;
  const selfie = camaraSelfieInput.value;
  const video = camaraVideoInput.value;

  const body = JSON.stringify({ principal, selfie, video });
  const url = id ? `/api/specs/camaras/${id}` : "/api/specs/camaras";
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
        showValidation(data.errors, "#camaraForm");
      } else {
        showToast(data.error || "Error al guardar la cámara.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Cámara actualizada." : "Cámara agregada.", "#27ae60", "check-circle");
    camaraModal.classList.remove("visible");
    fetchCamaras();
  } catch (err) {
    showToast("Error inesperado.", "#e74c3c", "alert-circle");
  }
});

window.editCamara = function (id) {
  const c = camaras.find(x => x.id === id);
  if (c) {
    modalCamaraTitle.textContent = "Editar Cámara";
    camaraIdInput.value = c.id;
    camaraPrincipalInput.value = c.principal || "";
    camaraSelfieInput.value = c.selfie || "";
    camaraVideoInput.value = c.video || "";
    camaraModal.classList.add("visible");
  }
};

window.deleteCamara = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Cámara?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/camaras/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchCamaras();
    showToast("Cámara eliminada con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar la cámara.", "#e74c3c", "alert-circle");
  }
};

async function fetchCamaras() {
  try {
    const res = await fetch("/api/specs/camaras");
    camaras = await res.json();
    renderCamaras();
  } catch (err) {
    showToast("Error al cargar las cámaras.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCamaras();
});