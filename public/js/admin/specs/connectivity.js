import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let conectividades = [];
let conectividadesFiltradas = [];

const conectividadModal = document.getElementById("conectividadModal");
const conectividadForm = document.getElementById("conectividadForm");
const conectividadIdInput = document.getElementById("conectividadId");
const conectividadRedInput = document.getElementById("conectividadRed");
const conectividadWifiInput = document.getElementById("conectividadWifi");
const conectividadBluetoothInput = document.getElementById("conectividadBluetooth");
const conectividadNfcInput = document.getElementById("conectividadNfc");
const modalConectividadTitle = document.getElementById("modalConectividadTitle");
const cancelConectividadModalBtn = document.getElementById("cancelConectividadModalBtn");
const addConectividadBtn = document.getElementById("addConectividadBtn");
const conectividadTableBody = document.getElementById("conectividadTableBody");
const searchConectividadInput = document.getElementById("searchConectividadInput");

const conectividadErrorFields = ["red", "wifi", "bluetooth"];

function renderConectividades() {
  conectividadTableBody.innerHTML = "";

  const lista = conectividadesFiltradas.length > 0 ? conectividadesFiltradas : conectividades;

  lista.forEach(c => {
    const nfcText = c.nfc ? "Sí" : "No";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.red || '-'}</td>
      <td>${c.wifi || '-'}</td>
      <td>${c.bluetooth || '-'}</td>
      <td>${nfcText}</td>
      <td>
        <button onclick="editConectividad(${c.id})" class="edit-button">Editar</button>
        <button onclick="deleteConectividad(${c.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    conectividadTableBody.appendChild(row);
  });
}

searchConectividadInput.addEventListener("input", () => {
  const query = searchConectividadInput.value.trim().toLowerCase();
  conectividadesFiltradas = query ? conectividades.filter(c =>
    (c.red && c.red.toLowerCase().includes(query)) ||
    (c.wifi && c.wifi.toLowerCase().includes(query)) ||
    (c.bluetooth && c.bluetooth.toLowerCase().includes(query)) ||
    (c.nfc !== null && (c.nfc ? "sí" : "no").includes(query))
  ) : [];
  renderConectividades();
});

addConectividadBtn.addEventListener("click", () => {
  modalConectividadTitle.textContent = "Añadir Nueva Conectividad";
  conectividadForm.reset();
  conectividadIdInput.value = "";
  conectividadNfcInput.checked = false;
  conectividadModal.classList.add("visible");
});

cancelConectividadModalBtn.addEventListener("click", () => {
  conectividadModal.classList.remove("visible");
  clearError(conectividadErrorFields, "#conectividadForm");
});

conectividadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(conectividadErrorFields, "#conectividadForm");

  const id = conectividadIdInput.value;
  const red = conectividadRedInput.value.trim();
  const wifi = conectividadWifiInput.value.trim();
  const bluetooth = conectividadBluetoothInput.value.trim();
  const nfc = conectividadNfcInput.checked;

  const body = JSON.stringify({ red, wifi, bluetooth, nfc });
  const url = id ? `/api/specs/conectividades/${id}` : "/api/specs/conectividades";
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
        showValidation(data.errors, "#conectividadForm");
      } else {
        showToast(data.error || "Error al guardar la conectividad.", "error");
      }
      return;
    }

    showToast(id ? "Conectividad actualizada." : "Conectividad agregada.", "success");
    conectividadModal.classList.remove("visible");
    fetchConectividades();
  } catch (err) {
    showToast("Error inesperado.", "error");
  }
});

window.editConectividad = function (id) {
  const c = conectividades.find(x => x.id === id);
  if (c) {
    modalConectividadTitle.textContent = "Editar Conectividad";
    conectividadIdInput.value = c.id;
    conectividadRedInput.value = c.red || "";
    conectividadWifiInput.value = c.wifi || "";
    conectividadBluetoothInput.value = c.bluetooth || "";
    conectividadNfcInput.checked = c.nfc ? true : false;
    conectividadModal.classList.add("visible");
  }
};

window.deleteConectividad = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Conectividad?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/conectividades/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    await fetchConectividades();
    showToast("Conectividad eliminada con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar la conectividad.", "error");
  }
};

async function fetchConectividades() {
  try {
    const res = await fetch("/api/specs/conectividades");
    conectividades = await res.json();
    renderConectividades();
  } catch (err) {
    showToast("Error al cargar la conectividad.", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchConectividades();
});