import { showToast } from "../utils/toastify.js";

document.addEventListener("DOMContentLoaded", async function () {
  const orderProducts = document.querySelector(".order-products");
  const orderTotal = document.querySelector(".order-total");

  try {
    const cartRes = await fetch("/cart/items", { credentials: "include" });
    const cartData = await cartRes.json();

    if (!cartData.success || !cartData.items || cartData.items.length === 0) {
      orderProducts.innerHTML = "<p>No hay productos disponibles en tu orden.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    const stockRes = await fetch("/cart/stock?bulk=true", { credentials: "include" });
    const stockData = await stockRes.json();

    if (!stockData.success || !stockData.stocks) {
      orderProducts.innerHTML = "<p>Error al validar el stock.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    const stockInfo = stockData.stocks;

    const validItems = cartData.items.filter(item => {
      const key = `${item.producto_id}_${item.colorSeleccionado}`;
      const stock = stockInfo[key] ?? 0;
      return stock > 0;
    });

    if (validItems.length === 0) {
      orderProducts.innerHTML = "<p>No hay productos disponibles en tu orden.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    let total = 0;
    orderProducts.innerHTML = "";

    validItems.forEach((item) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      orderProducts.innerHTML += `
        <div class="order-col">
          <div>${item.cantidad}x ${item.nombre} ${item.especificaciones || ""} ${item.colorSeleccionado.toUpperCase()}</div>
          <div>$${formatPrice(subtotal)}</div>
        </div>`;
    });

    orderTotal.textContent = `$${formatPrice(total)}`;
    orderTotal.dataset.subtotal = total;

  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    orderProducts.innerHTML = "<p>Error al cargar los productos. Por favor intenta nuevamente.</p>";
    orderTotal.textContent = "$0.00";
  }
});

  const mostrarToast = (texto, tipo = "info") => {
    const colores = {
      info: "#0d6efd",
      error: "#dc3545",
      success: "#198754",
      warning: "#ffc107",
    };

    const iconos = {
      info: "info",
      error: "x-circle",
      success: "check-circle",
      warning: "alert-triangle",
    };

    const color = colores[tipo] || colores.info;
    const icon = iconos[tipo] || iconos.info;

    showToast(texto, color, icon);
  };

  const getFormData = () => {
  const usarOtraDireccion = document.getElementById("shiping-address")?.checked;

  const getValue = (name, isAlt = false) => {
    const prefix = isAlt ? "alt-" : "";
    const input = document.querySelector(`[name="${prefix}${name}"]`);
    return input?.value.trim() || "";
  };

  const getTel = (isAlt = false) => {
    const prefix = isAlt ? "alt-" : "";
    const input = document.querySelector(`[name="${prefix}tel"]`);
    return input?.value.replace(/\D/g, "") || "";
  };

  const getCiudad = (isAlt = false) => {
    const id = isAlt ? "alt-city-select" : "city-select";
    const select = document.getElementById(id);
    return select?.value || "";
  };

  const alt = usarOtraDireccion;

  return {
    nombre: getValue("first-name", alt),
    apellido: getValue("last-name", alt),
    email: getValue("email", alt),
    direccion: getValue("address", alt),
    ciudad_envio_id: getCiudad(alt),
    distrito: getValue("district", alt),
    telefono: getTel(alt),
    envio_diferente: usarOtraDireccion ? 1 : 0
  };
};

const clearErrors = () => {
  document.querySelectorAll('.input-error').forEach(input => {
    input.classList.remove('input-error');
  });
  
  document.querySelectorAll('.error-text').forEach(errorContainer => {
    errorContainer.textContent = '';
    errorContainer.classList.remove('visible');
  });
};

const setupInputErrorClearing = () => {
  const inputNames = [
    "first-name", "last-name", "email", "address", "district", "tel", "ciudad_envio_id",
    "alt-first-name", "alt-last-name", "alt-email", "alt-address", "alt-district", "alt-tel", "alt-ciudad_envio_id"
  ];

  inputNames.forEach(name => {
    const input = document.querySelector(`[name="${name}"]`);
    const errorContainer = document.querySelector(`.error-text[data-error-for="${name}"]`);
    
    input?.addEventListener('input', () => {
      input.classList.remove('input-error');
      if (errorContainer) {
        errorContainer.textContent = '';
        errorContainer.classList.remove('visible');
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupInputErrorClearing();
  lastOrder();
  const paypalRadio = document.getElementById("payment-3");
  const paypalContainer = document.getElementById("paypal-button-container");
  let buttonRendered = false;

  const formatPhoneNumber = (value) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10) digits = digits.slice(0, 10);

  let formatted = "";
  if (digits.length > 0) {
    formatted += `(${digits.substring(0, 3)}`;
  }
  if (digits.length >= 4) {
    formatted += `) ${digits.substring(3, 6)}`;
  }
  if (digits.length >= 7) {
    formatted += `-${digits.substring(6, 10)}`;
  }
  return formatted;
};

const telInput = document.querySelector('input[name="tel"]');
telInput?.addEventListener("input", (e) => {
  e.target.value = formatPhoneNumber(e.target.value);
});

const altTelInput = document.querySelector('input[name="alt-tel"]');
altTelInput?.addEventListener("input", (e) => {
  e.target.value = formatPhoneNumber(e.target.value);
});

  const validateConditions = () => {
     clearErrors();
    if (!document.getElementById("terms").checked) {
      mostrarToast("Debe aceptar los Políticas y condiciones", "warning");
      return false;
    }

    return true;
  };

  const showValidation = (errores) => {
  const usarOtraDireccion = document.getElementById("shiping-address")?.checked;

  const pathToInputName = {
    nombre: "first-name",
    apellido: "last-name",
    email: "email",
    direccion: "address",
    ciudad_envio_id: "ciudad_envio_id",
    distrito: "district",
    telefono: "tel",
  };

  errores.forEach((error) => {
    const baseName = pathToInputName[error.path];
    const inputName = usarOtraDireccion ? `alt-${baseName}` : baseName;

    const input = document.querySelector(`input[name="${inputName}"], select[name="${inputName}"]`);
    const errorFieldName = usarOtraDireccion ? `alt-${baseName}` : baseName;
    const errorContainer = document.querySelector(`.error-text[data-error-for="${errorFieldName}"]`);

    if (input) {
      input.classList.add("input-error");
    }

    if (errorContainer) {
      errorContainer.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${error.message}`;
      errorContainer.classList.add("visible");
    }
  });
};

  const handleApiError = async (response) => {
    const data = await response.json();

    if (!response.ok) {
      if (data.validationError && data.errors) {
        showValidation(data.errors);
      } else {
        mostrarToast(data.error || "Error en la solicitud", "error");
      }
      throw new Error(data.error || "Error en la solicitud");
    }

    return data;
  };

  paypalRadio.addEventListener("change", () => {
    if (paypalRadio.checked && !buttonRendered) {

      paypal.Buttons({
        createOrder: (data, actions) => {
          if (!validateConditions()) {
            return Promise.reject(); 
          }

          const subtotal = parseFloat(orderTotal.dataset.subtotal || "0");
          if (subtotal === 0) {
            mostrarToast("No hay productos seleccionados en tu carrito", "error");
            return Promise.reject();
          }

          return fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(getFormData()),
          })
          .then(handleApiError)
          .then(async(data) => {
            if (!data.success) {
              throw new Error(data.message || "Error al crear la orden"); 
            }

            window.currentOrderData = {
              orderData: data.orderData,
              orderItems: data.orderItems,
            };

            const tasaCambio = await fetch('/api/order/exchange-rate').then(res => res.json()).then(data => data.rate);

            const totalEnDolares = (data.totalPesos * tasaCambio).toFixed(2);

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalEnDolares,
                    currency_code: "USD",
                  },
                  description: "Compra en tu tienda",
                },
              ],
            });
          });
        },

    onApprove: (data, actions) =>
      actions.order.capture().then((details) =>
          fetch(`/api/order/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              orderData: window.currentOrderData.orderData,
              orderItems: window.currentOrderData.orderItems,
              paymentMethod: "paypal",
              paymentDetails: details,
              payerId: details.payer.payer_id,
              paymentId: details.id,
              pagadoDolares: parseFloat(details.purchase_units[0].amount.value)}),
            })
          )
          .then(handleApiError).then((data) => {
            if (!data.success) throw new Error(data.message);
            mostrarToast("¡Pago completado con éxito!", "success");
            clearErrors();

            setTimeout( () => (window.location.href = data.redirectUrl), 3000);
          })
          .catch((error) => {
            console.error("Error:", error);
            mostrarToast(`Error: ${error.message}`, "error");
          }), 
        
          onError: (err) => {
          console.error("Error en el pago con PayPal:", err);
          mostrarToast("Ocurrió un error al procesar el pago con PayPal", "error");
          },
        }).render("#paypal-button-container");

      buttonRendered = true;
    }
  });
});

let ciudades = [];
let costoEnvio = 0;

const citySelect = document.getElementById("city-select");
const orderTotal = document.querySelector(".order-total");
const shippingCostEl = document.getElementById("shipping-cost");
const altCitySelect = document.getElementById("alt-city-select");

async function loadCities() {
  try {
    const res = await fetch("/api/order/cities");
    const data = await res.json();
    if (!data.success) return;

    ciudades = data.ciudades;

    ciudades.forEach((ciudad) => {
      const option = document.createElement("option");
      option.value = ciudad.id;
      option.textContent = `${ciudad.nombre} (+$${ciudad.costo_envio})`;
      option.dataset.costo = ciudad.costo_envio;

      citySelect?.appendChild(option.cloneNode(true));
      altCitySelect?.appendChild(option.cloneNode(true));
    });
  } catch (error) {
    console.error("Error cargando ciudades:", error);
  }
}

ciudades.forEach((ciudad) => {
  const option = document.createElement("option");
  option.value = ciudad.id;
  option.textContent = `${ciudad.nombre} (+$${ciudad.costo_envio})`;
  option.dataset.costo = ciudad.costo_envio;

  citySelect?.appendChild(option.cloneNode(true));
  altCitySelect?.appendChild(option);
});

citySelect?.addEventListener("change", () => {
  const selectedOption = citySelect.options[citySelect.selectedIndex];
  costoEnvio = parseFloat(selectedOption.dataset.costo || "0");

  if (shippingCostEl) {
    shippingCostEl.textContent = `$${formatPrice(costoEnvio)}`;
  }

  actualizarTotalConEnvio();
});

function actualizarTotalConEnvio() {
  const subtotal = parseFloat(orderTotal.dataset.subtotal || "0");
  const totalConEnvio = subtotal + costoEnvio;
  orderTotal.textContent = `$${formatPrice(totalConEnvio)}`;
}

citySelect?.addEventListener("change", handleCityChange);
altCitySelect?.addEventListener("change", handleCityChange);

function handleCityChange(e) {
  const selectedOption = e.target.options[e.target.selectedIndex];
  costoEnvio = parseFloat(selectedOption.dataset.costo || "0");
  if (shippingCostEl) {
    shippingCostEl.textContent = `$${formatPrice(costoEnvio)}`;
  }
  actualizarTotalConEnvio();
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("shiping-address");
  const caption = document.querySelector(".input-checkbox .caption");
  const billing = document.querySelector(".billing-details");

  const toggleForms = () => {
    const mostrarAlt = checkbox.checked;
    caption.style.display = mostrarAlt ? "block" : "none";
    billing.style.display = mostrarAlt ? "none" : "block";
  };

  checkbox?.addEventListener("change", toggleForms);
  toggleForms(); 
});

async function lastOrder() {
  try {
    const res = await fetch("/api/order/last", { credentials: "include" });
    const data = await res.json();

    if (data.success && data.lastOrder) {
      const lastOrder = data.lastOrder;

      const checkbox = document.getElementById("shiping-address");
      if (checkbox) {
        checkbox.checked = false;
      }

      const setInputValue = (name, value) => {
        const input = document.querySelector(`[name="${name}"]`);
        if (input) input.value = value || "";
      };

      setInputValue("first-name", lastOrder.nombre);
      setInputValue("last-name", lastOrder.apellido);
      setInputValue("email", lastOrder.email);
      setInputValue("address", lastOrder.direccion);
      setInputValue("district", lastOrder.distrito);
      setInputValue("tel", lastOrder.telefono);

      const citySelect = document.getElementById("city-select");
      if (citySelect) {
        citySelect.value = lastOrder.ciudad_envio_id || "";
        citySelect.dispatchEvent(new Event("change"));
      }
    }
  } catch (error) {
    console.error("Error cargando último pedido:", error);
  }
}

loadCities();