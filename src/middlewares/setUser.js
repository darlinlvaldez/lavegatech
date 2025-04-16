// src/middlewares/setUser.js
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import userRepository from '../models/userRepository.js';

const setUser = () => async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        const user = await userRepository.getOne(decoded.username);
        
        if (user && user.enabled) {
            req.user = user;
            res.locals.user = user;
        } else {
            res.clearCookie('token');
            res.locals.user = null;
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        res.clearCookie('token');
        res.locals.user = null;
    }
    
    next();
};
export default setUser;