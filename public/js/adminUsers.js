let users = [];
let filteredUsers = [];

async function fetchUsers() {
  const res = await fetch("/api/admin/usuarios");
  const data = await res.json();
  users = data;
  filteredUsers = []; 
  renderUsers();
}

const searchUserInput = document.getElementById("searchUserInput");

searchUserInput.addEventListener("input", () => {
  const query = searchUserInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredUsers = [];
  } else {
    filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }
console.log("Filtrados:", filteredUsers);

  renderUsers();
});


function renderUsers() {
  const tbody = document.getElementById("productsTableBody");
  tbody.innerHTML = "";

  const lista = filteredUsers.length > 0 ? filteredUsers : users;

  lista.forEach(user => {
    const row = document.createElement("tr");

    const estadoTexto = user.is_active ? "Activo" : "Inactivo";
    const estadoClase = user.is_active ? "estado-activo" : "estado-inactivo";

    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${new Date(user.created_at).toLocaleString()}</td>
      <td>
        <button class="estado-btn ${estadoClase}" onclick="toggleEstado(${user.id})">
          ${estadoTexto}
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

async function toggleEstado(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  const nuevoEstado = user.is_active ? 0 : 1;

  const res = await fetch(`/api/admin/usuarios/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: nuevoEstado }),
  });

  if (res.ok) {
    user.is_active = nuevoEstado;
    renderUsers();
  } else {
    alert("Error al actualizar el estado");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});