let admins = [];

async function fetchAdmins() {
  const res = await fetch("/api/adminAuth/usuarios");
  const data = await res.json();
  admins = data;
  renderAdmins();
}

function renderAdmins() {
  const tbody = document.getElementById("adminTableBody");
  tbody.innerHTML = "";

  admins.forEach(admin => {
    const row = document.createElement("tr");

    const estadoTexto = admin.is_active ? "Activo" : "Inactivo";
    const estadoClase = admin.is_active ? "estado-activo" : "estado-inactivo";

    row.innerHTML = `
      <td>${admin.username}</td>
      <td>${new Date(admin.created_at).toLocaleString()}</td>
      <td>
        <button class="estado-btn ${estadoClase}" onclick="toggleEstado(${admin.id})">
          ${estadoTexto}
        </button>
      </td>
      <td>
        <button onclick="openEditModal(${admin.id})" class="edit-button">Editar</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

async function toggleEstado(id) {
  const admin = admins.find(a => a.id === id);
  if (!admin) return;

  const nuevoEstado = admin.is_active ? 0 : 1;

  const res = await fetch(`/api/adminAuth/usuarios/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: nuevoEstado }),
  });

  if (res.ok) {
    admin.is_active = nuevoEstado;
    renderAdmins();
  } else {
    alert("Error al actualizar el estado");
  }
}

function openAddModal() {
  document.getElementById("modalTitle").innerText = "Añadir Nuevo Administrador";
  document.getElementById("userId").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("userModal").classList.add("visible");
}

function openEditModal(id) {
  const admin = admins.find(a => a.id === id);
  if (!admin) return;

  document.getElementById("modalTitle").innerText = "Editar Administrador";
  document.getElementById("userId").value = admin.id;
  document.getElementById("username").value = admin.username;
  document.getElementById("password").value = "";
  document.getElementById("userModal").classList.add("visible");
}

function closeModal() {
  document.getElementById("userModal").classList.remove("visible");
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("userId").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const url = id ? `/api/adminAuth/usuarios/${id}` : "/api/adminAuth/usuarios";
  const method = id ? "PUT" : "POST";

  const body = { username };
  if (password) body.password = password;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    closeModal();
    fetchAdmins();
  } else {
    alert("Error al guardar los datos");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAdmins();
  document.getElementById("addUserBtn").addEventListener("click", openAddModal);
  document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
  document.getElementById("userForm").addEventListener("submit", handleFormSubmit);
});