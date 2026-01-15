import { showToast } from '../utils/toastify.js';

document.addEventListener("DOMContentLoaded", () => {
  const toastData = sessionStorage.getItem("toastSuccess");
  if (toastData) {
    try {
      const { message, type, icon } = JSON.parse(toastData);
      showToast(message, type, icon);
    } finally {
      sessionStorage.removeItem("toastSuccess");
    }
  }
});