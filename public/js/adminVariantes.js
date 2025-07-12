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

async function fetchVariantes() {
  const res = await fetch("/api/admin/variantes");
  variantes = await res.json();
  renderVariantes();
}

async function fetchProductos() {
  const res = await fetch("/api/admin/productos");
  const productos = await res.json();

  productoSelect.innerHTML = "";
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
      <td class="actions">
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
});

varianteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = varianteIdInput.value;
  const producto_id = productoSelect.value;
  const color = varianteColorInput.value;
  const stock = parseInt(varianteStockInput.value);
  const img = varianteImgInput.value;

  const body = JSON.stringify({ producto_id, color, stock, img });

  const url = id ? `/api/admin/variantes/${id}` : "/api/admin/variantes";
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body
  });

  if (res.ok) {
    varianteModal.classList.remove("visible");
    fetchVariantes();
  }
});

function editVariante(id) {
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

async function deleteVariante(id) {
  if (confirm("¿Seguro que deseas eliminar esta variante?")) {
    await fetch(`/api/admin/variantes/${id}`, { method: "DELETE" });
    fetchVariantes();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProductos();
  fetchVariantes();
});