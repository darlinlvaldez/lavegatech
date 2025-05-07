export const renderError = (res, view, error, extras = {}) => {
  let errorMessage;
  let validationErrors = {};
  
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error?.message) {
    errorMessage = error.message;
    validationErrors = error.fields || {};
  } else if (error?.error) {
    errorMessage = error.error;
    if (error.errors) {
      validationErrors = error.errors.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
    }
  } else {
    errorMessage = 'Ocurrió un error';
  }
  
  return res.render(view, { 
    error: errorMessage, 
    validationErrors,
    ...extras 
  });
};

export const ERROR_MESSAGES = {
  // REGISTER
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden.',
  EMAIL_ALREADY_EXISTS: 'Este correo ya está registrado.',
  REGISTRATION_ERROR: 'Error en el registro. Por favor, inténtalo de nuevo.',

  // VERIFICATION
  INVALID_CODE: 'Código inválido o expirado.',
  VERIFICATION_ERROR: 'Error al verificar el código.',

  // RENSEND CODE
  RESEND_COOLDOWN: 'Debes esperar {seconds} segundos antes de reenviar el código.',
  RESEND_ERROR: 'Error al reenviar el código.',

  // LOGIN
  USER_NOT_FOUND: 'Correo no registrado.',
  
  INCORRECT_PASSWORD: 'Contraseña actual incorrecta.',
  WRONG_PASSWORD: 'Contraseña incorrecta.',
  UNVERIFIED_EMAIL: 'Primero debes verificar tu correo.',
  LOGIN_ERROR: 'Error en el inicio de sesión.',
  EMAIL_REPEATED: 'No puedes actualizar al mismo correo',

  // FORGOT PASSWORD
  NO_RESET_REQUEST: 'No hay solicitud de recuperación activa.',
  PASSWORD_RESET_ERROR: 'Error al cambiar la contraseña.',

  // CONTACT
  MISSING_FIELDS: 'Todos los campos son obligatorios.',
  EMAIL_SEND_ERROR: 'Ocurrió un error al enviar el correo.',

  // GENERAL
  SERVER_ERROR: 'Error en el servidor. Por favor, inténtalo más tarde.'
};

export const ERROR_ZOD = {
  // USERNAME
  USERNAME_REQUIRED: "El nombre es obligatorio",
  USERNAME_MIN: "El nombre debe tener al menos 3 caracteres",
  USERNAME_MAX: "El nombre no debe superar los 40 caracteres",

  // EMAIL
  EMAIL_REQUIRED: "El correo es obligatorio",
  EMAIL_INVALID: "El formato del correo no es válido",
  EMAIL_MIN: "El correo debe tener al menos 15 caracteres",

  // CODE
  CODE_REQUIRED: "El código es obligatorio",
  CODE_LENGTH: "El código debe tener exactamente 6 caracteres",

  // PASSWORDS
  OLD_PASSWORD_REQUIRED: "La contraseña actual es obligatoria",
  OLD_PASSWORD_MIN: "La contraseña debe tener al menos 6 caracteres",
  NEW_PASSWORD_REQUIRED: "La nueva contraseña es obligatoria",
  NEW_PASSWORD_MIN: "La nueva contraseña debe tener al menos 6 caracteres",
  CONFIRM_PASSWORD_REQUIRED: "Debes confirmar la nueva contraseña",
  CONFIRM_PASSWORD_MIN: "La confirmación debe tener al menos 6 caracteres",

  // FORM CONTACT
  MESSAGE_SUBJECT_MIN: "El asunto debe tener al menos 10 caracteres",
  MESSAGE_MIN: "El mensaje debe tener al menos 10 caracteres"
};