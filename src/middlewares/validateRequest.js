import config from '../../config.js';   
import validator from '../helpers/schemaValidator.js';

const validate = (schema, auth) => (req, res, next) => {
    
    const validation = validator.schema(schema, req.body);

    if (!validation.isValid) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request',
            ...(config.MODE === 'development' && { errors: validation.errors }),
        });
    }

    next();
};

export default validate;