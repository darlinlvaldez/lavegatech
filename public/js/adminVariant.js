import { showToast } from './toastify.js';
import { showConfirmDialog } from './sweetAlert2.js';
import { showValidation, clearError } from "./showValidation.js";

let variantes = [];

const variantesTableBody = document.getElementById("variantesTableBody");
const addVarianteBtn = document.getElementById("addVarianteBtn");
const varianteModal = document.getElementById("varianteModal");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const varianteForm = document.getElementById("varianteForm");

const varianteIdInput = document.getElementById("varianteId");
const productoSelect = document.getElementById("productoSelect");
const varianteColorInput = document.getElementById("varianteColor");
const varianteStockInput = document.getElementById("varianteStock");
const varianteImgInput = document.getElementById("varianteImg");
const modalTitle = document.getElementById("modalTitle");

const errorFields = ["producto_id", "color", "stock", "img"]

async function fetchVariantes() {
  const res = await fetch("/api/admin/variantes");
  variantes = await res.json();
  renderVariantes();
}

async function fetchProductos() {
  const res = await fetch("/api/admin/productos");
  const productos = await res.json();

  productoSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Seleccione un producto";
  defaultOption.selected = true;
  productoSelect.appendChild(defaultOption);

  productos.forEach(prod => {
    const option = document.createElement("option");
    option.value = prod.id;
    option.textContent = prod.nombre;
    productoSelect.appendChild(option);
  });
}

function renderVariantes() {
  variantesTableBody.innerHTML = "";
  variantes.forEach(vari => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${vari.producto}</td>
      <td>${vari.color}</td>
      <td>${vari.stock}</td>
      <td><img src="${vari.img || ''}" alt="Img" width="40" height="40"></td>
      <td>
        <button onclick="editVariante(${vari.id})" class="edit-button">Editar</button>
        <button onclick="deleteVariante(${vari.id})" class="delete-button">Eliminar</button>
      </td>
    `;

    variantesTableBody.appendChild(row);
  });
}

addVarianteBtn.addEventListener("click", () => {
  modalTitle.textContent = "Nueva Variante";
  varianteForm.reset();
  varianteIdInput.value = "";
  varianteModal.classList.add("visible");
});

cancelModalBtn.addEventListener("click", () => {
  varianteModal.classList.remove("visible");
  clearError(errorFields, "#varianteForm");
});

varianteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(errorFields, "#varianteForm");

  const id = varianteIdInput.value;
  const producto_id = parseInt(productoSelect.value);
  const color = varianteColorInput.value;
  const stock = parseInt(varianteStockInput.value);
  const img = varianteImgInput.value;

  const body = JSON.stringify({ producto_id, color, stock, img });

  const url = id ? `/api/admin/variantes/${id}` : "/api/admin/variantes";
  const method = id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#varianteForm");
      } else {
        showToast(data.error || "Error al guardar la variante.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Variante actualizada con éxito." : "Variante agregada con éxito.", "#27ae60", "check-circle");
    varianteModal.classList.remove("visible");
    fetchVariantes();

  } catch (err) {
    showToast("Error inesperado al guardar la variante.", "#e74c3c", "alert-circle");
  }
});

window.editVariante = function (id) {
  const variante = variantes.find(v => v.id === id);
  if (!variante) return;

  modalTitle.textContent = "Editar Variante";
  varianteIdInput.value = variante.id;
  productoSelect.value = variante.producto_id || ""; 
  varianteColorInput.value = variante.color;
  varianteStockInput.value = variante.stock;
  varianteImgInput.value = variante.img || "";

  varianteModal.classList.add("visible");
}

window.deleteVariante = async function(id) {
  const confirmed = await showConfirmDialog({
    title: "¿Eliminar Categoría?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/variantes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

    await fetchVariantes();
    showToast("Variante eliminada con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast("Error al eliminar la variante.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProductos();
  fetchVariantes();
});