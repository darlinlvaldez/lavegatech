const searchInput = document.getElementById("searchOrderInput");
const orders = document.querySelectorAll(".list-group-product");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  orders.forEach((order) => {
    const shipping = (order.dataset.shipping || "").toLowerCase();
    const id = order.dataset.orderId || "";
    const date = order.querySelector(".text-muted-user")?.textContent.toLowerCase() || "";

    const visible =
      shipping.includes(value) ||
      id.includes(value) ||
      date.includes(value);

    order.style.display = visible ? "block" : "none";
    console.log(shipping);
  });
});