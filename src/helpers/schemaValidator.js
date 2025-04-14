import { ZodError } from 'zod';

const validator = {
    schema: (schema, data) => {
        try {
            schema.parse(data);  
            return { isValid: true, errors: null };
        } catch (error) {
            if (error instanceof ZodError) {
                
                const errors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                return { isValid: false, errors };
            }
            throw error;
        }
    }
};

export default validator;