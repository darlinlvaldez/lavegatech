import db from '../database/mobiles.js';

const userRepository = {};

// Crea un nuevo usuario
userRepository.create = async ({ id, username, password, email }) => {
    const [result] = await db.query(
        `INSERT INTO users (id, username, password, email, enabled) VALUES (?, ?, ?, ?, 1)`,
        [id, username, password, email]
    );
    return await userRepository.getOne(username);
};

// Busca usuario por username o email (devuelve el primer resultado)
userRepository.getOne = async (username, email) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [username, email]
    );
    return rows[0] || null; 
};

// Obtiene todos los usuarios
userRepository.getAll = async () => {
    const [rows] = await db.query(`SELECT * FROM users`);
    return rows || []; 
};

// Actualiza un usuario
userRepository.update = async (username, data) => {
    const [result] = await db.query(
        'UPDATE users SET ? WHERE username = ?',
        [data, username]
    );
    return result.affectedRows > 0;
};

export default userRepository;