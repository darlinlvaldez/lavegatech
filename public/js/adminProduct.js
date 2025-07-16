import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from "./showValidation.js";

let products = [];
let filteredProducts = [];

const productsTableBody = document.getElementById("productsTableBody");
const addProductBtn = document.getElementById("addProductBtn");
const productModal = document.getElementById("productModal");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const productIdInput = document.getElementById("productId");
const nombreInput = document.getElementById("productoNombre");
const precioInput = document.getElementById("productoPrecio");
const descripcionInput = document.getElementById("productoDescripcion");
const descuentoInput = document.getElementById("productoDescuento");
const categoriaInput = document.getElementById("productoCategoria");
const marcaInput = document.getElementById("productoMarca");
const fechaInput = document.getElementById("productoFecha");

const productErrorFields = ["nombre", "descripcion", "precio", "descuento", "categoria", "marca", "fecha"];

function renderProducts() {
  productsTableBody.innerHTML = "";

  (filteredProducts.length ? filteredProducts : products).forEach((product) => {
    const row = document.createElement("tr");
    const fecha = new Date(product.fecha);
    const fechaFormateada = fecha.toLocaleString("es-DO", {
      dateStyle: "short", timeStyle: "short"
    });

    row.innerHTML = `
      <td class="truncate-cell">${product.nombre || ''}</td>
      <td class="truncate-cell">${product.descripcion || ''}</td>
      <td>$${formatPrice(parseFloat(product.precio)) || 0}</td>
      <td>$${(product.descuento != null ? parseFloat(product.descuento).toFixed(2) : '0.00')}</td>
      <td>${product.categoria || ''}</td>
      <td>${product.marca || ''}</td>
      <td>${fechaFormateada || ''}</td>
      <td class="actions">
        <button onclick="editProduct(${product.id})" class="edit-button">
          Editar
        </button>
        <button onclick="deleteProduct(${product.id})" class="delete-button">
          Eliminar
        </button>
      </td>
    `;
    productsTableBody.appendChild(row);
  });
}

const searchProductInput = document.getElementById("searchProductInput");

searchProductInput.addEventListener("input", () => {
  const query = searchProductInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredProducts = [];
  } else {
    filteredProducts = products.filter(product =>
      product.nombre?.toLowerCase().includes(query) ||
      product.descripcion?.toLowerCase().includes(query) ||
      product.categoria?.toLowerCase().includes(query) ||
      product.marca?.toLowerCase().includes(query)
    );
  }

  renderProducts();
});

addProductBtn.addEventListener("click", () => {
  modalTitle.textContent = "Añadir Nuevo Producto";
  productForm.reset();
  productIdInput.value = ""; 
  productModal.classList.add("visible"); 
});

cancelModalBtn.addEventListener("click", () => {
  productModal.classList.remove("visible");
  clearError(productErrorFields,'#productForm');
});

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(productErrorFields,'#productForm');

  const id = productIdInput.value;
  const body = {
    nombre: nombreInput.value.trim(),
    descripcion: descripcionInput.value.trim(),
    precio: precioInput.value ? parseFloat(precioInput.value) : 0,
    descuento: descuentoInput.value ? parseFloat(descuentoInput.value) : 0,
    categoria: categoriaInput.value ? parseInt(categoriaInput.value) : null,
    marca: marcaInput.value ? parseInt(marcaInput.value) : null,
    ...(id ? { fecha: fechaInput?.value || null } : {}),
  };

  try {
    const res = await fetch(id ? `/api/admin/productos/${id}` : "/api/admin/productos", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#productForm");
      } else {
        showToast(data.error || "Error al guardar el producto.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Producto actualizado con éxito." : "Producto agregado con éxito.", "#27ae60", "check-circle");
    productModal.classList.remove("visible");
    fetchProducts();

  } catch (err) {
    showToast("Error inesperado al guardar el producto.", "#e74c3c", "alert-circle");
  }
});

window.editProduct = function  (id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    modalTitle.textContent = "Editar Producto";
    nombreInput.value = product.nombre;
    precioInput.value = product.precio;
    descripcionInput.value = product.descripcion;
    descuentoInput.value = product.descuento;
    categoriaInput.value = product.categoria_id;
    marcaInput.value = product.marca_id;

    document.getElementById("fechaGroup").style.display = "block"; 
    fechaInput.value = product.fecha?.slice(0, 16);

    productIdInput.value = product.id;
    productModal.classList.add("visible");
  }
}

document.addEventListener("DOMContentLoaded", renderProducts);

async function fetchProducts() {
  const res = await fetch("/api/admin/productos");
  const data = await res.json();
  products = data;
  filteredProducts = [];
  renderProducts();
}

addProductBtn.addEventListener("click", () => {
  modalTitle.textContent = "Añadir Nuevo Producto";
  productForm.reset();
  productIdInput.value = ""; 
  document.getElementById("fechaGroup").style.display = "none";
  productModal.classList.add("visible"); 
});

async function loadCategoryBranch() {
  const [categoriasRes, marcasRes] = await Promise.all([
    fetch("/api/admin/categorias"),
    fetch("/api/admin/marcas"),
  ]);

  const categorias = await categoriasRes.json();
  const marcas = await marcasRes.json();

  categoriaInput.innerHTML = "<option value=''>Seleccione una categoría</option>";
  marcaInput.innerHTML = "<option value=''>Seleccione una marca</option>";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.categoria;
    categoriaInput.appendChild(option);
  });

  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca.id;
    option.textContent = marca.nombre;
    marcaInput.appendChild(option);
  });
}

window.deleteProduct = async function(id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Producto?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    
    await fetchProducts();
    showToast("Producto eliminado con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast("Error al eliminar el producto.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  loadCategoryBranch();
});