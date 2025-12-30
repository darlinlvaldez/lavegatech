import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

const variantsTableBody = document.getElementById("variantsTableBody");
const addVariantBtn = document.getElementById("addVariantBtn");
const variantModal = document.getElementById("variantModal");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const variantForm = document.getElementById("variantForm");

const variantIdInput = document.getElementById("variantId");
const variantColorInput = document.getElementById("variantColor");
const variantStockInput = document.getElementById("variantStock");
const variantImgInput = document.getElementById("variantImg");
const modalTitle = document.getElementById("modalTitle");
const variantImgFileInput = document.getElementById("variantImgFile");

let variants = [];
let filteredVariants = [];

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

  const resultados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(query)
  );

  resultados.slice(0, 10).forEach((p) => {
    const div = document.createElement("div");
    div.textContent = `${p.nombre} ${p.especificaciones || ""}`;
    
    div.addEventListener("click", () => {
      productoInput.value = `${p.nombre} ${p.especificaciones || ""} `;
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

const errorFields = ["producto_id", "color", "stock", "img"]

async function fetchVariantes() {
  const res = await fetch("/api/admin/variantes");
  variants = await res.json();
  filteredVariants = [];
  renderVariants();
}

function renderVariants() {
  variantsTableBody.innerHTML = "";

  (filteredvariants.length ? filteredvariants : varia).forEach((cat) => {
    const row = document.createElement("tr");

    const stateText = cat.activo ? "Activo" : "Inactivo";
    const stateClass = cat.activo ? "active-state" : "inactive-state";

    row.innerHTML = `
      <td>${vari.id}</td>
      <td>${vari.producto} ${vari.especificaciones || ""}</td>
      <td>${vari.color}</td>
      <td>${vari.stock}</td>
      <td><img src="${vari.img || ''}" alt="Img" width="40" height="40"></td>
      <td>
        <button class="estado-btn ${stateClass}" onclick="changeStatus('categorias', ${cat.id}, 
        ${cat.activo})"> ${stateText}
        </button>
      </td>
      <td>
        <button onclick="editVariante(${vari.id})" class="edit-button">Editar</button>
        <button onclick="deleteVariante(${vari.id})" class="delete-button">Eliminar</button>
      </td>
    `;

    variantsTableBody.appendChild(row);
  });
}

const searchVarianteInput = document.getElementById("searchVarianteInput");

searchVarianteInput.addEventListener("input", () => {
  const query = searchVarianteInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredVariants = [];
  } else {
    filteredVariants = variants.filter(v =>
      v.producto?.toLowerCase().includes(query) ||
      v.color?.toLowerCase().includes(query) ||
      String(v.stock).includes(query)
    );
  }

  renderVariantes();
});

addVariantBtn.addEventListener("click", () => {
  modalTitle.textContent = "Nueva Variante";
  variantForm.reset();
  variantIdInput.value = "";
  productoInput.value = "";
  productoIdSeleccionado = null;

  variantImgInput.value = "";
  variantImgFileInput.value = "";

  toggleImageInputs();

  variantModal.classList.add("visible");
});

cancelModalBtn.addEventListener("click", () => {
  variantModal.classList.remove("visible");
  clearError(errorFields, "#variantForm");
});

variantForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError(errorFields, "#variantForm");

  const id = variantIdInput.value;
  if (!productoIdSeleccionado) {
    showValidation([{ path: "producto_id", message: "Debe seleccionar un producto válido" }], "#variantForm");
    return;
  }

  const producto_id = productoIdSeleccionado;
  const color = variantColorInput.value;
  const stock = parseInt(variantStockInput.value);

  let imgPath = variantImgInput.value.trim();

  if (variantImgFileInput.files.length > 0) {
    const file = variantImgFileInput.files[0];
    const formData = new FormData();
    formData.append("img", file);

    try {
      const uploadRes = await fetch("/api/admin/variantes/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        showToast(uploadData.error || "Error al subir la imagen.", "#e74c3c", "alert-circle");
        return;
      }

      imgPath = uploadData.path;

    } catch {
      showToast("Error inesperado al subir la imagen.", "#e74c3c", "alert-circle");
      return;
    }
  }

  if (!imgPath) {
    showValidation([{ path: "img", message: "Debe proporcionar una imagen o URL" }], "#variantForm");
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
      showToast(data.error || "Error al guardar la variante.", "#e74c3c", "alert-circle");
      return;
    }

    showToast(id ? "Variante actualizada con éxito." : "Variante agregada con éxito.", "#27ae60", "check-circle");
    variantModal.classList.remove("visible");
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
  variantIdInput.value = variante.id;
  variantColorInput.value = variante.color;
  variantStockInput.value = variante.stock;

  variantImgInput.value = variante.img || "";
  variantImgFileInput.value = "";

  toggleImageInputs();

  variantModal.classList.add("visible");
};

clearImgFileBtn.addEventListener("click", () => {
  variantImgFileInput.value = "";
  toggleImageInputs();
});

function toggleImageInputs() {
  const hasUrl = variantImgInput.value.trim();
  const hasFile = variantImgFileInput.files.length > 0;

  variantImgInput.disabled = hasFile;
  variantImgFileInput.disabled = hasUrl;
}

variantImgInput.addEventListener("input", toggleImageInputs);
variantImgFileInput.addEventListener("change", toggleImageInputs);

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