import { showToast } from '../../utils/toastify.js';

const searchInput = document.getElementById("searchPedidosInput");
const pedidos = document.querySelectorAll(".list-group-product");

searchInput.addEventListener("input", () => {
  const valor = searchInput.value.toLowerCase().trim();

  pedidos.forEach((pedido) => {
    const envio = (pedido.dataset.envio || "").toLowerCase();
    const id = pedido.dataset.orderId || "";
    const direccion = pedido.querySelector(".text-muted-user")?.textContent.toLowerCase() || "";

    const visible =
      envio.includes(valor) ||
      id.includes(valor) ||
      direccion.includes(valor);

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
    const pedido_id = this.dataset.pedido_id;
    const nuevoEstado = this.value;

    try {
      const res = await fetch(`/api/admin/orders/${pedido_id}/estado-envio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado_envio: nuevoEstado }),
      });

      if (!res.ok) throw new Error();

      this.closest(".list-group-product").dataset.envio = nuevoEstado;

      showToast("Estado actualizado.", "#27ae60", "check-circle");
    } catch (err) {
      showToast("Error al actualizar el estado.", "#e74c3c", "alert-circle");
    }
  });
});