import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';
import { changeEntityStatus} from '../../utils/changeState.js';

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

async function fetchProducts() {
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
    div.textContent = `${p.nombre} ${p.specs || ""}`;
    
    div.addEventListener("click", () => {
      productoInput.value = `${p.nombre} ${p.specs || ""} `;
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

async function fetchVariants() {
  const res = await fetch("/api/admin/variantes");
  variants = await res.json();
  filteredVariants = [];
  renderVariants();
}

function renderVariants() {
  variantsTableBody.innerHTML = "";

  (filteredVariants.length ? filteredVariants : variants).forEach((variants) => {
    const row = document.createElement("tr");

    const stateText = variants.activo ? "Activo" : "Inactivo";
    const stateClass = variants.activo ? "active-state" : "inactive-state";

    const principalText = variants.img_principal ? "Activo" : "Inactivo";
    const principalClass = variants.img_principal ? "active-state" : "inactive-state";
    const disabled = variants.img_principal ? "disabled" : "";

    row.innerHTML = `
      <td>${variants.id}</td>
      <td>${variants.producto} ${variants.specs || ""}</td>
      <td>${variants.color}</td>
      <td>${variants.stock}</td>
      <td><img src="${variants.img || ''}" alt="Img" width="40" height="40"></td>
      <td>
        <label class="switch">
          <input type="checkbox"
            ${variants.img_principal ? "checked" : ""}
            ${variants.img_principal ? "disabled" : ""}
            onclick="changePrincipal(${variants.id}, ${variants.img_principal})">
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <button class="estado-btn ${stateClass}" onclick="changeStatus(${variants.id}, 
        ${variants.activo})"> ${stateText}
        </button>
      </td>
      <td>
        <button onclick="editVariant(${variants.id})" class="edit-button">Editar</button>
        <button onclick="deleteVariant(${variants.id})" class="delete-button">Eliminar</button>
      </td>
    `;

    variantsTableBody.appendChild(row);
  });
}

const searchVariantInput = document.getElementById("searchVariantInput");

searchVariantInput.addEventListener("input", () => {
  const query = searchVariantInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredVariants = [];
  } else {
    filteredVariants = variants.filter(v =>
      v.producto?.toLowerCase().includes(query) ||
      v.color?.toLowerCase().includes(query) ||
      String(v.stock).includes(query)
    );
  }

  renderVariants();
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
        showToast(uploadData.error || "Error al subir la imagen.", "error");
        return;
      }

      imgPath = uploadData.path;

    } catch {
      showToast("Error inesperado al subir la imagen.", "error");
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
      showToast(data.error || "Error al guardar la variante.", "error");
      return;
    }

    showToast(id ? "Variante actualizada con éxito." : "Variante agregada con éxito.", "success");
    variantModal.classList.remove("visible");
    fetchVariants();

  } catch (err) {
    showToast("Error inesperado al guardar la variante.", "error");
  }
});

window.changeStatus = async function (id) {
  const variant = variants.find(c => Number(c.id) === Number(id));
  if (!variant) return;

  changeEntityStatus({
    endpoint: "/api/admin/variantes",
    id,
    currentStatus: variant.activo,
    collection: variants,
    render: renderVariants,
    errorMessage: "No se pudo cambiar el estado.",
  });
};

window.changePrincipal = async function (id, current) {
  if (current) return;

  try {
    const res = await fetch(`/api/admin/variantes/${id}/principal`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ principal: 1 })
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    if (!data.success) throw new Error();

    await fetchVariants();

  } catch (error) {
    showToast("Error al actualizar la imagen principal.", "error");
  }
};

window.editVariant = function (id) {
  const variant = variants.find(v => v.id === id);
  if (!variant) return;

  const producto = productos.find(p => p.id === variant.producto_id);
  productoInput.value = producto ? producto.nombre : "";
  productoIdSeleccionado = producto ? producto.id : null;

  modalTitle.textContent = "Editar Variante";
  variantIdInput.value = variant.id;
  variantColorInput.value = variant.color;
  variantStockInput.value = variant.stock;

  variantImgInput.value = variant.img || "";
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

window.deleteVariant = async function(id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/variantes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

    await fetchVariants();
    showToast("Variante eliminada con éxito.", "success");

  } catch (err) {
    showToast("Error al eliminar la variante.", "error");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts();
  fetchVariants();
});