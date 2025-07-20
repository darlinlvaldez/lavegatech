// adminDevices.js

import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';

let dispositivos = [];
let filtrarDispositivos = [];

const searchDeviceInput = document.getElementById("searchDeviceInput");
const devicesTableBody = document.getElementById("devicesTableBody");
const addDeviceBtn = document.getElementById("addDeviceBtn");

async function fetchDispositivos() {
  try {
    const res = await fetch("/api/admin/dispositivos");
    dispositivos = await res.json();
    filtrarDispositivos = [];
    renderDispositivos();
  } catch (err) {
    showToast("Error al cargar los dispositivos.", "#e74c3c", "alert-circle");
  }
}

function renderDispositivos() {
  devicesTableBody.innerHTML = "";

  const lista = filtrarDispositivos.length > 0 ? filtrarDispositivos : dispositivos;

  lista.forEach((d) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${d.nombre}</td>
      <td>${d.ram || '-'}</td>
      <td>${d.cpu || '-'}</td>
      <td>${d.almacenamiento || '-'}</td>
      <td>
        <button onclick="editDispositivo(${d.id})" class="edit-button">Editar</button>
        <button onclick="deleteDispositivo(${d.id})" class="delete-button">Eliminar</button>
      </td>
    `;

    devicesTableBody.appendChild(row);
  });
}

searchDeviceInput.addEventListener("input", () => {
  const query = searchDeviceInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filtrarDispositivos = [];
  } else {
    filtrarDispositivos = dispositivos.filter((d) =>
      d.nombre.toLowerCase().includes(query)
    );
  }

  renderDispositivos();
});

window.editDispositivo = function (id) {
  window.location.href = `/admin/dispositivos/editar/${id}`;
};

window.deleteDispositivo = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Dispositivo?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/dispositivos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

    await fetchDispositivos();
    showToast("Dispositivo eliminado con éxito.", "#27ae60", "check-circle");
  } catch (err) {
    showToast("Error al eliminar el dispositivo.", "#e74c3c", "alert-circle");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchDispositivos();
});