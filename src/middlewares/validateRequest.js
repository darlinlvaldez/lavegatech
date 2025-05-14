import config from '../../config.js';
import validator from '../helpers/schemaValidator.js';

const validate = (schema) => (req, res, next) => {
  const validation = validator.schema(schema, req.body);

  if (!validation.isValid) {
    const errorMessage = validation.errors[0]?.message || 'Error de validación';
    
    const isApiRequest = req.xhr || 
    req.path.startsWith('/api') || 
    req.get('Accept')?.includes('application/json') ||
    req.get('Content-Type')?.includes('application/json');
    
    if (isApiRequest) {
      const response = {
        error: errorMessage,
        validationError: true
      };

      if (config.MODE === 'development') {
        response.errors = validation.errors;
        response.stack = validation.stack;
      }

      return res.status(400).json(response);
    } else {
      req.validationError = {
        message: errorMessage,
        fields: validation.errors.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {})
      };
      return next();
    }
  }
  next();
};

export default validate;