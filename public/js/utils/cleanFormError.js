function clearError(formSelector = "form") {
  const inputs = document.querySelectorAll(
    `${formSelector} [data-error-input]`
  );

  inputs.forEach(input => {
    const name = input.name;
    const errorText = document.querySelector(
      `${formSelector} .error-text[data-error-for="${name}"]`
    );

    if (!errorText) return;

    input.addEventListener("input", () => {
      input.classList.remove("input-error");
      errorText.classList.remove("visible");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  clearError("form");
});