import { changeEntityStatus} from '../../utils/changeState.js';

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

    const estadoTexto = user.activo ? "Activo" : "Inactivo";
    const estadoClase = user.activo ? "active-state" : "inactive-state";

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${new Date(user.fecha_creacion).toLocaleString()}</td>
      <td>
        <button class="estado-btn ${estadoClase}" onclick="toggleEstado(${user.id})">
          ${estadoTexto}
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

window.toggleEstado = async function (id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  changeEntityStatus({
    endpoint: "/api/admin/usuarios",
    id,
    currentStatus: user.activo,
    collection: users,
    render: renderUsers
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});