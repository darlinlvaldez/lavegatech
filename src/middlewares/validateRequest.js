import config from '../../config.js';
import validator from '../helpers/schemaValidator.js';

const validate = (schema) => (req, res, next) => {
  const validation = validator.schema(schema, req.body);

  if (!validation.isValid) {
    const response = {
      error: validation.errors[0]?.message || 'Error de validación',
      validationError: true
    };

    if (config.MODE === 'development') {
      response.errors = validation.errors;
      response.stack = validation.stack;
    }

    return res.status(400).json(response);
  }

  next();
};

export default validate;