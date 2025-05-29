import { checkAuth } from './utils.js';

document.addEventListener("DOMContentLoaded", async function () {
  const orderProducts = document.querySelector(".order-products");
  const orderTotal = document.querySelector(".order-total");

  try {
    const authData = await checkAuth();

    if (!authData.authenticated) {
      orderProducts.innerHTML = "<p>Por favor inicia sesión para ver tu carrito.</p>";
      orderTotal.textContent = "$0.00";
      return;
    }

    const cartRes = await fetch("/cart/items", { credentials: "include" });
    const cartData = await cartRes.json();

    if (!cartData.success || !cartData.items || cartData.items.length === 0) {
      orderProducts.innerHTML = "<p>No hay productos en tu orden.</p>";
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
      <div>${item.cantidad}x ${item.nombre}${item.colorSeleccionado || ""}</div>
      <div>$${subtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</div>
      </div>`; 
    });

    orderTotal.textContent = `$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
} catch (error) {
    console.error("Error al cargar el carrito:", error);
    orderProducts.innerHTML = "<p>Error al cargar los productos. Por favor intenta nuevamente.</p>";
    orderTotal.textContent = "$0.00";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const paypalRadio = document.getElementById('payment-3');
  const paypalContainer = document.getElementById('paypal-button-container');
  let buttonRendered = false;

  const mostrarToast = (texto, tipo = "info") => {
    const colores = {
      info: "#007bff",
      error: "#dc3545",
      success: "#28a745",
      warning: "#ffc107",
    };
    Toastify({
      text: texto,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: colores[tipo] || "#007bff",
      stopOnFocus: true,
    }).showToast();
  };

  const validarCampos = () => {
    const fields = ['first-name', 'last-name', 'email', 'address', 'city', 'district', 'tel'];
    const missingFields = fields.filter(field => !document.querySelector(`input[name="${field}"]`)?.value.trim());
    
    if (missingFields.length) {
      mostrarToast('Complete todos los campos requeridos', 'warning');
      return false;
    }
    
    if (!document.getElementById('terms').checked) {
      mostrarToast('Debe aceptar los Políticas y condiciones', 'warning');
      return false;
    }
    
    return true;
  };

  const getFormData = () => ({
    nombre: document.querySelector('input[name="first-name"]').value.trim(),
    apellido: document.querySelector('input[name="last-name"]').value.trim(),
    email: document.querySelector('input[name="email"]').value.trim(),
    direccion: document.querySelector('input[name="address"]').value.trim(),
    ciudad: document.querySelector('input[name="city"]').value.trim(),
    distrito: document.querySelector('input[name="district"]').value.trim(),
    telefono: document.querySelector('input[name="tel"]').value.trim(),
    horario_entrega: document.getElementById('delivery-time').value,
    mensaje: document.querySelector('.order-notes textarea')?.value.trim() || ''
  });

  const handleApiError = async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la solicitud');
    }
    return response.json();
  };

  paypalRadio.addEventListener('change', () => {
    if (paypalRadio.checked && !buttonRendered) {
      if (!validarCampos()) {
        paypalRadio.checked = false;
        return;
      }

      paypal.Buttons({
        createOrder: (data, actions) => 
          fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(getFormData())
          })
          .then(handleApiError)
          .then(data => {
            if (!data.success) throw new Error(data.message || 'Error al crear la orden');
            window.currentOrderId = data.orderId;
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: data.total.toFixed(2),
                  currency_code: 'USD',
                  description: `Orden #${data.orderId}`
                }
              }]
            });
          }),

        onApprove: (data, actions) => 
          actions.order.capture()
            .then(details => fetch(`/api/order/${window.currentOrderId}/payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                paymentMethod: 'paypal',
                paymentDetails: details,
                payerId: details.payer.payer_id,
                paymentId: details.id
              })
            }))
            .then(handleApiError)
            .then(data => {
              if (!data.success) throw new Error(data.message || 'Error al registrar el pago');
              mostrarToast("¡Pago completado con éxito!", 'success');
              setTimeout(() => window.location.href = data.redirectUrl || `/orders/${window.currentOrderId}`, 3000);
            })
            .catch(error => {
              console.error('Error:', error);
              mostrarToast(`Error: ${error.message}`, 'error');
            }),

        onError: err => {
          console.error('Error en el pago con PayPal:', err);
          mostrarToast('Ocurrió un error al procesar el pago con PayPal', 'error');
        }

      }).render('#paypal-button-container');
      
      buttonRendered = true;
    }
  });
});