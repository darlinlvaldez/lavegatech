import { showToast } from "../../utils/toastify.js";

document.addEventListener('DOMContentLoaded', () => {
  const resendForm = document.getElementById('resendForm');
  const resendButton = document.getElementById('resendButton');
  const cooldownTimer = document.getElementById('cooldown-timer');
  let countdownInterval;

  const updateUI = (enabled) => {
    resendButton.disabled = !enabled;
    cooldownTimer.style.display = enabled ? 'none' : 'block';
  };

  const startCountdown = (seconds) => {
    updateUI(false);

    let remaining = seconds;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      cooldownTimer.textContent = `Espera ${remaining} segundos para reenviar`;

      if (--remaining <= 0) {
        clearInterval(countdownInterval);
        updateUI(true);
      }
    }, 1000);
  };

  const initialCooldown = window.initialCooldown || 0;
  if (initialCooldown > 0) {
    startCountdown(initialCooldown);
  } else {
    updateUI(true);
  }

  resendForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateUI(false);

    try {
      const response = await fetch(resendForm.action, {
        method: 'POST',
        body: new FormData(resendForm),
        headers: { 'Accept': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        if (result.cooldown) startCountdown(result.cooldown);
        showToast('Código reenviado con éxito');
      } else {
        cooldownTimer.textContent = result.error || 'Error desconocido';
        if (result.cooldown) startCountdown(result.cooldown);
        else setTimeout(() => updateUI(true), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      cooldownTimer.textContent = 'Error al reenviar el código';
      setTimeout(() => updateUI(true), 3000);
    }
  });
});