// validateToken.js
import config from '../../config.js';
import keyRepository from '../models/keysRepository.js';

const bearer = () => async (req, res, next) => {
    const bearer = req.headers.authorization;

    // Si no tiene el bearer...
    if (!bearer) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
            ...(config.MODE === 'development' && { errors: "Missing Authorization" }),
        });
    }
    // Extraer el token
    const token = bearer.split(" ")[1];

    // Si no tiene el bearer...
    const key = await keyRepository.getOne(token);
    if (!key) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
            ...(config.MODE === 'development' && { errors: "Invalid Authorization" }),
        });
    }

    next();
};

export default bearer;
