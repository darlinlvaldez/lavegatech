import { showToast } from "./toastify.js";
import { showValidation, clearError } from "./showValidation.js";

window.openModal = openModal;
window.closeModal = closeModal;

function showNotification(message, isSuccess) {
  const color = isSuccess ? "#4CAF50" : "#f44336";
  const icon = isSuccess ? "check-circle" : "x-circle";
  showToast(message, color, icon);
}

const formTemplates = {
  username: `
  <label class="text-modal">Nuevo nombre:</label>
  <input class="modal-input" type="text" name="newUsername" placeholder="Ingresa tu nuevo nombre">
  <div class="error-text" data-error-for="newUsername"></div>
`,

  email: `
  <label class="text-modal">Nuevo correo:</label>
  <input class="modal-input" type="email" name="newEmail" placeholder="ejemplo@gmail.com" required>
  <div class="error-text" data-error-for="newEmail"></div>
`,

  password: `
  <label class="text-modal">Contraseña actual:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="passwordInput" name="oldPassword" placeholder="Tu contraseña actual" required>
    <i id="eyeIconPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('password')"></i>
  </div>
  <div class="error-text" data-error-for="oldPassword"></div>

  <label class="text-modal">Nueva contraseña:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="newPasswordInput" name="newPassword" placeholder="Nueva contraseña" required>
    <i id="eyeIconNewPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('new')"></i>
  </div>
  <div class="error-text" data-error-for="newPassword"></div>

  <label class="text-modal">Confirmar nueva contraseña:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="confirmPasswordInput" name="confirmPassword" placeholder="Repite la nueva contraseña" required>
    <i id="eyeIconConfirmPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('confirm')"></i>
  </div>
  <div class="error-text" data-error-for="confirmPassword"></div>
`,
};

const titles = {username: 'Editar Nombre', email: 'Editar Correo', password: 'Editar Contraseña', 'verify-email': 'Verificar Código'};

const urls = {username: '/user/update-username', email: '/user/update-email', password: '/user/update-password', 'verify-email': '/user/verify-email-code'};

function openModal(type) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('modal-form');

  form.dataset.type = type;
  title.innerText = titles[type];
  form.innerHTML = formTemplates[type] || '';

  const submitButton = document.getElementById("submit-button");
  submitButton.textContent = type === "email" || type === "verify-email" ? "Enviar" : "Guardar";

  modal.style.display = 'flex';
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
}

async function openCodeModal(newEmail) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const form = document.getElementById("modal-form");
  const resendBtn = document.getElementById("resend-code-btn");
  const verificationMsg = document.getElementById("verification-message");

  form.dataset.type = "verify-email";
  title.innerText = titles["verify-email"];
  form.innerHTML = `
    <label class="text-modal">Código de verificación:</label>
    <input class="modal-input" type="text" name="codeInput" placeholder="Introduce el código" required>
    <input type="hidden" name="newEmail" value="${newEmail}">
  `;

  verificationMsg.style.display = "block";
  verificationMsg.innerHTML = `Te hemos enviado un código de verificación a <strong>${newEmail}</strong>`;

  resendBtn.style.display = "block";

  const timerResponse = await fetch(
    `/user/resend-email-timer?email=${encodeURIComponent(newEmail)}`
  );
  const { resendTimer } = await timerResponse.json();

  if (resendTimer > 0) {
    disableResendButton(resendBtn, resendTimer);
  } else {
    try {
      const response = await fetch("/user/resend-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, type: "profile" }),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification("Código enviado exitosamente", true);
        disableResendButton(resendBtn, result.resendTimer);
      } else {
        showNotification(result.error || "Error al enviar el código", false);
      }
    } catch (error) {
      showNotification("Error de red al enviar código", false);
    }
  }

  resendBtn.onclick = async () => {
    try {
      if (type === "email") {
        const timerCheck = await fetch(`/user/resend-email-timer?email=${encodeURIComponent(data.newEmail)}`);
        const { resendTimer } = await timerCheck.json();

        if (resendTimer > 0) {
          showNotification(`Ya se envió un código. Espera ${resendTimer} segundos.`, false);
          openCodeModal(data.newEmail); 
          return;
        }
      }
      const result = await response.json();

      if (response.ok) {
        showNotification("Código reenviado exitosamente", true);
        verificationMsg.innerHTML = `Te hemos enviado un nuevo código de verificación a <strong>${newEmail}</strong>`;
        disableResendButton(resendBtn, result.resendTimer);
      } else {
        showNotification(result.error || "Error al reenviar el código", false);
      }
    } catch (error) {
      showNotification("Error de red: " + error.message, false);
    }
  };

  modal.style.display = "flex";
}

let resendIntervalId = null; 

function disableResendButton(button, seconds) {
  button.disabled = true;
  const originalText = button.innerText;

  if (resendIntervalId !== null) {
    clearInterval(resendIntervalId);
    resendIntervalId = null;
  }

  resendIntervalId = setInterval(() => {
    if (seconds > 0) {
      button.innerText = `Espera ${seconds--}s`;
    } else {
      clearInterval(resendIntervalId);
      resendIntervalId = null;
      button.disabled = false;
      button.innerText = originalText;
    }
  }, 1000);
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('resend-code-btn').style.display = 'none';
  document.getElementById('verification-message').style.display = 'none';
  document.body.style.overflow = '';
  document.body.style.paddingRight = ''; 
}

document.getElementById("modal-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const { type } = form.dataset;
  const data = Object.fromEntries(new FormData(form));

  clearError(Object.keys(data), "#modal-form");

  try {
    const response = await fetch(urls[type], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (type === "email") {
        openCodeModal(data.newEmail);
        return;
      }

      showNotification(responseData.message || "Actualizado con éxito", true);
      setTimeout(() => {closeModal();
        window.location.href = responseData.redirectUrl || "/account";
      }, 2000);
    } else {
      if (responseData.validationError && Array.isArray(responseData.errors)) {
        showValidation(responseData.errors, "#modal-form");
      } else {
        showNotification(
          responseData.error || responseData.message || "Error desconocido",
          false);
      }
      if (
        type === "email" && response.status === 429 && responseData.resendTimer
      ) {
        openCodeModal(data.newEmail);
      }
    }
  } catch (error) {
    showNotification(error.message || "Error de red", false);
    closeModal();
  }
});