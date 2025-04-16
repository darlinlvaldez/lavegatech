import jwt from 'jsonwebtoken';
import config from '../../config.js';

const authenticated = () => async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized - No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized - Invalid token',
            ...(config.MODE === 'development' && { error: error.message }),
        });
    }
};

export default authenticated;