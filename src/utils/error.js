export const ERROR_MESSAGES = {
  // Registro
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden.',
  EMAIL_ALREADY_EXISTS: 'Este correo ya está registrado.',
  REGISTRATION_ERROR: 'Error en el registro. Por favor, inténtalo de nuevo.',

  // Verificación
  INVALID_CODE: 'Código inválido o expirado.',
  VERIFICATION_ERROR: 'Error al verificar el código.',

  // Reenvío de código
  RESEND_COOLDOWN: 'Debes esperar {seconds} segundos antes de reenviar el código.',
  RESEND_ERROR: 'Error al reenviar el código.',

  // Login
  USER_NOT_FOUND: 'Correo no registrado.',
  
  INCORRECT_PASSWORD: 'Contraseña actual incorrecta.',
  WRONG_PASSWORD: 'Contraseña incorrecta.',
  UNVERIFIED_EMAIL: 'Primero debes verificar tu correo.',
  LOGIN_ERROR: 'Error en el inicio de sesión.',
  EMAIL_REPEATED: 'No puedes actualizar al mismo correo',

  // Recuperación
  NO_RESET_REQUEST: 'No hay solicitud de recuperación activa.',
  PASSWORD_RESET_ERROR: 'Error al cambiar la contraseña.',

  // Contacto
  MISSING_FIELDS: 'Todos los campos son obligatorios.',
  EMAIL_SEND_ERROR: 'Ocurrió un error al enviar el correo.',

  // General
  SERVER_ERROR: 'Error en el servidor. Por favor, inténtalo más tarde.'
};