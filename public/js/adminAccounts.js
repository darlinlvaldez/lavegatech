import { showToast } from './toastify.js';
import { showValidation, clearError } from "./showValidation.js";
import { sweetAlert } from './sweetAlert2.js';

let admins = [];

const userErrorFields = ["username", "password", "confirmPassword"];

async function fetchAdmins() {
  const res = await fetch("/api/adminAuth/usuarios");
  const data = await res.json();
  admins = data;
  renderAdmins();
}

function renderAdmins() {
  const tbody = document.getElementById("adminTableBody");
  tbody.innerHTML = "";

  const sortedAdmins = [...admins].sort((a, b) => {
    if (a.id === currentAdminId) return -1;
    if (b.id === currentAdminId) return 1;
    return 0;
  });

  sortedAdmins.forEach(admin => {
    const row = document.createElement("tr");

    const estadoTexto = admin.is_active ? "Activo" : "Inactivo";
    const estadoClase = admin.is_active ? "estado-activo" : "estado-inactivo";

    const estadoBtn = admin.id !== currentAdminId ? `
      <button class="estado-btn ${estadoClase}" onclick="toggleEstado(${admin.id})">
        ${estadoTexto}
      </button>
    ` : '';

    const botones = `
      <button onclick="openEditModal(${admin.id})" class="edit-button">Editar</button>
      ${admin.id !== currentAdminId ? `
        <button onclick="deleteAdmin(${admin.id})" class="delete-button">Eliminar</button>
      ` : ''}
    `;

    row.innerHTML = `
      <td>${admin.username}</td>
      <td>${new Date(admin.created_at).toLocaleString()}</td>
      <td>${estadoBtn}</td>
      <td>${botones}</td>
    `;

    tbody.appendChild(row);
  });
}

window.deleteAdmin = async function (id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Producto?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });  
  
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/adminAuth/usuarios/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error()

    await fetchAdmins();
    showToast("Administrador eliminado con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast(err.message, "#e74c3c", "alert-circle");
  }
}

window.toggleEstado = async function (id) {
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
  document.getElementById("passwordOptionalLabel").style.display = "none";
  document.getElementById("userModal").classList.add("visible");
  document.getElementById("password").setAttribute("required", "true");
}

window.openEditModal = function(id) {
  const admin = admins.find(a => a.id === id);
  if (!admin) return;

  document.getElementById("modalTitle").innerText = "Editar Administrador";
  document.getElementById("userId").value = admin.id;
  document.getElementById("username").value = admin.username;
  document.getElementById("password").value = "";
  document.getElementById("passwordOptionalLabel").style.display = "inline";
  document.getElementById("userModal").classList.add("visible");
  document.getElementById("password").removeAttribute("required");
}

function closeModal() {
  document.getElementById("userModal").classList.remove("visible");
  clearError(userErrorFields, "#userForm");
}

const userForm = document.getElementById("userForm");

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearError(userErrorFields, "#userForm");

  const id = document.getElementById("userId").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password && password !== confirmPassword) {
    showValidation([
      { path: "password", message: "Las contraseñas no coinciden" },
      { path: "confirmPassword", message: "Las contraseñas no coinciden" }
    ], "#userForm");
    return;
  }

  const url = id ? `/api/adminAuth/usuarios/${id}` : "/api/adminAuth/usuarios";
  const method = id ? "PUT" : "POST";

  const body = { username };
  if (password) body.password = password;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        let errors = data.errors;

        const passwordError = errors.find(err => err.path === "password");
        if (passwordError) {
          errors = [
            ...errors,
            { path: "confirmPassword", message: passwordError.message }
          ];
        }

        showValidation(errors, "#userForm");
      } else {
        showToast(data.error || "Error al guardar los datos", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Actualizado con éxito." : 
      "Administrador creado con éxito.", "#27ae60", "check-circle");

    closeModal();
    fetchAdmins();

  } catch (err) {
    showToast(err.message || "Error al guardar los datos.", "#e74c3c", "alert-circle");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchAdmins();
  document.getElementById("addUserBtn").addEventListener("click", openAddModal);
  document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
});