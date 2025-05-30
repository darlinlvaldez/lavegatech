function togglePassword(field) {
  let input, icon;

  switch (field) {
    case 'password':
      input = document.getElementById('passwordInput');
      icon = document.getElementById('eyeIconPassword');
      break;
    case 'new':
      input = document.getElementById('newPasswordInput');
      icon = document.getElementById('eyeIconNewPassword');
      break;
    case 'confirm':
      input = document.getElementById('confirmPasswordInput');
      icon = document.getElementById('eyeIconConfirmPassword');
      break;
    default:
      console.warn('Campo inválido en togglePassword:', field);
      return;
  }

  if (!input || !icon) {
    console.warn('No se encontró input o icono para:', field);
    return;
  }

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  icon.classList.toggle('fa-eye-slash', !isHidden);
  icon.classList.toggle('fa-eye', isHidden);
}