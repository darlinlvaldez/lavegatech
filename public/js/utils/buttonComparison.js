document.addEventListener("DOMContentLoaded", () => {
  const compareButtons = document.querySelectorAll(".add-to-compare");

  compareButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = button.dataset.id;
      if (!productId) return;

      window.location.href = `/comparison?ids=${productId}`;
    });
  });
});