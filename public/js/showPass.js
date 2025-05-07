function togglePassword(field) {
  var input = document.getElementById(field === 'password' ? 'passwordInput' : 'confirmPasswordInput');
  var icon = document.getElementById(field === 'password' ? 'eyeIconPassword' : 'eyeIconConfirmPassword');
  
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}