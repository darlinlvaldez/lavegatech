import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from "./showValidation.js";

let categorias = [];
let marcas = [];
let filteredCategorias = [];
let filteredMarcas = [];

const categoriesTableBody = document.getElementById("categoriesTableBody");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const categoryModal = document.getElementById("categoryModal");
const categoryForm = document.getElementById("categoryForm");
const cancelCategoryModalBtn = document.getElementById("cancelCategoryModalBtn");
const modalCategoryTitle = document.getElementById("modalCategoryTitle");
const categoryIdInput = document.getElementById("categoryId");
const categoryNameInput = document.getElementById("categoryName");
const categoryImageInput = document.getElementById("categoryImage");

const brandsTableBody = document.getElementById("brandsTableBody");
const addBrandBtn = document.getElementById("addBrandBtn");
const brandModal = document.getElementById("brandModal");
const brandForm = document.getElementById("brandForm");
const cancelBrandModalBtn = document.getElementById("cancelBrandModalBtn");
const modalBrandTitle = document.getElementById("modalBrandTitle");
const brandIdInput = document.getElementById("brandId");
const brandNameInput = document.getElementById("brandName");
const brandLogoInput = document.getElementById("brandLogo");
const searchMarcaInput = document.getElementById("searchMarcaInput");

const categoryErrorFields = ["categoria", "imagen"];

const brandErrorFields = ["nombre", "logo"];

function renderCategories() {
  categoriesTableBody.innerHTML = "";

  const lista = filteredCategorias.length > 0 ? filteredCategorias : categorias;

  lista.forEach((cat) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.categoria}</td>
      <td>${cat.imagen}</td>
      <td>
        <button onclick="editCategory(${cat.id})" class="edit-button">Editar</button>
        <button onclick="deleteCategory(${cat.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    categoriesTableBody.appendChild(row);
  });
}

const searchCategoriaInput = document.getElementById("searchCategoriaInput");

searchCategoriaInput.addEventListener("input", () => {
  const query = searchCategoriaInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredCategorias = [];
  } else {
    filteredCategorias = categorias.filter(c =>
      c.categoria.toLowerCase().includes(query)
    );
  }

  renderCategories();
});

function renderCategoryCheckboxes() {
  const container = document.getElementById("brandCategoriesCheckboxes");
  container.innerHTML = "";
  categorias.forEach(cat => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${cat.id}" name="brandCategories"> ${cat.categoria}
    `;
    container.appendChild(label);
  });
}

addCategoryBtn.addEventListener("click", () => {
  modalCategoryTitle.textContent = "Añadir Nueva Categoría";
  categoryForm.reset();
  categoryIdInput.value = "";
  categoryModal.classList.add("visible");
});

cancelCategoryModalBtn.addEventListener("click", () => {
  categoryModal.classList.remove("visible");
  clearError(categoryErrorFields,'#categoryForm');

});

categoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(categoryErrorFields, "#categoryForm");

  const id = categoryIdInput.value;
  const categoria = categoryNameInput.value;
  const imagen = categoryImageInput.value;

  const body = JSON.stringify({ categoria, imagen });

  const url = id ? `/api/admin/categorias/${id}` : "/api/admin/categorias";
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
        showValidation(data.errors, "#categoryForm");
      } else {
        showToast(data.error || "Error al guardar la categoría.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Categoría actualizada con éxito." : "Categoría agregada con éxito.", "#27ae60", "check-circle");
    categoryModal.classList.remove("visible");
    fetchCategories();

  } catch (err) {
    showToast("Error inesperado al guardar la categoría.", "#e74c3c", "alert-circle");
  }
});

window.editCategory = function (id) {
  const cat = categorias.find((c) => c.id === id);
  if (cat) {
    modalCategoryTitle.textContent = "Editar Categoría";
    categoryNameInput.value = cat.categoria;
    categoryIdInput.value = cat.id;
    categoryModal.classList.add("visible");
  }
}

window.deleteCategory = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Categoría?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/categorias/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

    await fetchCategories();
    showToast("Categoría eliminada con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast("Error al eliminar la categoría.", "#e74c3c", "alert-circle");
  }
}

async function fetchCategories() {
  const res = await fetch("/api/admin/categorias");
  categorias = await res.json();
  renderCategories();
}

function renderBrands() {
  brandsTableBody.innerHTML = "";

  const lista = filteredMarcas.length > 0 ? filteredMarcas : marcas;

  lista.forEach((brand) => {
    const row = document.createElement("tr");
    const categoriasNombres = brand.categorias?.map(c => c.categoria).join(", ") || "";
    row.innerHTML = `
      <td>${brand.id}</td>
      <td>${brand.nombre}</td>
      <td><img src="${brand.logo}" alt="${brand.nombre}" style="max-height: 40px;"></td>
      <td>${categoriasNombres}</td>
      <td>
        <button onclick="editBrand(${brand.id})" class="edit-button">Editar</button>
        <button onclick="deleteBrand(${brand.id})" class="delete-button">Eliminar</button>
      </td>
    `;
    brandsTableBody.appendChild(row);
  });
}

searchMarcaInput.addEventListener("input", () => {
  const query = searchMarcaInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredMarcas = [];
  } else {
    filteredMarcas = marcas.filter(m =>
      m.nombre.toLowerCase().includes(query) ||
      m.categorias?.some(c => c.categoria.toLowerCase().includes(query))
    );
  }

  renderBrands();
});

addBrandBtn.addEventListener("click", () => {
  modalBrandTitle.textContent = "Añadir Nueva Marca";
  brandForm.reset();
  brandIdInput.value = "";
  renderCategoryCheckboxes(); 
  brandModal.classList.add("visible");
});

cancelBrandModalBtn.addEventListener("click", () => {
  brandModal.classList.remove("visible");
  clearError(brandErrorFields,'#brandForm');
});

brandForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(brandErrorFields, "#brandForm");

  const id = brandIdInput.value;
  const nombre = brandNameInput.value;
  const logo = brandLogoInput.value;
  const categoriasSeleccionadas = Array.from(
    document.querySelectorAll('input[name="brandCategories"]:checked')
  ).map((input) => parseInt(input.value));

  const body = JSON.stringify({ nombre, logo, categorias: categoriasSeleccionadas });

  const url = id ? `/api/admin/marcas/${id}` : "/api/admin/marcas";
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
        showValidation(data.errors, "#brandForm");
      } else {
        showToast(data.error || "Error al guardar la marca.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Marca actualizada con éxito." : "Marca agregada con éxito.", "#27ae60", "check-circle");
    brandModal.classList.remove("visible");
    fetchBrands();

  } catch (err) {
    showToast("Error inesperado al guardar la marca.", "#e74c3c", "alert-circle");
  }
});

window.editBrand = function (id) {
  const brand = marcas.find((b) => b.id === id);
  if (brand) {
    modalBrandTitle.textContent = "Editar Marca";
    brandNameInput.value = brand.nombre;
    brandLogoInput.value = brand.logo;
    brandIdInput.value = brand.id;

    renderCategoryCheckboxes(); 

    const selectedIds = brand.categorias.map(c => c.id.toString());
    const checkboxes = document.querySelectorAll('input[name="brandCategories"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectedIds.includes(checkbox.value);
    });

    brandModal.classList.add("visible");
  }
}

window.deleteBrand = async function(id) {
   const confirmed = await sweetAlert({
    title: "¿Eliminar Categoría?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;
  
  try {
    const res = await fetch(`/api/admin/marcas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();

   await fetchBrands();
    showToast("Marca eliminada con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast("Error al eliminar la marca.", "#e74c3c", "alert-circle");
  }
}

async function fetchBrands() {
  const res = await fetch("/api/admin/marcas");
  marcas = await res.json();
  renderBrands();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchBrands();
});