document.addEventListener('DOMContentLoaded', () => {
  const resendForm = document.getElementById('resendForm');
  const resendButton = document.getElementById('resendButton');
  const cooldownTimer = document.getElementById('cooldown-timer');
  const emailInput = resendForm.querySelector('input[name="email"]');
  let countdownInterval;

  const getCooldownKey = (email) => `cooldown_${email}`;

  const getRemainingSeconds = (email) => {
    const expiresAt = localStorage.getItem(getCooldownKey(email));
    if (!expiresAt) return 0;
    const diff = Math.floor((parseInt(expiresAt, 10) - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  };

  const setCooldown = (email, seconds) => {
    const expiresAt = Date.now() + seconds * 1000;
    localStorage.setItem(getCooldownKey(email), expiresAt.toString());
  };

  const clearCooldown = (email) => {
    localStorage.removeItem(getCooldownKey(email));
  };

  const updateUI = (enabled) => {
    resendButton.disabled = !enabled;
    cooldownTimer.style.display = enabled ? 'none' : 'block';
  };

  const startCountdown = (email, seconds) => {
    setCooldown(email, seconds);
    updateUI(false);

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      const remaining = getRemainingSeconds(email);
      cooldownTimer.textContent = `Espera ${remaining} segundos para reenviar`;

      if (remaining <= 0) {
        clearInterval(countdownInterval);
        clearCooldown(email);
        updateUI(true);
      }
    }, 1000);
  };

  const showToast = (message, success = true) => {
    Toastify({
      text: `<span style="display: flex; align-items: center;"><i data-feather="check-circle" style="margin-right: 8px;"></i>${message}</span>`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      backgroundColor: success ? "#4CAF50" : "#f44336",
      escapeMarkup: false,
      className: "toast-notification"
    }).showToast();
    setTimeout(feather.replace, 100);
  };

  emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    const remaining = getRemainingSeconds(email);
    if (remaining > 0) {
      startCountdown(email, remaining);
    } else {
      updateUI(true);
    }
  });

  const initialEmail = emailInput.value.trim();
  const initialRemaining = getRemainingSeconds(initialEmail);
  if (initialRemaining > 0) startCountdown(initialEmail, initialRemaining);

  resendForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    updateUI(false);

    try {
      const response = await fetch(resendForm.action, {
        method: 'POST',
        body: new FormData(resendForm),
        headers: { 'Accept': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        if (result.cooldown) startCountdown(email, result.cooldown);
        showToast('Código reenviado con exito');
      } else {
        cooldownTimer.textContent = result.error || 'Error desconocido';
        if (result.cooldown) startCountdown(email, result.cooldown);
        else setTimeout(() => updateUI(true), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      cooldownTimer.textContent = 'Error al reenviar el código';
      setTimeout(() => updateUI(true), 3000);
    }
  });
});