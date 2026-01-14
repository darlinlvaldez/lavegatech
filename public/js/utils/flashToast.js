import { showToast } from '../utils/toastify.js';

document.addEventListener("DOMContentLoaded", () => {
  const toastData = sessionStorage.getItem("toastSuccess");

  if (toastData) {
    try {
      const { message, color, icon } = JSON.parse(toastData);
      showToast(message, color, icon);
    } finally {
      sessionStorage.removeItem("toastSuccess");
    }
  }
});