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
  <input class="modal-input" type="password" name="oldPassword" placeholder="Tu contraseña actual" required>
  <label class="text-modal">Nueva contraseña:</label>
  <input class="modal-input" type="password" name="newPassword" placeholder="Nueva contraseña" required>
  <label class="text-modal">Confirmar nueva contraseña:</label>
  <input class="modal-input" type="password" name="confirmPassword" placeholder="Repite la nueva contraseña" required>`};

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
  resendBtn.onclick = async () => {
    try {
      const response = await fetch('/user/resend-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, type: 'verify' })
      });

      if (response.ok) {
        showNotification('Código reenviado exitosamente', true);
        verificationMsg.innerHTML = `Te hemos enviado un nuevo código de verificación a <strong>${newEmail}</strong>`;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Error al reenviar el código';
        showNotification(errorMessage, false);
      }
    } catch (error) {showNotification('Error de red: ' + error.message, false);
    }
  };
  modal.style.display = 'flex';
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