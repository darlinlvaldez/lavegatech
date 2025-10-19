import db from "../../database/mobiles.js";

const fav = {};

fav.addItem = async ({usuario_id, producto_id, variante_id}) => {
    await db.query(
        `INSERT INTO fav (usuario_id, producto_id, variante_id) 
         VALUES (?, ?, ?)`,
        [usuario_id, producto_id, variante_id]
    );
};

fav.getVariant = async (producto_id, colorSeleccionado) => {
    const [rows] = await db.query(
        `SELECT id FROM p_variantes 
         WHERE producto_id = ? AND color = ?`,
        [producto_id, colorSeleccionado]
    );
    return rows[0] || null;
};

fav.removeItem = async (usuario_id, producto_id, variante_id) => {
    await db.query(
        `DELETE FROM fav 
         WHERE usuario_id = ? AND producto_id = ? AND variante_id = ?`,
        [usuario_id, producto_id, variante_id]
    );
};

fav.clearAll = async (usuario_id) => {
  await db.query("DELETE FROM fav WHERE usuario_id = ?", [usuario_id]);
};

fav.itemExists = async (usuario_id, producto_id, variante_id) => {
    const [rows] = await db.query(
        `SELECT id FROM fav 
         WHERE usuario_id = ? AND producto_id = ? AND variante_id = ?`,
        [usuario_id, producto_id, variante_id]
    );
    return rows.length > 0;
};

fav.getByUserId = async (usuario_id) => {
    const [rows] = await db.query(
        `SELECT 
        f.id,
        p.id as producto_id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.descuento,
        p.categoria_id,
        p.marca_id,
        v.id as variante_id,
        v.color as colorSeleccionado,
        v.img as imagen,
        v.stock as stockPorColor,
        r.capacidad AS ram, 
        a.capacidad AS almacenamiento
        FROM fav f
        JOIN productos p ON f.producto_id = p.id
        LEFT JOIN p_variantes v ON f.variante_id = v.id
        LEFT JOIN ram r ON p.ram_id = r.id
        LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
        WHERE f.usuario_id = ? AND p.activo = 1
        ORDER BY f.fecha_agregado DESC`,
    [usuario_id]
    );
    return rows;
};

fav.getCount = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM fav WHERE usuario_id = ? ",
    [usuario_id]
  );
  return rows[0].count;
};

export default fav;