function togglePassword(field) {
  const ids = {
    password: ['passwordInput', 'eyeIconPassword'],
    new: ['newPasswordInput', 'eyeIconNewPassword'],
    confirm: ['confirmPasswordInput', 'eyeIconConfirmPassword']
  };

  if (!ids[field]) {
    console.warn('Campo inválido en togglePassword:', field);
    return;
  }

  const [inputId, iconId] = ids[field];
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (!input || !icon) {
    console.warn('No se encontró input o icono para:', field);
    return;
  }

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  icon.classList.toggle('fa-eye-slash', !isHidden);
  icon.classList.toggle('fa-eye', isHidden);
}