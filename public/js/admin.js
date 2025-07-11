let products = [];

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

function renderProducts() {
  productsTableBody.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    const fecha = new Date(product.fecha);
    const fechaFormateada = fecha.toLocaleString("es-DO", {
      dateStyle: "short", timeStyle: "short"});

    row.innerHTML = `
      <td>${product.nombre}</td>
      <td>${product.descripcion}</td>
      <td>$${parseFloat(product.precio).toFixed(2)}</td>
      <td>$${parseFloat(product.descuento).toFixed(2)}</td>
      <td>${product.categoria}</td>
      <td>${product.marca}</td>
      <td>${fechaFormateada}</td>
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

addProductBtn.addEventListener("click", () => {
  modalTitle.textContent = "Añadir Nuevo Producto";
  productForm.reset();
  productIdInput.value = ""; 
  productModal.classList.add("visible"); 
});

cancelModalBtn.addEventListener("click", () => {
  productModal.classList.remove("visible");
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const id = productIdInput.value;
  const nombre = nombreInput.value;
  const descripcion = descripcionInput.value;
  const precio = parseFloat(precioInput.value);
  const descuento = parseFloat(descuentoInput.value);
  const categoria = categoriaInput.value;
  const marca = marcaInput.value;
  const fecha = fechaInput?.value || null;


  if (id) {
    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex !== -1) {
      products[productIndex] = { id: parseInt(id), nombre, precio, descuento, 
        descripcion, categoria, marca, fecha};
    }
  } else {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      products.push({ id: newId, id, nombre, precio, descuento,
        descripcion, categoria, marca});
  }

  renderProducts(); 
  productModal.classList.remove("visible"); 
});

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    modalTitle.textContent = "Editar Producto";
    nombreInput.value = product.nombre;
    precioInput.value = product.precio;
    descripcionInput.value = product.descripcion;
    descuentoInput.value = product.descuento;
    categoriaInput.value = product.categoria;
    marcaInput.value = product.marca;
    
    document.getElementById("fechaGroup").style.display = "block"; 
    fechaInput.value = product.fecha?.slice(0, 16);

    productIdInput.value = product.id;
    productModal.classList.add("visible");
  }
}

function deleteProduct(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    products = products.filter((product) => product.id !== id);
    renderProducts(); 
  }
}

document.addEventListener("DOMContentLoaded", renderProducts);

async function fetchProducts() {
  const res = await fetch("/api/admin/productos");
  const data = await res.json();
  products = data;
  renderProducts();
}

async function saveProduct(e) {
  e.preventDefault();

  const id = productIdInput.value;
  const nombre = nombreInput.value;
  const precio = parseFloat(precioInput.value);
  const descripcion = descripcionInput.value;
  const descuento = parseFloat(descuentoInput.value);
  const categoria = parseFloat(categoriaInput.value);
  const marca = parseFloat(marcaInput.value);
  const fecha = fechaInput?.value || null;

  const body = JSON.stringify({nombre, precio,
    descuento, descripcion, categoria, marca,
    ...(id ? { fecha } : {}),
  });

  if (id) {
    await fetch(`/api/admin/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } else {
    await fetch("/api/admin/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }

  productModal.classList.remove("visible");
  fetchProducts();
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
    fetch("/api/admin/productos/categorias"),
    fetch("/api/admin/productos/marcas"),
  ]);

  const categorias = await categoriasRes.json();
  const marcas = await marcasRes.json();

  categoriaInput.innerHTML = "";
  marcaInput.innerHTML = "";

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

async function deleteProduct(id) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    fetchProducts();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  loadCategoryBranch();
});

document.addEventListener("DOMContentLoaded", fetchProducts);
productForm.addEventListener("submit", saveProduct);