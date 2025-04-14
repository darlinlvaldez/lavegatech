import db from '../database/mobiles.js';

const bearer = {};

bearer.getOne = async (key) => {
    const [rows] = await db.query(
        'SELECT id FROM `keys` WHERE `token` = ?',
        [key]
    );

    return rows[0] || null;
};

export default bearer;