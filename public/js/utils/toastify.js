export function showToast(message, type = "success", customIcon = null, duration = 3000) {
  if (typeof Toastify === "undefined") return;

  const icons = {
    success: "check-circle",
    error: "alert-circle",
    info: "info",
    warning: "alert-triangle",
  };

  const icon = customIcon || icons[type] || "info";

  Toastify({
    node: undefined,
    text: `<i data-feather="${icon}" style="margin-right:8px;"></i> ${message}
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>`,
    duration: duration,
    close: true,
    gravity: "top",
    position: "right",
    escapeMarkup: false,
    className: `toast-notification toast-${type}`,
  }).showToast();

  setTimeout(() => feather.replace(), 0);
}