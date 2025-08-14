import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from "../showValidation.js";

let variantes = [];
let filteredVariantes = [];

let productos = [];
let productoIdSeleccionado = null;

async function fetchProductos() {
  const res = await fetch("/api/admin/productos");
  productos = await res.json();
}

const productoInput = document.getElementById("productoInput");
const sugerenciasProducto = document.getElementById("sugerenciasProducto");

productoInput.addEventListener("input", () => {
  const query = productoInput.value.toLowerCase();
  sugerenciasProducto.innerHTML = "";

  if (query.length === 0) {
    productoIdSeleccionado = null;
    return;
  }

  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(query)
  );

  resultados.slice(0, 10).forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.nombre;
    div.addEventListener("click", () => {
      productoInput.value = p.nombre;
      productoIdSeleccionado = p.id;
      sugerenciasProducto.innerHTML = "";
    });
    sugerenciasProducto.appendChild(div);
  });
});

document.addEventListener("click", (e) => {
  if (!productoInput.contains(e.target) && !sugerenciasProducto.contains(e.target)) {
    sugerenciasProducto.innerHTML = "";
  }
});

const variantesTableBody = document.getElementById("variantesTableBody");
const addVarianteBtn = document.getElementById("addVarianteBtn");
const varianteModal = document.getElementById("varianteModal");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const varianteForm = document.getElementById("varianteForm");

const varianteIdInput = document.getElementById("varianteId");
const varianteColorInput = document.getElementById("varianteColor");
const varianteStockInput = document.getElementById("varianteStock");
const varianteImgInput = document.getElementById("varianteImg");
const modalTitle = document.getElementById("modalTitle");
const varianteImgFileInput = document.getElementById("varianteImgFile");

const errorFields = ["producto_id", "color", "stock", "img"]

async function fetchVariantes() {
  const res = await fetch("/api/admin/variantes");
  variantes = await res.json();
  filteredVariantes = [];
  renderVariantes();
}

function renderVariantes() {
  variantesTableBody.innerHTML = "";

  const lista = filteredVariantes.length > 0 ? filteredVariantes : variantes;

  lista.forEach(vari => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${vari.id}</td>
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

const searchVarianteInput = document.getElementById("searchVarianteInput");

searchVarianteInput.addEventListener("input", () => {
  const query = searchVarianteInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredVariantes = [];
  } else {
    filteredVariantes = variantes.filter(v =>
      v.producto?.toLowerCase().includes(query) ||
      v.color?.toLowerCase().includes(query) ||
      String(v.stock).includes(query)
    );
  }

  renderVariantes();
});

addVarianteBtn.addEventListener("click", () => {
  modalTitle.textContent = "Nueva Variante";
  varianteForm.reset();
  varianteIdInput.value = "";
  productoInput.value = "";
  productoIdSeleccionado = null;

  varianteImgInput.value = "";
  varianteImgFileInput.value = "";

  toggleImageInputs();

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
  if (!productoIdSeleccionado) {
  showValidation([{ path: "producto_id", message: "Debe seleccionar un producto válido" }], "#varianteForm");
  return;
}

const producto_id = productoIdSeleccionado;

  const color = varianteColorInput.value;
  const stock = parseInt(varianteStockInput.value);

  let imgPath = varianteImgInput.value.trim();

  if (varianteImgFileInput.files.length > 0) {
    const file = varianteImgFileInput.files[0];
    const formData = new FormData();
    formData.append("img", file);

    try {
      const uploadRes = await fetch("/api/admin/variantes/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        showToast("Error al subir la imagen.", "#e74c3c", "alert-circle");
        return;
      }

      const uploadData = await uploadRes.json();
      imgPath = uploadData.path;
    } catch {
      showToast("Error inesperado al subir la imagen.", "#e74c3c", "alert-circle");
      return;
    }
  }

  if (!imgPath) {
    showValidation([{ path: "img", message: "Debe proporcionar una imagen o URL" }], "#varianteForm");
    return;
  }

  const body = JSON.stringify({ producto_id, color, stock, img: imgPath });
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

  const producto = productos.find(p => p.id === variante.producto_id);
  productoInput.value = producto ? producto.nombre : "";
  productoIdSeleccionado = producto ? producto.id : null;

  modalTitle.textContent = "Editar Variante";
  varianteIdInput.value = variante.id;
  varianteColorInput.value = variante.color;
  varianteStockInput.value = variante.stock;

  varianteImgInput.value = variante.img || "";
  varianteImgFileInput.value = "";

  toggleImageInputs();

  varianteModal.classList.add("visible");
};

clearImgFileBtn.addEventListener("click", () => {
  varianteImgFileInput.value = "";
  toggleImageInputs();
});

function toggleImageInputs() {
  const hasUrl = varianteImgInput.value.trim();
  const hasFile = varianteImgFileInput.files.length > 0;

  varianteImgInput.disabled = hasFile;
  varianteImgFileInput.disabled = hasUrl;
}

varianteImgInput.addEventListener("input", toggleImageInputs);
varianteImgFileInput.addEventListener("change", toggleImageInputs);


window.deleteVariante = async function(id) {
  const confirmed = await sweetAlert({
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