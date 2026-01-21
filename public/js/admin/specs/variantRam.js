import { showToast } from '../../utils/toastify.js';
import { sweetAlert } from '../../utils/sweetAlert2.js';
import { showValidation, clearError } from '../../utils/showValidation.js';

let variantesRAM = [];
let variantesFiltradas = [];
let ramsDisponibles = [];
let movilesDisponibles = [];

const varianteRAMModal = document.getElementById("varianteRAMModal");
const varianteRAMForm = document.getElementById("varianteRAMForm");
const varianteRAMIdInput = document.getElementById("varianteRAMId");
const modalVarianteRAMTitle = document.getElementById("modalVarianteRAMTitle");
const cancelVarianteRAMModalBtn = document.getElementById("cancelVarianteRAMModalBtn");
const addVarianteRAMBtn = document.getElementById("addVarianteRAMBtn");
const variantesRAMTableBody = document.getElementById("variantesRAMTableBody");
const searchVariantesRAMInput = document.getElementById("searchVariantesRAMInput");
const movilIdInput = document.getElementById("movilIdInput");
const ramIdInput = document.getElementById("ramIdInput");
const movilSuggestions = document.getElementById("movilSuggestions");
const ramSuggestions = document.getElementById("ramSuggestions");

function renderVariantesRAM() {
  variantesRAMTableBody.innerHTML = "";

  const lista = variantesFiltradas.length > 0 ? variantesFiltradas : variantesRAM;

  lista.forEach(v => {
    const ram = ramsDisponibles.find(r => r.id === v.ram_id) || {};
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${v.nombre_movil || v.movil_id}</td>
      <td>${ram.capacidad ? `${ram.capacidad} ${ram.tipo}` : v.ram_id}</td>
      <td>
        <button onclick="editVarianteRAM(${v.movil_id}, ${v.ram_id})" class="edit-button">Editar</button>
        <button onclick="deleteVarianteRAM(${v.movil_id}, ${v.ram_id})" class="delete-button">Eliminar</button>
      </td>
    `;
    variantesRAMTableBody.appendChild(row);
  });
}

searchVariantesRAMInput.addEventListener("input", () => {
  const query = searchVariantesRAMInput.value.trim().toLowerCase();
  variantesFiltradas = query ? variantesRAM.filter(v => {
    const movilNombre = v.nombre_movil || "";
    const ram = ramsDisponibles.find(r => r.id === v.ram_id) || {};
    return (
      movilNombre.toLowerCase().includes(query) ||
      (ram.capacidad && ram.capacidad.toLowerCase().includes(query)) ||
      (ram.tipo && ram.tipo.toLowerCase().includes(query))
    );
  }) : [];
  renderVariantesRAM();
});

addVarianteRAMBtn.addEventListener("click", async () => {
  modalVarianteRAMTitle.textContent = "Añadir Nueva Variante RAM";
  varianteRAMForm.reset();
  varianteRAMIdInput.value = "";
  
  await fetchRAMsDisponibles();
  await fetchMovilesDisponibles();
  
  varianteRAMModal.classList.add("visible");
});

cancelVarianteRAMModalBtn.addEventListener("click", () => {
  varianteRAMModal.classList.remove("visible");
});

function setupAutocomplete({ inputEl, suggestionsEl, dataArray, getTexto, onSelect = null }) {
  if (!Array.isArray(dataArray)) {
    console.error(`Datos no válidos para autocompletado en ${inputEl.id}`);
    return;
  }

  inputEl.addEventListener("input", () => {
    const query = inputEl.value.toLowerCase();
    suggestionsEl.innerHTML = "";

    if (query.length === 0) return;

    const resultados = dataArray.filter(val => {
      const texto = getTexto(val);
      return texto.toLowerCase().includes(query);
    });

    if (resultados.length === 0) {
      const noResults = document.createElement("div");
      noResults.textContent = "No hay coincidencias";
      noResults.className = "no-results";
      suggestionsEl.appendChild(noResults);
      return;
    }

    resultados.forEach(item => {
      const texto = getTexto(item);
      const div = document.createElement("div");
      div.textContent = texto;
      div.addEventListener("click", () => {
        inputEl.value = texto;
        suggestionsEl.innerHTML = "";
        if (onSelect) onSelect(item);
      });
      suggestionsEl.appendChild(div);
    });
  });
}

function setupRAMAutocomplete() {
  setupAutocomplete({
    inputEl: movilIdInput,
    suggestionsEl: movilSuggestions,
    dataArray: movilesDisponibles,
    getTexto: item => item.nombre_movil || "",
    onSelect: (item) => {
      movilIdInput.dataset.id = item.movil_id;
    }
  });

  setupAutocomplete({
    inputEl: ramIdInput,
    suggestionsEl: ramSuggestions,
    dataArray: ramsDisponibles,
    getTexto: item => `${item.capacidad} ${item.tipo}`,
    onSelect: (item) => {
      ramIdInput.dataset.id = item.id;
    }
  });
}

async function fetchMovilesDisponibles() {
  try {
    const res = await fetch("/api/specs/todos-productos");
    const productos = await res.json();

    movilesDisponibles = productos
      .filter(p => p.movil_id && p.nombre)
      .map(p => ({
        movil_id: p.movil_id,
        nombre_movil: p.nombre
      }));

    setupRAMAutocomplete();
  } catch (err) {
    console.error(err);
    showToast("Error al cargar móviles disponibles.", "error");
  }
}

async function fetchRAMsDisponibles() {
  try {
    const res = await fetch("/api/specs/ram");
    ramsDisponibles = await res.json();
    setupRAMAutocomplete(); 
  } catch (err) {
    showToast("Error al cargar RAMs disponibles.", "error");
  }
}

document.addEventListener("click", (e) => {
  if (!movilIdInput.contains(e.target)) {
    movilSuggestions.innerHTML = "";
  }
  if (!ramIdInput.contains(e.target)) {
    ramSuggestions.innerHTML = "";
  }
});

varianteRAMForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movilId = parseInt(document.getElementById("movilIdInput").dataset.id);
const ramId = parseInt(document.getElementById("ramIdInput").dataset.id);

if (!movilId || !ramId) {
  showToast("Debes seleccionar un móvil y una RAM válidos.", "error");
  return;
}

  const originalMovilId = varianteRAMForm.getAttribute("data-original-movil");
  const originalRamId = varianteRAMForm.getAttribute("data-original-ram");
  const isEditing = originalMovilId && originalRamId;

  const body = isEditing
  ? JSON.stringify({ nuevo_movil_id: movilId, nuevo_ram_id: ramId })
  : JSON.stringify({ movil_id: movilId, ram_id: ramId });

  const url = isEditing
    ? `/api/specs/variantes_ram/${originalMovilId}/${originalRamId}`
    : "/api/specs/variantes_ram";

  const method = isEditing ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body
    });

    const data = await res.json();

    if (!res.ok) {
  showToast(data.error || "Error al guardar el producto.", "error");
  return;
}
    
    showToast(isEditing ? "Variante RAM actualizada." : "Variante RAM agregada.", "success");
    varianteRAMModal.classList.remove("visible");
    varianteRAMForm.removeAttribute("data-original-movil");
    varianteRAMForm.removeAttribute("data-original-ram");
    fetchVariantesRAM();
  } catch (err) {
    showToast("Error inesperado.", "error");
  }
});

window.editVarianteRAM = async function(movil_id, ram_id) {
  await fetchMovilesDisponibles();
  await fetchRAMsDisponibles();

  const movil = movilesDisponibles.find(m => m.movil_id === movil_id); 
  const ram = ramsDisponibles.find(r => r.id === ram_id);

  if (!movil || !ram) {
    showToast("No se encontró el móvil o la RAM.", "error");
    return;
  }

  movilIdInput.dataset.id = movil.movil_id; 
  ramIdInput.dataset.id = ram.id;

  modalVarianteRAMTitle.textContent = "Editar Variante RAM";

  movilIdInput.value = movil.nombre_movil; 
  ramIdInput.value = `${ram.capacidad} ${ram.tipo}`;

  varianteRAMForm.setAttribute("data-original-movil", movil_id);
  varianteRAMForm.setAttribute("data-original-ram", ram_id);

  varianteRAMModal.classList.add("visible");
};

window.deleteVarianteRAM = async function(movil_id, ram_id) {
  const confirmed = await sweetAlert({
    title: "¿Eliminar Variante RAM?",
    text: "Esta acción no se puede deshacer.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/specs/variantes_ram/${movil_id}/${ram_id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();
    await fetchVariantesRAM();
    showToast("Variante RAM eliminada con éxito.", "success");
  } catch (err) {
    showToast("Error al eliminar la variante.", "error");
  }
};

async function fetchVariantesRAM() {
  try {
    const res = await fetch("/api/specs/variantes_ram");
    variantesRAM = await res.json();
    renderVariantesRAM();
  } catch (err) {
    showToast("Error al cargar las variantes RAM.", "error");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovilesDisponibles();
  await fetchRAMsDisponibles();
  await fetchVariantesRAM();
  setupRAMAutocomplete();
  renderVariantesRAM();
});