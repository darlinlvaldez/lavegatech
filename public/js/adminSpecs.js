import { showToast } from './toastify.js';
import { sweetAlert } from './sweetAlert2.js';
import { showValidation, clearError } from "./showValidation.js";

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            loadTabData(tabId);
        });
    });
    
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    setupGenericModal();
});

async function loadTabData(tabId) {
    try {
        const response = await fetch(`/api/admin/${tabId}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Error al cargar datos');
        
        renderTableData(tabId, data);
    } catch (error) {
        showToast(error.message, '#e74c3c', 'alert-circle');
    }
}

function renderTableData(tabId, data) {
    const tableBody = document.getElementById(`${tabId}TableBody`);
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        switch(tabId) {
            case 'productos':
                row.innerHTML = generateProductRow(item);
                break;
            case 'moviles':
                row.innerHTML = generateMovilRow(item);
                break;
            case 'pantallas':
                row.innerHTML = generatePantallaRow(item);
                break;
            default:
                row.innerHTML = generateDefaultRow(item, tabId);
        }
        
        tableBody.appendChild(row);
    });
}

function generateMovilRow(movil) {
    return `
        <td>${movil.id || ''}</td>
        <td>${movil.año || ''}</td>
        <td>${movil.cpu_id || ''}</td>
        <td>${movil.camara_id || ''}</td>
        <td>${movil.bateria_id || ''}</td>
        <td>${movil.gpu_id || ''}</td>
        <td class="actions">
            <button onclick="editRecord('moviles', ${movil.id})" class="edit-button">
                Editar
            </button>
            <button onclick="deleteRecord('moviles', ${movil.id})" class="delete-button">
                Eliminar
            </button>
        </td>
    `;
}

function setupGenericModal() {
    const modal = document.getElementById('genericModal');
    const form = document.getElementById('genericForm');
    const cancelBtn = document.getElementById('cancelModalBtn');
    
    document.querySelectorAll('[id^="add"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const recordType = btn.id.replace('add', '').replace('Btn', '').toLowerCase();
            openModal(recordType);
        });
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        clearError([], '#genericForm');
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const recordType = document.getElementById('recordType').value;
        const recordId = document.getElementById('recordId').value;
        const formData = getFormData(recordType);
        
        try {
            const res = await fetch(recordId ? `/api/admin/${recordType}/${recordId}` : `/api/admin/${recordType}`, {
                method: recordId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                if (data.validationError) {
                    showValidation(data.errors, '#genericForm');
                } else {
                    showToast(data.error || 'Error al guardar', '#e74c3c', 'alert-circle');
                }
                return;
            }
            
            showToast(recordId ? 'Registro actualizado' : 'Registro creado', '#27ae60', 'check-circle');
            modal.classList.remove('visible');
            loadTabData(recordType);
            
        } catch (error) {
            showToast('Error inesperado', '#e74c3c', 'alert-circle');
        }
    });
}

function openModal(recordType, recordId = null) {
    const modal = document.getElementById('genericModal');
    const title = document.getElementById('modalTitle');
    const formFields = document.getElementById('modalFormFields');
    
    title.textContent = recordId ? `Editar ${recordType}` : `Añadir ${recordType}`;
    
    formFields.innerHTML = generateFormFields(recordType);
    
    if (recordId) {
        loadRecordData(recordType, recordId);
    }
    
    document.getElementById('recordType').value = recordType;
    document.getElementById('recordId').value = recordId || '';
    modal.classList.add('visible');
}

function generateFormFields(recordType) {
    switch(recordType) {
        case 'productos':
            return `
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre">
                    <div class="error-text" data-error-for="nombre"></div>
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion"></textarea>
                    <div class="error-text" data-error-for="descripcion"></div>
                </div>
            `;
        case 'moviles':
            return `
                <div class="form-group">
                    <label for="año">Año:</label>
                    <input type="number" id="año" name="año">
                    <div class="error-text" data-error-for="año"></div>
                </div>
            `;
        default:
            return `<p>Formulario no configurado para ${recordType}</p>`;
    }
}

window.editRecord = function(recordType, recordId) {
    openModal(recordType, recordId);
};

window.deleteRecord = async function(recordType, recordId) {
    const confirmed = await sweetAlert({
        title: `¿Eliminar ${recordType}?`,
        text: "Esta acción no se puede deshacer.",
        confirmButtonText: "Aceptar",
    });

    if (!confirmed) return;

    try {
        const res = await fetch(`/api/admin/${recordType}/${recordId}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        
        showToast("Registro eliminado", "#27ae60", "check-circle");
        loadTabData(recordType);

    } catch (err) {
        showToast("Error al eliminar", "#e74c3c", "alert-circle");
    }
};