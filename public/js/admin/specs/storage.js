import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let almacenamientos = [];
let almacenamientosFiltrados = [];

const almacenamientoModal = document.getElementById("almacenamientoModal");
const almacenamientoForm = document.getElementById("almacenamientoForm");
const almacenamientoIdInput = document.getElementById("almacenamientoId");
const almacenamientoCapacidadInput = document.getElementById("almacenamientoCapacidad");
const almacenamientoTipoInput = document.getElementById("almacenamientoTipo");
const modalAlmacenamientoTitle = document.getElementById("modalAlmacenamientoTitle");
const cancelAlmacenamientoModalBtn = document.getElementById("cancelAlmacenamientoModalBtn");
const addAlmacenamientoBtn = document.getElementById("addAlmacenamientoBtn");
const almacenamientoTableBody = document.getElementById("almacenamientoTableBody");
const searchAlmacenamientoInput = document.getElementById("searchAlmacenamientoInput");

const almacenamientoErrorFields = ["capacidad", "tipo"];

function renderAlmacenamientos() {
  almacenamientoTableBody.innerHTML = "";

  const lista = almacenamientosFiltrados.length > 0 ? almacenamientosFiltrados : almacenamientos;

  lista.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.id}</td>
      <td>${a.capacidad || '-'}</td>
      <td>${a.tipo || '-'}</td>
      <td>
        <button onclick="editAlmacenamiento(${a.id})" class="edit-button">Editar</button>
        <button onclick="deleteAlmacenamiento(${a.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    almacenamientoTableBody.appendChild(row);
  });
}

searchAlmacenamientoInput.addEventListener("input", () => {
  const query = searchAlmacenamientoInput.value.trim().toLowerCase();
  almacenamientosFiltrados = query ? almacenamientos.filter(a =>
    (a.capacidad && a.capacidad.toLowerCase().includes(query)) ||
    (a.tipo && a.tipo.toLowerCase().includes(query))
  ) : [];
  renderAlmacenamientos();
});

addAlmacenamientoBtn.addEventListener("click", () => {
  modalAlmacenamientoTitle.textContent = "Añadir Nuevo Almacenamiento";
  almacenamientoForm.reset();
  almacenamientoIdInput.value = "";
  almacenamientoModal.classList.add("visible");
});

cancelAlmacenamientoModalBtn.addEventListener("click", () => {
  almacenamientoModal.classList.remove("visible");
  clearError(almacenamientoErrorFields, "#almacenamientoForm");
});

almacenamientoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(almacenamientoErrorFields, "#almacenamientoForm");

  const id = almacenamientoIdInput.value;
  const capacidad = almacenamientoCapacidadInput.value;
  const tipo = almacenamientoTipoInput.value;

  const body = JSON.stringify({ capacidad, tipo });
  const url = id ? `/api/specs/almacenamiento/${id}` : "/api/specs/almacenamiento";
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
        showValidation(data.errors, "#almacenamientoForm");
      } else {
        showToast(data.error || "Error al guardar el almacenamiento.", "error");
      }
      return;
    }

    showToast(id ? "Almacenamiento actualizado." : "Almacenamiento agregado.", "success");
    almacenamientoModal.classList.remove("visible");
    fetchAlmacenamientos();
  } catch (err) {
    showToast("Error inesperado.", "error");
  }
});

window.editAlmacenamiento = function (id) {
  const a = almacenamientos.find(x => x.id === id);
  if (a) {
    modalAlmacenamientoTitle.textContent = "Editar Almacenamiento";
    almacenamientoIdInput.value = a.id;
    almacenamientoCapacidadInput.value = a.capacidad || "";
    almacenamientoTipoInput.value = a.tipo || "";
    almacenamientoModal.classList.add("visible");
  }
};

window.deleteAlmacenamiento = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Almacenamiento?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/almacenamiento/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchAlmacenamientos();
    showToast("Almacenamiento eliminado con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar el almacenamiento.", "error");
  }
};

async function fetchAlmacenamientos() {
  try {
    const res = await fetch("/api/specs/almacenamiento");
    almacenamientos = await res.json();
    renderAlmacenamientos();
  } catch (err) {
    showToast("Error al cargar los almacenamientos.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAlmacenamientos();
});