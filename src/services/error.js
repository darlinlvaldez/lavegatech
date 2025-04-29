const renderError = (res, view, error, extras = {}) => {
    return res.render(view, { error, ...extras });
};

const error = {}

error.passNotMatch = async (res, email) => {
    return renderError(res, 'Las contraseñas no coinciden.', { email: correo, username });
  };
  
error.emailExist = async (res, email) => {
    return renderError(res, 'Este correo ya está registrado.', { email: correo, username });
};

error.emailNotExist = async (res, email) => {
return renderError(res, 'login/login', 'Correo no registrado', { email });};

error.notMatch = async (res, email) => {
    return renderError(res, 'Las contraseñas no coinciden.', { email });
  };
  
error.notRequest = async (res, email) => {
    return renderError(res, 'No hay solicitud de recuperación activa.', { email });
};

error.notMatch = async (res, email) => {
    return renderError(res, 'Las contraseñas no coinciden.', { email });
  };
  
error.notRequest = async (res, email) => {
    return renderError(res, 'No hay solicitud de recuperación activa.', { email });
};

error.notMatch = async (res, email) => {
    return renderError(res, 'Las contraseñas no coinciden.', { email });
  };
  
error.notRequest = async (res, email) => {
    return renderError(res, 'No hay solicitud de recuperación activa.', { email });
};
  
// UPDATE PASSWORD
error.passNotMatch = async (res, email) => {
    return renderError(res, 'Las contraseñas no coinciden.', { email });
  };
  
error.notRequest = async (res, email) => {
    return renderError(res, 'No hay solicitud de recuperación activa.', { email });
};

export default error;