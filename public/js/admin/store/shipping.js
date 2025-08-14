import { showToast } from '../toastify.js';
import { sweetAlert } from '../sweetAlert2.js';
import { showValidation, clearError } from "../showValidation.js";

let cities = [];
let filteredCities = [];

const citiesTableBody = document.getElementById("citiesTableBody");
const addCityBtn = document.getElementById("addCityBtn");
const cityModal = document.getElementById("cityModal");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const cityForm = document.getElementById("cityForm");
const modalTitle = document.getElementById("modalTitle");
const cityIdInput = document.getElementById("cityId");
const nombreInput = document.getElementById("cityNombre");
const costoInput = document.getElementById("cityCosto");

const cityErrorFields = ["nombre", "costo_envio"];

function renderCities() {
  citiesTableBody.innerHTML = "";

  (filteredCities.length ? filteredCities : cities).forEach((city) => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td class="truncate-cell">${city.id || ''}</td>
      <td class="truncate-cell">${city.nombre || ''}</td>
      <td>$${formatPrice(parseFloat(city.costo_envio)) || 0}</td>
      <td>
        <button onclick="editCity(${city.id})" class="edit-button">
          Editar
        </button>
        <button onclick="deleteCity(${city.id})" class="delete-button">
          Eliminar
        </button>
      </td>
    `;
    citiesTableBody.appendChild(row);
  });
}

const searchCityInput = document.getElementById("searchCityInput");

searchCityInput.addEventListener("input", () => {
  const query = searchCityInput.value.trim().toLowerCase();

  if (query.length === 0) {
    filteredCities = [];
  } else {
    filteredCities = cities.filter(city =>
      city.nombre?.toLowerCase().includes(query)
    );
  }

  renderCities();
});

addCityBtn.addEventListener("click", () => {
  modalTitle.textContent = "Añadir Nueva Ciudad";
  cityForm.reset();
  cityIdInput.value = ""; 
  cityModal.classList.add("visible"); 
});

cancelModalBtn.addEventListener("click", () => {
  cityModal.classList.remove("visible");
  clearError(cityErrorFields,'#cityForm');
});

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearError(cityErrorFields,'#cityForm');

  const id = cityIdInput.value;
  const body = {
    nombre: nombreInput.value.trim(),
    costo_envio: costoInput.value ? parseFloat(costoInput.value) : 0
  };

  try {
    const res = await fetch(id ? `/api/admin/ciudades/${id}` : "/api/admin/ciudades", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.validationError && Array.isArray(data.errors)) {
        showValidation(data.errors, "#cityForm");
      } else {
        showToast(data.error || "Error al guardar la ciudad.", "#e74c3c", "alert-circle");
      }
      return;
    }

    showToast(id ? "Ciudad actualizada con éxito." : "Ciudad agregada con éxito.", "#27ae60", "check-circle");
    cityModal.classList.remove("visible");
    fetchCities();

  } catch (err) {
    showToast("Error inesperado al guardar la ciudad.", "#e74c3c", "alert-circle");
  }
});

window.editCity = function(id) {
  const city = cities.find((c) => c.id === id);
  if (city) {
    modalTitle.textContent = "Editar Ciudad";
    nombreInput.value = city.nombre;
    costoInput.value = city.costo_envio;
    cityIdInput.value = city.id;
    cityModal.classList.add("visible");
  }
}

document.addEventListener("DOMContentLoaded", renderCities);

async function fetchCities() {
  const res = await fetch("/api/admin/ciudades");
  const data = await res.json();
  cities = data;
  filteredCities = [];
  renderCities();
}

window.deleteCity = async function(id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Ciudad?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/ciudades/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    
    await fetchCities();
    showToast("Ciudad eliminada con éxito.", "#27ae60", "check-circle");

  } catch (err) {
    showToast("Error al eliminar la ciudad.", "#e74c3c", "alert-circle");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCities();
});