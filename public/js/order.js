import { getRealStock } from './utils.js';
import { showToast } from "./toastify.js";

document.addEventListener("DOMContentLoaded", async function () {
  const orderProducts = document.querySelector(".order-products");
  const orderTotal = document.querySelector(".order-total");

  try {

    const cartRes = await fetch("/cart/items", { credentials: "include" });
    const cartData = await cartRes.json();

    if (!cartData.success || !cartData.items || cartData.items.length === 0) {
      orderProducts.innerHTML = "<p>No hay productos en tu orden.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    const validItems = await Promise.all(cartData.items.map(async item => {
      const stock = await getRealStock(item.producto_id, item.colorSeleccionado);
      return stock > 0 ? item : null;
    })).then(items => items.filter(Boolean));

    if (validItems.length === 0) {
      orderProducts.innerHTML = "<p>No hay productos disponibles en tu orden.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    let total = 0;
    orderProducts.innerHTML = "";

    cartData.items.forEach((item) => {
      const precioFinal = item.descuento > 0 ? item.precio * (1 - item.descuento / 100) : item.precio;

      const subtotal = precioFinal * item.cantidad;
      total += subtotal;

      orderProducts.innerHTML += ` <div class="order-col">
      <div>${item.cantidad}x ${item.nombre} ${item.colorSeleccionado.toUpperCase()}</div>
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

document.addEventListener("DOMContentLoaded", () => {
  const paypalRadio = document.getElementById("payment-3");
  const paypalContainer = document.getElementById("paypal-button-container");
  let buttonRendered = false;

  const telInput = document.querySelector('input[name="tel"]');
  telInput?.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) value = value.slice(0, 10);

    let formatted = "";
    if (value.length > 0) {
      formatted += `(${value.substring(0, 3)}`;
    }
    if (value.length >= 4) {
      formatted += `) ${value.substring(3, 6)}`;
    }
    if (value.length >= 7) {
      formatted += `-${value.substring(6, 10)}`;
    }

    e.target.value = formatted;
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

  const getFormData = () => ({
    nombre: document.querySelector('input[name="first-name"]').value.trim(),
    apellido: document.querySelector('input[name="last-name"]').value.trim(),
    email: document.querySelector('input[name="email"]').value.trim(),
    direccion: document.querySelector('input[name="address"]').value.trim(),
    ciudad: document.querySelector('input[name="city"]').value.trim(),
    distrito: document.querySelector('input[name="district"]').value.trim(),
    telefono: document.querySelector('input[name="tel"]').value.replace(/\D/g, ""),
    ciudad_envio_id: document.getElementById("city-select").value

  });

  const inputFields = () => ["first-name", "last-name", "email",
  "address", "city", "district", "tel" ];

  const clearInput = () => {
    inputFields().forEach((name) => {
      const input = document.querySelector(`input[name="${name}"]`);
      const errorContainer = document.querySelector(`.error-text[data-error-for="${name}"]`);

      if (input) {
        input.addEventListener("input", () => {
          input.classList.remove("input-error");
          if (errorContainer) errorContainer.textContent = "";
        });
      }
    });
  };

  const validateConditions = () => {
    if (!document.getElementById("terms").checked) {
      mostrarToast("Debe aceptar los Políticas y condiciones", "warning");
      return false;
    }

    return true;
  };

  const showValidation = (errores) => {
    errores.forEach((error) => {
      const pathToInputName = {
        nombre: "first-name",
        apellido: "last-name",
        email: "email",
        direccion: "address",
        ciudad: "city",
        distrito: "district",
        telefono: "tel",
      };

      const inputName = pathToInputName[error.path];
      if (inputName) {
        const input = document.querySelector(`input[name="${inputName}"]`);
        const errorContainer = document.querySelector(
          `.error-text[data-error-for="${inputName}"]`);

        if (input) {
          input.classList.add("input-error");
        }

        if (errorContainer) {
          errorContainer.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${error.message}`;
          errorContainer.classList.add("visible");
        }
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
          return fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(getFormData()),
          })
          .then(handleApiError).then((data) => {
            if (!data.success)
              throw new Error(data.message || "Error al crear la orden"); 
            
            window.currentOrderData = {
              orderData: data.orderData,
              orderItems: data.orderItems,
            };

            return actions.order.create({
              purchase_units: [
                {amount: {value: data.total.toFixed(2),
                  currency_code: "USD",
                  description: "Compra en tu tienda"},
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
              paymentId: details.id}),
            })
          )
          .then(handleApiError).then((data) => {
            if (!data.success) throw new Error(data.message);
            mostrarToast("¡Pago completado con éxito!", "success");
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
      clearInput();
    }
  });
});

let ciudades = [];
let costoEnvio = 0;

const citySelect = document.getElementById("city-select");
const orderTotal = document.querySelector(".order-total");

async function cargarCiudades() {
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
      citySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error cargando ciudades:", error);
  }
}

citySelect?.addEventListener("change", () => {
  const selectedOption = citySelect.options[citySelect.selectedIndex];
  costoEnvio = parseFloat(selectedOption.dataset.costo || "0");

  actualizarTotalConEnvio();
});

function actualizarTotalConEnvio() {
  const subtotal = parseFloat(orderTotal.dataset.subtotal || "0");
  const totalConEnvio = subtotal + costoEnvio;
  orderTotal.textContent = `$${totalConEnvio.toFixed(2)}`;
}

cargarCiudades();