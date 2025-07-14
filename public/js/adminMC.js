import { showToast } from './toastify.js';
import { showConfirmDialog } from './sweetAlert2.js';

let categorias = [];
let marcas = [];

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

function renderCategories() {
  categoriesTableBody.innerHTML = "";
  categorias.forEach((cat) => {
    const row = document.createElement("tr");
    row.innerHTML = `
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
});

categoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = categoryIdInput.value;
  const categoria = categoryNameInput.value;
  const imagen = categoryImageInput.value;

  const body = JSON.stringify({ categoria, imagen });

  if (id) {
    await fetch(`/api/admin/categorias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } else {
    await fetch("/api/admin/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }

  categoryModal.classList.remove("visible");
  fetchCategories();
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
  const confirmed = await showConfirmDialog({
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
  marcas.forEach((brand) => {
    const row = document.createElement("tr");
    const categoriasNombres = brand.categorias?.map(c => c.categoria).join(", ") || "";
    row.innerHTML = `
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

addBrandBtn.addEventListener("click", () => {
  modalBrandTitle.textContent = "Añadir Nueva Marca";
  brandForm.reset();
  brandIdInput.value = "";
  renderCategoryCheckboxes(); 
  brandModal.classList.add("visible");
});

cancelBrandModalBtn.addEventListener("click", () => {
  brandModal.classList.remove("visible");
});

brandForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = brandIdInput.value;
  const nombre = brandNameInput.value;
  const logo = brandLogoInput.value;
    const categoriasSeleccionadas = Array.from(
    document.querySelectorAll('input[name="brandCategories"]:checked')
    ).map((input) => parseInt(input.value));

  const body = JSON.stringify({ nombre, logo, categorias: categoriasSeleccionadas });

  if (id) {
    await fetch(`/api/admin/marcas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } else {
    await fetch("/api/admin/marcas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }

  brandModal.classList.remove("visible");
  fetchBrands();
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
   const confirmed = await showConfirmDialog({
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