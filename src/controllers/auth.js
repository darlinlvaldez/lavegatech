import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import userRepository from '../models/userRepository.js';
import { v4 as uuidv4 } from 'uuid';

const auth = {};

auth.portal = (req, res) => {
    return res.status(200).json({
        status: 'ok',
        portal: config.PORTAL
    });
}

auth.register = async (req, res) => {

    const { username, password, email } = req.body;

    try {

        // Buscar el usuario
        const user = await userRepository.getOne(username, email);

        // Confirmar que no exista
        if (user) {
            return res.status(409).json({
                status: 'error',
                message: 'Username or email already exists',
            });
        }

        // Generar ID
        const id = uuidv4();

        // Preparar la clave hasheada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el usuario
        await userRepository.create({ id, username, password: hashedPassword, email });

        // Enviar la respuesta
        return res.status(201).json({
            status: 'ok',
            message: 'User registered successfully',
        });

    } catch (error) {
        //En caso de error
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            ...(config.MODE === 'development' && { error }),
        });
    }
};

auth.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userRepository.getOne(username);
        
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'The username or password is incorrect',
            });
        }

        if (!user.enabled) {
            return res.status(401).json({
                status: 'error',
                message: 'User account is disabled',
            });
        }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(401).json({
                status: 'error',
                message: 'The username or password is incorrect',
            });
        }

        const token = jwt.sign({ username: user.username }, config.SECRET_KEY, {
            expiresIn: '1h' // Token expira en 1 hora
        });

        // Configurar la cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000, // 1 hora en milisegundos
            sameSite: 'strict'
        });

        return res.status(200).json({
            status: 'ok',
            username: user.username.toLowerCase(),
            message: 'Login successful'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            ...(config.MODE === 'development' && { error }),
        });
    }
};

auth.logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({
        status: 'ok',
        message: 'Logout successful'
    });
};

auth.authenticate = async (req, res) => {

    try {
        // Vefificar si el token es valido
        const token = jwt.verify(req.body.token, config.SECRET_KEY);

        // Extraer el username del token
        const username = token.username;

        // Buscar el usuario
        const user = await userRepository.getOne(username);

        // Validar si esta activo
        if (!user.enabled) {
            return res.status(403).json({
                status: 'error',
                message: 'User account is disabled',
            });
        }

        // Enviar la respuesta
        return res.status(200).json({
            status: 'ok',
            message: 'Token authenticated',
        });
    } catch (error) {
        //En caso de error
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
            ...(config.MODE === 'development' && { error }),
        });
    }
};

auth.verify = async (req, res) => {

    try {
        // Vefificar si el token es valido
        const token = jwt.verify(req.body.token, config.SECRET_KEY);

        // Enviar la respuesta
        return res.status(200).json({
            status: 'ok',
            message: 'Valid token',
            token
        });
    } catch (error) {
        //En caso de error
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
            ...(config.MODE === 'development' && { error }),
        });
    }
};

// Actualizar perfil
auth.update = async (req, res) => {
    try {

        const currentusername = req.params.username
        let updateduser = req.body;

        if (updateduser?.username) {
            const username = updateduser.username.toLowerCase()
            updateduser = { ...updateduser, username }
        }
        await userRepository.update(currentusername, updateduser)

        let token = undefined;
        if (updateduser?.username)
            token = jwt.sign({ username: updateduser.username }, config.SECRET_KEY);

        return res.status(200).json({
            status: 'ok',
            message: 'Profile updated successfully.',
            token
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

auth.updatePassword = async (req, res) => {
    const currentusername = req.params.username

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.update(currentusername, { password: hashedPassword })

    return res.status(500).json({
        status: 'ok',
        message: 'Password updated successfully.',
    });
};

// Recrear el id y el password. --Eliminar despues de importados
auth.import = async(req, res) => {

    const users = await userRepository.getAll();
    const usersForImport = users.filter(user => user.id == "")

    for (const user of usersForImport) {
        const id = uuidv4();
        const password = await bcrypt.hash("1234", 10);
        await userRepository.update(user.username, { id, password })
    };

    return res.status(200).json({
        usersImpored: usersForImport
    });
}

export default auth;