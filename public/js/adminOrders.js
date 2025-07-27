import { showToast } from './toastify.js';

const searchInput = document.getElementById("searchPedidosInput");
const pedidos = document.querySelectorAll(".list-group-product");

searchInput.addEventListener("input", () => {
  const valor = searchInput.value.toLowerCase();

  pedidos.forEach((pedido) => {
    const texto = pedido.textContent.toLowerCase();
    const status = pedido.dataset.status || "";
    const envio = pedido.dataset.envio || "";
    
    const visible = 
      texto.includes(valor) || 
      status.includes(valor) || 
      envio.includes(valor);

    pedido.style.display = visible ? "block" : "none";
  });
});

document.querySelectorAll(".order-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    const isInsideSelect = event.target.closest(".estado-envio-select");
    if (isInsideSelect) {
      event.preventDefault();
    }
  });
});

document.querySelectorAll(".estado-envio-select").forEach((select) => {
  select.addEventListener("change", async function () {
    const orderId = this.dataset.orderId;
    const nuevoEstado = this.value;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/estado-envio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado_envio: nuevoEstado }),
      });

      if (!res.ok) throw new Error("Error al actualizar el estado");

      showToast("Estado actualizado.", "#27ae60", "check-circle");
    } catch (err) {
      showToast("Error al actualizar el estado.", "#e74c3c", "alert-circle");
      console.error(err);
    }
  });
});