export const renderError = (res, view, error, extras = {}) => {
  const errorMessage = typeof error === 'string' 
    ? error : error?.message || error?.error || 'Ocurrió un error';
  
  const validationErrors = error?.fields || 
    (error?.errors?.reduce((acc, err) => 
      ({ ...acc, [err.path]: err.message }), {})) || {};
  
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
  RESEND_COOLDOWN: 'Debes esperar para reenviar el código.',
  RESEND_ERROR: 'Error al reenviar el código.',

  // LOGIN
  EMAIL_NOT_FOUND: 'Correo no registrado.',
  USER_NOT_FOUND: 'Usuario no registrado.',
  
  INCORRECT_PASSWORD: 'Contraseña actual incorrecta.',
  WRONG_PASSWORD: 'Contraseña incorrecta.',
  ACCOUNT_BLOCKED: 'Esta cuenta ha sido bloqueada.',
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
  
  FIELD_REQUIRED: "Este campo es obligatorio",

  // USERNAME
  USERNAME_MAX: "El nombre no debe superar los 40 caracteres",

  // EMAIL
  EMAIL_INVALID: "El formato del correo no es válido",
  EMAIL_DOMAIN: "El correo  es obligatorio y debe terminar en @gmail.com",

  // CODE
  CODE_LENGTH: "El código debe tener exactamente 6 caracteres",

  // PASSWORDS
  PASSWORD_MIN: "La contraseña debe tener al menos 6 caracteres",

  // AFFAIR
  AFFAIR_MIN: "El asunto debe tener al menos 10 caracteres",

  // MESSAGE
  MESSAGE_MIN: "El mensaje debe tener al menos 10 caracteres",
  
  // PHONE NUMBER
  NUMBER_MIN: "Debe tener exactamente 10 dígitos",

  // PRODUCT
  PRODUCT_NAME_MAX: "El nombre del producto no debe superar los 100 caracteres",
  PRODUCT_PRICE_POSITIVE: "El precio debe ser un número positivo",
  PRODUCT_DISCOUNT_INVALID: "El descuento debe ser un número",
  PRODUCT_DATE_INVALID: "La fecha del producto no es válida",

  // CATEGORY
  CATEGORY_NAME_MAX: "El nombre de la categoría no debe superar los 60 caracteres",

  // VARIANT
  FIELD_NEGATIVE: "El campo no puede ser negativo",
  URL_INVALID: "La URL de la imagen no es válida",

  // BRAND
  BRAND_NAME_MAX: "El nombre de la marca no debe superar los 60 caracteres",
  BRAND_LOGO_INVALID: "El logo debe ser una URL válida",
  BRAND_CATEGORIES_REQUIRED: "Debes seleccionar al menos una categoría",
  BRAND_CATEGORIES_INVALID: "Las categorías deben ser valores numéricos",
};