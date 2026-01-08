import { calculateItem } from "../utils/calculateItem.js";
import { showToast } from "../utils/toastify.js";

document.addEventListener('DOMContentLoaded', function() {
  const comparisonForm = document.getElementById('comparison-form');
  const searchInput = document.getElementById('comparison-search');
  const searchResults = document.getElementById('buscar-results');
  const selectedDevicesContainer = document.getElementById('selected-devices');
  const mobileIdsInput = document.getElementById('mobile-ids');
  const comparisonResults = document.getElementById('comparison-results');
  
  let selectedDevices = [];
  let excludedMobileIds = [];
  let ratingTimeout;

async function searchMobiles(query) {
  if (query.length < 2) {
    searchResults.style.display = 'none';
    return;
  }
  
  try {
    const response = await fetch(
      `/comparison/searchMobiles?q=${encodeURIComponent(query)}` + 
      (excludedMobileIds.length > 0 ? `&exclude=${excludedMobileIds.join(',')}` : '')
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
    .then(({ devices = [], excludedMobileIds: excluded = [] }) => {
      excludedMobileIds = excluded;

      selectedDevices = devices.map(({ id, mobileId, name, image }) => ({
        id, mobileId, name, image
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
      <img src="${product.image?.split(',')[0]}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <div class="item-price">
        $${formatPrice(calc.finalPrice)}
          ${product.discount > 0 ? `<del class="item-old-price">$${formatPrice(calc.originalPrice)}</del>` : ''}
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
  
function addDeviceToComparison({ id, name, image }) {
  if (selectedDevices.some(d => d.id === id)) {
    showToast("Este dispositivo ya está en la lista de comparación", "#e74c3c", "info");
    return false;
  }

  selectedDevices.push({ id, name, image: image?.split(',')[0] });
  updateSelectedDevicesDisplay();
  return true; 
}

function removeDeviceFromComparison(deviceId) {
  selectedDevices = selectedDevices.filter(d => d.id !== deviceId);
  excludedMobileIds = selectedDevices.map(d => d.mobileId);

  updateSelectedDevicesDisplay();

  const ids = selectedDevices.map(d => d.id).join(',');
  window.history.pushState({}, '', ids ? `/comparison?ids=${ids}` : '/comparison');

  const query = searchInput.value.trim();
  if (query.length >= 2) searchMobiles(query);
}
  
function updateSelectedDevicesDisplay() {
  selectedDevicesContainer.innerHTML = selectedDevices.map(({ id, name, image }) => `
    <div class="selected-device">
      <img src="${image}" alt="${name}">
      <span>${name}</span>
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
    
    excludedMobileIds = data.excludedMobileIds || [];
  } catch (error) {
    console.error('Error:', error);
    showToast("Error al comparar dispositivos", "#e74c3c", "info");
  }
});

function renderSectionTitle(sectionId, titleHTML) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (section.querySelector('h2')) return;

  const title = document.createElement('h2');
  title.className = 'more-devices-title';
  title.innerHTML = titleHTML;

  section.prepend(title);
}

async function loadTopSoldDevices() {
  const res = await fetch('/comparison/top-sold');
  const devices = await res.json();

  if (!devices.length) return;

  renderSectionTitle(
    'top-sold-section',
    `Top Ventas`
  );

  renderSelectableDevices(devices, 'top-sold-grid');
}

async function loadTopRatedDevices() {
  const res = await fetch('/comparison/top-rated');
  const devices = await res.json();

  if (!devices.length) return;

  renderSectionTitle(
    'top-rated-section',
    `Lo Más Gustados`
  );

  renderSelectableDevices(devices, 'top-rated-grid');
}

function renderStars(rating = 0, productId) {
  let starsHTML = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHTML += `<i class="custom-star fa-solid fa-star"></i>`;
    } else if (i - rating < 1 && i > rating) {
      starsHTML += `<i class="custom-star fa-regular fa-star-half-stroke"></i>`;
    } else {
      starsHTML += `<i class="custom-star fa-regular fa-star"></i>`;
    }
  }

  return `
    <div class="product-rating" data-product-id="${productId}">
      <a href="/product/${productId}#tab3" class="rating-link">
        ${starsHTML}
      </a>
      <div class="rating-tooltip hidden"></div>
    </div>
  `;
}

function renderSelectableDevices(devices, gridId = 'devices-grid') {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = '';

  devices.forEach(device => {
    const calc = calculateItem(device);

    const card = document.createElement('div');
    card.className = 'device-select-card';

    card.innerHTML = `  
      <a href="/product/${device.id}">
        <img src="${device.image?.split(",")[0]}" alt="${device.name}">
      </a>

      <div class="search-result">
        <div class="item-price">
          $${formatPrice(calc.finalPrice)}
          ${
            device.discount > 0
              ? `<del class="item-old-price">$${formatPrice(calc.originalPrice)}</del>`
              : ""
          }
        </div>
      </div>

      ${device.rating ? renderStars(device.rating, device.id) : ""}

      <button>Comparar</button>
    `;

    const compareBtn = card.querySelector('button');

    compareBtn.addEventListener('click', () => {
      const added = addDeviceToComparison(device);

      if (added) {
        showToast("Dispositivo agregado a la comparación", "#16a34a", "success");
      }
    });

    grid.appendChild(card);
  });
}

document.addEventListener('mouseover', async (e) => {
  const ratingEl = e.target.closest('.product-rating');
  if (!ratingEl) return;

  const tooltip = ratingEl.querySelector('.rating-tooltip');
  if (!tooltip) return;

  clearTimeout(ratingTimeout);

  tooltip.classList.add('active');
  tooltip.classList.remove('hidden');

  if (!tooltip.dataset.loaded) {
    const productId = ratingEl.dataset.productId;
    if (!productId) return;

    try {
      const res = await fetch(`/comparison/product/${productId}/rating-breakdown`);
      if (!res.ok) return;
      const data = await res.json();
      const totalReviews = data.reduce((sum, r) => sum + r.total, 0);

      tooltip.innerHTML = renderRatingBars(data, totalReviews, productId);
      tooltip.dataset.loaded = "true";
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    }
  }
});

document.addEventListener('mouseout', (e) => {
  const ratingEl = e.target.closest('.product-rating');
  if (!ratingEl) return;

  const tooltip = ratingEl.querySelector('.rating-tooltip');
  
  ratingTimeout = setTimeout(() => {
    if (tooltip) {
      tooltip.classList.remove('active');
      setTimeout(() => {
        if(!tooltip.classList.contains('active')) tooltip.classList.add('hidden');
      }, 300); 
    }
  }, 100);
});

function renderRatingBars(data, totalReviews, productId) {
  const rows = data
    .sort((a, b) => b.stars - a.stars)
    .map(row => {
      const percent = Math.round((row.total / totalReviews) * 100);

      return `
        <div class="rating-row">
          <span class="stars">${row.stars}★</span>
          <div class="bar">
            <div class="fill" style="width:${percent}%"></div>
          </div>
          <span class="percent">${percent}%</span>
        </div>
      `;
    })
    .join('');

  return `
    <a href="/product/${productId}#tab3" class="rating-box">
      ${rows}
    </a>
  `;
}

function safe(value) {
  return value ?? ''; 
}

function displayComparisonResults(devices) {
  comparisonResults.innerHTML = '';
  
  const wrapper = document.createElement('div');
  wrapper.className = 'device-cards-wrapper-comparison';
  
  devices.forEach((device, index) => {
    const calc = calculateItem(device);
    const deviceCard = document.createElement('div');
    deviceCard.className = 'device-card';

    deviceCard.innerHTML = `
      <h2 class="tittle2-comparison">${safe(device.name)}</h2>
      <div class="device-image">
        <img class="img-comparison" src="${safe(device.image)}" alt="${safe(device.name)}">
      </div>

      ${device.rating ? `<div class="product-rating-container">
      ${renderStars(device.rating, device.id)}
      <span class="total-reviews">(${device.total_reviews || 0} reseñas)</span>
    </div>` : ''}
      
      <div class="search-result">
        <div class="item-price"> $${formatPrice(calc.finalPrice)}
          ${device.discount > 0 ? `<del class="item-old-price">$${formatPrice(calc.originalPrice)}</del>` : ''}
        </div>
      </div>
      
      <div class="specs-grid">
        <div class="spec-item spec-header">Pantalla:</div>
        <div class="spec-item spec-value">
          ${safe(device.screen_size)}" ${safe(device.screen_type)}<br>
          ${safe(device.screen_resolution)}<br>
          ${safe(device.screen_refresh_rate)}Hz
        </div>
        
        <div class="spec-item spec-header">Procesador:</div>
        <div class="spec-item spec-value">
          ${safe(device.processor_name)}<br>
          ${safe(device.processor_cores)} núcleos<br>
          ${safe(device.processor_speed)}
        </div>
        
        <div class="spec-item spec-header">GPU:</div>
        <div class="spec-item spec-value">
          ${safe(device.gpu_model)}<br>
          ${safe(device.gpu_cores)} núcleos
        </div>
        
        <div class="spec-item spec-header">RAM:</div>
        <div class="spec-item spec-value">${safe(device.ram_capacities)}</div>
        
        <div class="spec-item spec-header">Almacenamiento:</div>
        <div class="spec-item spec-value">${safe(device.storage_capacities)}</div>
        
        <div class="spec-item spec-header">Cámara:</div>
        <div class="spec-item spec-value">
          Principal: ${safe(device.main_camera)}<br>
          Frontal: ${safe(device.selfie_camera)}<br>
          Video: ${safe(device.video_recording)}
        </div>
        
        <div class="spec-item spec-header">Batería:</div>
        <div class="spec-item spec-value">
          ${safe(device.battery_capacity)} mAh<br>
          ${safe(device.battery_type)}<br>
          ${device.fast_charging ? 'Carga rápida: ' + safe(device.fast_charging) : ''}
          ${device.wireless_charging ? '<br>Carga inalámbrica' : ''}
        </div>
        
        <div class="spec-item spec-header">Conectividad:</div>
        <div class="spec-item spec-value">
          ${safe(device.network)}<br>
          WiFi: ${safe(device.wifi)}<br>
          Bluetooth: ${safe(device.bluetooth)}
          ${device.nfc ? '<br>NFC' : ''}
        </div>
        
        <div class="spec-item spec-header">Dimensiones:</div>
        <div class="spec-item spec-value">
          ${safe(device.height)} x ${safe(device.width)} x ${safe(device.thickness)} mm<br>
          Peso: ${safe(device.weight)} g
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
loadTopSoldDevices();
loadTopRatedDevices();
});