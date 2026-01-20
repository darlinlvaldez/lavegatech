export function showValidation(errors, formSelector = "") {
  errors.forEach((error) => {
    const field = typeof error.path === "string" ? error.path : error.path[0];

    const input = document.querySelector(`${formSelector} [name="${field}"]`);
    const errorText = document.querySelector(`${formSelector} .error-text[data-error-for="${field}"]`);

    if (input) input.classList.add("input-error");
    if (errorText) {
      errorText.innerHTML = `
        <i class="fa-solid fa-circle-exclamation" color: #e74c3c;"></i>
        ${error.message}
      `;
      errorText.classList.add("visible", "field-error");
    }
  });
}

export function clearError(fields, formSelector = "") {
  fields.forEach((name) => {
    const input = document.querySelector(
      `${formSelector} [name="${name}"]`
    );
    const errorText = document.querySelector(
      `${formSelector} .error-text[data-error-for="${name}"]`
    );

    if (!input || !errorText) return;

    input.addEventListener("input", () => {
      input.classList.remove("input-error");
      errorText.classList.remove("visible");
    });
  });
}