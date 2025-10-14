export function showToast(message, Color = "#27ae60", icon = "check-circle") {
  Toastify({
    text: `<i data-feather="${icon}" style="vertical-align: middle; margin-right: 8px;"></i> ${message}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: Color },
    escapeMarkup: false,
    className: "toast-notification",
  }).showToast();

setTimeout(() => {
    feather.replace();
  }, 100);
}