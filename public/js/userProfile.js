function showNotification(message, isSuccess) {
  const icon = document.createElement("i");
  icon.setAttribute("data-feather", isSuccess ? "check-circle" : "x-circle");
  icon.style.verticalAlign = "middle";
  icon.style.marginRight = "8px";

  const span = document.createElement("span");
  span.appendChild(icon);
  span.appendChild(document.createTextNode(message));

  Toastify({
    node: span,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: isSuccess ? "#4CAF50" : "#f44336",
    stopOnFocus: true,
    className: "toast-notification"
  }).showToast();

  setTimeout(() => {
    feather.replace();
  }, 100);
}

const formTemplates = {username: `<label class="text-modal">Nuevo nombre:</label>
  <input class="modal-input" type="text" name="newUsername" placeholder="Ingresa tu nuevo nombre" required>`,

  email: `<label class="text-modal">Nuevo correo:</label> 
  <input class="modal-input" type="email" name="newEmail" placeholder="ejemplo@gmail.com" required>`,

  password: `<label class="text-modal">Contraseña actual:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="passwordInput" name="oldPassword" placeholder="Tu contraseña actual" required>
    <i id="eyeIconPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('password')"></i>
  </div>

  <label class="text-modal">Nueva contraseña:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="newPasswordInput" name="newPassword" placeholder="Nueva contraseña" required>
    <i id="eyeIconNewPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('new')"></i>
  </div>

  <label class="text-modal">Confirmar nueva contraseña:</label>
  <div class="password-wrapper">
    <input class="modal-input" type="password" id="confirmPasswordInput" name="confirmPassword" placeholder="Repite la nueva contraseña" required>
    <i id="eyeIconConfirmPassword" class="fa fa-eye-slash eye-icon toggle-password" onclick="togglePassword('confirm')"></i>
  </div>`};

const titles = {username: 'Editar Nombre', email: 'Editar Correo', password: 'Editar Contraseña', 'verify-email': 'Verificar Código'};

const urls = {username: '/user/update-username', email: '/user/update-email', password: '/user/update-password', 'verify-email': '/user/verify-email-code'};

function openModal(type) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('modal-form');

  form.dataset.type = type;
  title.innerText = titles[type];
  form.innerHTML = formTemplates[type] || '';

  modal.style.display = 'flex';
}

async function openCodeModal(newEmail) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('modal-form');
  const resendBtn = document.getElementById('resend-code-btn');
  const verificationMsg = document.getElementById('verification-message');

  form.dataset.type = 'verify-email';
  title.innerText = titles['verify-email'];
  form.innerHTML = `
    <label class="text-modal">Código de verificación:</label>
    <input class="modal-input" type="text" name="codeInput" placeholder="Introduce el código" required>
    <input type="hidden" name="newEmail" value="${newEmail}">
  `;

  verificationMsg.style.display = 'block';
  verificationMsg.innerHTML = `Te hemos enviado un código de verificación a <strong>${newEmail}</strong>`;

  resendBtn.style.display = 'block';
  resendBtn.disabled = false;
  
  const resendTimerKey = `resendTimer_${newEmail}`;
  const resendTimerExpires = localStorage.getItem(resendTimerKey);
  const remaining = resendTimerExpires ? Math.max(0, Math.ceil((parseInt(resendTimerExpires) - Date.now()) / 1000)) : 0;

  if (remaining > 0) {
    startCountdown(newEmail, remaining, resendBtn);
  }

  resendBtn.onclick = async () => {
    try {
      resendBtn.disabled = true;
      
      const response = await fetch('/user/resend-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, type: 'profile' })
      });

      const result = await response.json();

      if (response.ok) {
        showNotification('Código reenviado exitosamente', true);
        verificationMsg.innerHTML = `Te hemos enviado un nuevo código de verificación a <strong>${newEmail}</strong>`;
        
        if (result.resendTimer) {
          startCountdown(newEmail, result.resendTimer, resendBtn);
        }
      } else {
        showNotification(result.error || 'Error al reenviar el código', false);
        resendBtn.disabled = false;
      }
    } catch (error) {
      showNotification('Error de red: ' + error.message, false);
      resendBtn.disabled = false;
    }
  };

  modal.style.display = 'flex';
}

function startCountdown(email, seconds, button) {
  const resendTimerKey = `resendTimer_${email}`;
  const expiresAt = Date.now() + seconds * 1000;
  localStorage.setItem(resendTimerKey, expiresAt.toString());

  let remaining = seconds;
  button.disabled = true;
  const originalText = button.textContent;

  const interval = setInterval(() => {
    remaining--;
    button.textContent = `Reenviar (${remaining}s)`;

    if (remaining <= 0) {
      clearInterval(interval);
      localStorage.removeItem(resendTimerKey);
      button.textContent = originalText;
      button.disabled = false;
    }
  }, 1000);
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('resend-code-btn').style.display = 'none';
  document.getElementById('verification-message').style.display = 'none';
}

document.getElementById('modal-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const form = e.target;
    const { type } = form.dataset;
    const data = Object.fromEntries(new FormData(form));
    
    const response = await fetch(urls[type], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      let successMessage;
      if (type === 'verify-email') {
        successMessage = 'Correo verificado';
      } else if (type === 'email') {
        openCodeModal(data.newEmail); 
        return;
      } else {
        successMessage = 'Actualizado con éxito';}
        
        showNotification(responseData.message || successMessage, true);
        
        if (type !== 'email') {setTimeout(() => {closeModal();
          window.location.href = responseData.redirectUrl || '/account';
        }, 2000);
      }
    } else {
      showNotification(
        responseData.error ||
        responseData.message ||
        responseData.errors?.[0]?.message ||
        'Error desconocido',
        false);
      }
    } catch (error) {showNotification(error.message || 'Error de red', false);
    closeModal();
  }
});