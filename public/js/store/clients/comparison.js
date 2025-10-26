import { calculateItem } from "../../utils/calculateItem.js";
import { showToast } from "../../utils/toastify.js";

document.addEventListener('DOMContentLoaded', function() {
  const comparisonForm = document.getElementById('comparison-form');
  const searchInput = document.getElementById('comparison-search');
  const searchResults = document.getElementById('buscar-results');
  const selectedDevicesContainer = document.getElementById('selected-devices');
  const mobileIdsInput = document.getElementById('mobile-ids');
  const comparisonResults = document.getElementById('comparison-results');
  
  let selectedDevices = [];
  let excludedMovilIds = [];

async function searchMobiles(query) {
  if (query.length < 2) {
    searchResults.style.display = 'none';
    return;
  }
  
  try {
    const response = await fetch(
      `/comparison/searchMobiles?q=${encodeURIComponent(query)}` + 
      (excludedMovilIds.length > 0 ? `&exclude=${excludedMovilIds.join(',')}` : '')
    );
    if (!response.ok) throw new Error('Error en la búsqueda');
    const results = await response.json();
    displaySearchResults(results);
  } catch (error) {
    console.error('Error:', error);
  }
}

function loadDevicesURL() {
  const ids = new URLSearchParams(window.location.search).get('ids');
  if (!ids) return;

  const idList = ids.split(',')
  .map(id => parseInt(id.trim())).filter(Number.isFinite);

  if (!idList.length) return;

  fetch(`/comparison/compare?ids=${idList.join(',')}`)
    .then(res => res.json())
    .then(({ devices = [], excludedMovilIds: excluded = [] }) => {
      excludedMovilIds = excluded;

      selectedDevices = devices.map(({ id, movil_id, nombre, imagen }) => ({
        id, movil_id, nombre, imagen
      }));
      updateSelectedDevicesDisplay();

      if (devices.length >= 2) displayComparisonResults(devices);
    })
    .catch(err => console.error('Error al cargar desde URL:', err));
}

function displaySearchResults(products) {
  searchResults.innerHTML = '';
  
  if (products.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">No se encontraron dispositivos</div>';
    searchResults.style.display = 'block';
    return;
  }
  
  const availableProducts = products.filter(product => 
    !selectedDevices.some(device => device.id === product.id)
  );
  
  if (availableProducts.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">Todos los dispositivos encontrados ya están seleccionados</div>';
    searchResults.style.display = 'block';
    return;
  }
  
  availableProducts.forEach(product => {
    const calc = calculateItem(product);
    const productElement = document.createElement('div');
    productElement.className = 'search-result-item';
    productElement.innerHTML = `
      <img src="${product.imagenes?.split(',')[0]}" alt="${product.nombre}">
      <div class="product-info">
        <h4>${product.nombre}</h4>
        <div class="product-price">
        $${formatPrice(calc.precioFinal)}
          ${product.descuento > 0 ? `<del class="product-old-price">$${formatPrice(calc.precioAntesDescuento)}</del>` : ''}
      </div>
      </div>
    `;

    productElement.addEventListener('click', () => {
      addDeviceToComparison(product);
      searchInput.value = '';
      searchResults.style.display = 'none';
    });
    
    searchResults.appendChild(productElement);
  });
  
  searchResults.style.display = 'block';
}
  
function addDeviceToComparison({ id, nombre, imagenes }) {
  if (selectedDevices.some(d => d.id === id)) {
    showToast("Este dispositivo ya está en la lista de comparación", "#e74c3c", "info");
    return;
  }

  selectedDevices.push({ id, nombre, imagen: imagenes?.split(',')[0] });
  updateSelectedDevicesDisplay();
}

function removeDeviceFromComparison(deviceId) {
  selectedDevices = selectedDevices.filter(d => d.id !== deviceId);
  excludedMovilIds = selectedDevices.map(d => d.movil_id);

  updateSelectedDevicesDisplay();

  const ids = selectedDevices.map(d => d.id).join(',');
  window.history.pushState({}, '', ids ? `/comparison?ids=${ids}` : '/comparison');

  const query = searchInput.value.trim();
  if (query.length >= 2) searchMobiles(query);
}
  
function updateSelectedDevicesDisplay() {
  selectedDevicesContainer.innerHTML = selectedDevices.map(({ id, nombre, imagen }) => `
    <div class="selected-device">
      <img src="${imagen}" alt="${nombre}">
      <span>${nombre}</span>
      <i class="bi bi-trash remove-device" data-id="${id}"></i>
    </div>
  `).join('');

  mobileIdsInput.value = selectedDevices.map(d => d.id).join(',');

  const compareButton = document.querySelector(".search-comparison-btn");
  compareButton.style.display = selectedDevices.length === 0 || selectedDevices.length >= 2 ? "block" : "none";
}
  
  searchInput.addEventListener('input', () => {
    searchMobiles(searchInput.value.trim());
  });
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      searchResults.style.display = 'block';
    }
  });
  
  selectedDevicesContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-device')) {
    const deviceId = Number(e.target.getAttribute('data-id'));
    removeDeviceFromComparison(deviceId);
  }
});
  
document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('mobile-search') && e.target !== searchInput) {
    searchResults.style.display = 'none';
  }
});
  
comparisonForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  if (selectedDevices.length < 2) {
    showToast("Selecciona al menos 2 dispositivos para comparar.", "#e74c3c", "info");
    return;
  }

  const ids = mobileIdsInput.value;
  window.history.pushState({}, '', `/comparison?ids=${ids}`);

  try {
    const response = await fetch(`/comparison/compare?ids=${ids}`);
    if (!response.ok) throw new Error('Error al comparar dispositivos');
    const data = await response.json();
    
    displayComparisonResults(data.devices);
    
    excludedMovilIds = data.excludedMovilIds || [];
  } catch (error) {
    console.error('Error:', error);
    showToast("Error al comparar dispositivos", "#e74c3c", "info");
  }
});

function displayComparisonResults(devices) {
  comparisonResults.innerHTML = '';
  
  const wrapper = document.createElement('div');
  wrapper.className = 'device-cards-wrapper-comparison';
  
  devices.forEach((device, index) => {
    const calc = calculateItem(device);
    const deviceCard = document.createElement('div');
    deviceCard.className = 'device-card';

    deviceCard.innerHTML = `
      <h2 class="tittle2-comparison">${device.nombre}</h2>
      <div class="device-image">
        <img class="img-comparison" src="${device.imagen}" alt="${device.nombre}">
      </div>
      
      <div class="product-price">
        $${formatPrice(calc.precioFinal)}
        ${device.descuento > 0 ? `<del class="product-old-price">$${formatPrice(calc.precioAntesDescuento)}</del>` : ''}
      </div>
      
      <div class="specs-grid">
        <div class="spec-item spec-header">Pantalla:</div>
        <div class="spec-item spec-value">
          ${device.pantalla_tamaño}" ${device.pantalla_tipo}<br>
          ${device.pantalla_resolucion}<br>
          ${device.pantalla_frecuencia}Hz
        </div>
        
        <div class="spec-item spec-header">Procesador:</div>
        <div class="spec-item spec-value">
          ${device.cpu_nombre}<br>
          ${device.cpu_nucleos} núcleos<br>
          ${device.cpu_velocidad}
        </div>
        
        <div class="spec-item spec-header">GPU:</div>
        <div class="spec-item spec-value">
          ${device.gpu_modelo}<br>
          ${device.gpu_nucleos} núcleos
        </div>
        
        <div class="spec-item spec-header">RAM:</div>
        <div class="spec-item spec-value">${device.ram_capacidades}</div>
        
        <div class="spec-item spec-header">Almacenamiento:</div>
        <div class="spec-item spec-value">${device.almacenamiento_capacidades}</div>
        
        <div class="spec-item spec-header">Cámara:</div>
        <div class="spec-item spec-value">
          Principal: ${device.camara_principal}<br>
          Selfie: ${device.camara_selfie}<br>
          Video: ${device.camara_video}
        </div>
        
        <div class="spec-item spec-header">Batería:</div>
        <div class="spec-item spec-value">
          ${device.bateria_capacidad} mAh<br>
          ${device.bateria_tipo}<br>
          ${device.bateria_carga_rapida ? 'Carga rápida: ' + device.bateria_carga_rapida : ''}
          ${device.bateria_carga_inalambrica ? '<br>Carga inalámbrica' : ''}
        </div>
        
        <div class="spec-item spec-header">Conectividad:</div>
        <div class="spec-item spec-value">
          ${device.conectividad_red}<br>
          WiFi: ${device.conectividad_wifi}<br>
          Bluetooth: ${device.conectividad_bluetooth}
          ${device.conectividad_nfc ? '<br>NFC' : ''}
        </div>
        
        <div class="spec-item spec-header">Dimensiones:</div>
        <div class="spec-item spec-value">
          ${device.dimensiones_altura} x ${device.dimensiones_anchura} x ${device.dimensiones_grosor} mm<br>
          Peso: ${device.dimensiones_peso} 
        </div>
      </div>
      
      <button class="btn-comparison" onclick="window.location.href='/product/${device.id}'">
        Ver Producto
      </button>
    `;
    
    wrapper.appendChild(deviceCard);
  });
    
  comparisonResults.appendChild(wrapper);
}
  loadDevicesURL();
});