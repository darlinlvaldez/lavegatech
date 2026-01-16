export function showToast(message, type = "success", customIcon = null, duration = 3000) {
  if (typeof Toastify === "undefined") return;

  const icons = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-circle-xmark",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-triangle-exclamation",
    edit: "fa-solid fa-pen-to-square",
  };

  const icon = customIcon || icons[type] || "fa-solid fa-circle-info";

  Toastify({
    text: `
      <i class="${icon}" style="margin-right:8px;"></i>
      ${message}
      <div class="toast-progress" style="animation-duration:${duration}ms;"></div>
    `,
    duration,
    close: true,
    gravity: "top",
    position: "right",
    escapeMarkup: false,
    className: `toast-notification toast-${type}`,
  }).showToast();
}
