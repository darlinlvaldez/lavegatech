import db from "../database/mobiles.js";

const fav = {};

fav.addItem = async ({usuario_id, producto_id, colorSeleccionado, descuento, precio, imagen, nombre, ram, almacenamiento}) => {
    await db.query(`INSERT INTO fav (usuario_id, producto_id, colorSeleccionado,
      descuento, precio, imagen, nombre, ram, almacenamiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [usuario_id, producto_id, colorSeleccionado, descuento, precio, imagen, nombre, ram, almacenamiento]);
};

fav.removeItem = async (usuario_id, producto_id, colorSeleccionado) => {
  await db.query(
    "DELETE FROM fav WHERE usuario_id = ? AND producto_id = ? AND colorSeleccionado = ?",
    [usuario_id, producto_id, colorSeleccionado]
  );
};

fav.clearAll = async (usuario_id) => {
  await db.query("DELETE FROM fav WHERE usuario_id = ?", [usuario_id]);
};

fav.itemExists = async (usuario_id, producto_id, colorSeleccionado) => {
  const [rows] = await db.query(
    "SELECT id FROM fav WHERE usuario_id = ? AND producto_id = ? AND colorSeleccionado = ?",
    [usuario_id, producto_id, colorSeleccionado]
  );
  return rows.length > 0;
};

fav.getByUserId = async (usuario_id) => {
  const [rows] = await db.query(
    `SELECT 
      f.id, 
      f.producto_id as id, 
      f.colorSeleccionado, 
      f.descuento, 
      f.precio, 
      f.imagen, 
      f.nombre,
      v.stock as stockPorColor,
      p.categoria_id,
      r.capacidad AS ram, 
      a.capacidad AS almacenamiento
    FROM fav f
    LEFT JOIN productos p ON f.producto_id = p.id
    LEFT JOIN p_variantes v ON f.producto_id = v.producto_id AND f.colorSeleccionado = v.color
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE f.usuario_id = ? 
    ORDER BY f.fecha_agregado DESC`,
    [usuario_id]
  );
  return rows;
};

fav.getCount = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM fav WHERE usuario_id = ?",
    [usuario_id]
  );
  return rows[0].count;
};

export default fav;