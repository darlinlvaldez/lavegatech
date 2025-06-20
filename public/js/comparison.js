document.addEventListener('DOMContentLoaded', function() {
  const comparisonForm = document.getElementById('comparison-form');
  const searchInput = document.getElementById('comparison-search');
  const searchResults = document.getElementById('buscar-results');
  const selectedDevicesContainer = document.getElementById('selected-devices');
  const mobileIdsInput = document.getElementById('mobile-ids');
  const comparisonResults = document.getElementById('comparison-results');
  
  let selectedDevices = [];
  
  async function searchMobiles(query) {
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }
    
    try {
      const response = await fetch(`/comparison/searchMobiles?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error en la búsqueda');
      const results = await response.json();
      displaySearchResults(results);
    } catch (error) {
      console.error('Error:', error);
    }
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
      const productElement = document.createElement('div');
      productElement.className = 'search-result-item';
      productElement.innerHTML = `
        <img src="${product.imagenes?.split(',')[0] || 'https://placehold.co/50x50'}" alt="${product.nombre}">
        <div class="product-info">
          <h4>${product.nombre}</h4>
          <div class="product-price">
              $${(Number(product.precio) * (1 - (product.descuento / 100))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              ${product.descuento > 0 ? `<del class="product-old-price">$${Number(product.precio).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del>` : ''}
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
  
  function addDeviceToComparison(product) {
    if (selectedDevices.some(device => device.id === product.id)) {
      return;
    }
    
    if (selectedDevices.length >= 3) {
      alert('Solo puedes comparar hasta 3 dispositivos');
      return;
    }
    
    selectedDevices.push({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagenes?.split(',')[0] || 'https://placehold.co/50x50'
    });
    
    updateSelectedDevicesDisplay();
  }
  
  function removeDeviceFromComparison(deviceId) {
    selectedDevices = selectedDevices.filter(device => device.id !== deviceId);
    updateSelectedDevicesDisplay();
  }
  
  function updateSelectedDevicesDisplay() {
    selectedDevicesContainer.innerHTML = "";

    selectedDevices.forEach((device) => {
      const deviceElement = document.createElement("div");
      deviceElement.className = "selected-device";
      deviceElement.innerHTML = `
        <img src="${device.imagen}" alt="${device.nombre}">
        <span>${device.nombre}</span>
        <i class="bi bi-trash remove-device" data-id="${device.id}"></i>
      `;
      selectedDevicesContainer.appendChild(deviceElement);
    });

    mobileIdsInput.value = selectedDevices.map((device) => device.id).join(",");

    const compareButton = document.querySelector(".search-comparison-btn");
    if (selectedDevices.length === 0) {
      compareButton.style.display = "block";
    } else if (selectedDevices.length >= 2) {
      compareButton.style.display = "block";
    } else {
      compareButton.style.display = "none";
    }
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
      alert('Por favor selecciona al menos 2 dispositivos para comparar');
      return;
    }
    
    try {
      const response = await fetch(`/comparison/compare?ids=${mobileIdsInput.value}`);
      if (!response.ok) throw new Error('Error al comparar dispositivos');
      const devices = await response.json();
      displayComparisonResults(devices);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al comparar dispositivos');
    }
  });
  
  function displayComparisonResults(devices) {
    comparisonResults.innerHTML = '';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'device-cards-wrapper-comparison';
    
   const comparisonColors = ['blue-comparison', 'green-comparison', 'yellow-comparison'];
   
   devices.forEach((device, index) => {
    const colorClass = comparisonColors[index]; 
    const deviceCard = document.createElement('div');
    deviceCard.className = `device-card ${colorClass}`;

      deviceCard.innerHTML = `
        <h2 class="tittle2-comparison">${device.nombre}</h2>
        <div class="device-image">
          <img class="img-comparison" src="${device.imagen}" alt="${device.nombre}">
        </div>
        
        <div class="price-info">
          <span class="current-price">$${(Number(device.precio) * (1 - (device.descuento / 100))).toFixed(2)}</span>
          ${device.descuento > 0 ? `<span class="original-price">$${Number(device.precio).toFixed(2)}</span>` : ''}
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
      
      if (index < devices.length - 1) {
        const vsSeparator = document.createElement('div');
        vsSeparator.className = 'vs-separator-large-comparison';
        vsSeparator.innerHTML = '<span>VS</span>';
        wrapper.appendChild(vsSeparator);
      }
    });
    
    comparisonResults.appendChild(wrapper);
  }
});