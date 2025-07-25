import db from "../database/mobiles.js";

const admin = {};

// Productos

admin.obtenerItems = async () => {
  const query = `
    SELECT 
    p.id, 
    p.nombre, 
    p.precio, 
    p.descripcion, 
    p.descuento, 
    p.categoria_id AS categoria_id,
    p.marca_id AS marca_id,
    p.almacenamiento_id,
    p.ram_id,
    c.categoria AS categoria,
    m.nombre AS marca,
    p.fecha
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN p_marcas m ON p.marca_id = m.id
    ORDER BY p.id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.agregarItems = async ({nombre, precio, descripcion, 
    descuento, categoria, marca, almacenamiento_id, ram_id}) => {
        
    const query = `INSERT INTO productos 
    (nombre, precio, descripcion, descuento, categoria_id, marca_id, 
    almacenamiento_id, ram_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(query, [nombre, precio, descripcion, 
      descuento, categoria, marca, almacenamiento_id, ram_id]);

  return result.insertId;
};

admin.actualizarItems = async ({id, nombre, precio, descripcion, 
    descuento, categoria, marca, fecha, almacenamiento_id, ram_id}) => {
    const query = `UPDATE productos 
    SET nombre = ?, precio = ?, descripcion = ?, descuento = ?, 
    categoria_id = ?, marca_id = ?, fecha = ?, almacenamiento_id = ?, ram_id = ?
    WHERE id = ?`;
    
    const [result] = await db.query(query, [nombre, precio, 
    descripcion, descuento, categoria, marca, fecha, 
    almacenamiento_id, ram_id, id]);

  return result.affectedRows;
};

admin.eliminarItems = async (id) => {
  const query = `DELETE FROM productos WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};

// Ram y Almacenamiento

admin.obtenerRAM = async () => {
  const [rows] = await db.query("SELECT id, capacidad, tipo FROM ram");
  return rows.map(r => ({ id: r.id, nombre: `${r.capacidad} ${r.tipo}` }));
};

admin.obtenerAlm = async () => {
  const [rows] = await db.query("SELECT id, capacidad, tipo FROM almacenamiento");
  return rows.map(r => ({ id: r.id, nombre: `${r.capacidad} ${r.tipo}` }));
};

// Categorias

admin.obtenerCategorias = async () => {
  const [rows] = await db.query("SELECT id, categoria, imagen FROM categorias ORDER BY categoria");
  return rows;
};

admin.crearCategoria = async (categoria, imagen) => {
  await db.query("INSERT INTO categorias (categoria, imagen) VALUES (?, ?)", [categoria, imagen]);
};

admin.actualizarCategoria = async (id, categoria, imagen) => {
  await db.query("UPDATE categorias SET categoria = ?, imagen = ? WHERE id = ?", [categoria, imagen, id]);
};

admin.eliminarCategoria = async (id) => {
  await db.query("DELETE FROM categorias WHERE id = ?", [id]);
};

admin.asociarCategoriasMarca = async (marcaId, categoriasIds) => {
  await db.query("DELETE FROM marca_categoria WHERE marca_id = ?", [marcaId]);

  const values = categoriasIds.map(catId => [marcaId, catId]);
  if (values.length > 0) {
    await db.query("INSERT INTO marca_categoria (marca_id, categoria_id) VALUES ?", [values]);
  }
};

// Marcas

admin.obtenerMarcas = async () => {
  const [marcas] = await db.query("SELECT id, nombre, logo FROM p_marcas ORDER BY nombre");

  const [asociaciones] = await db.query(`
    SELECT m.id AS marca_id, c.id AS categoria_id, c.categoria
    FROM p_marcas m
    JOIN marca_categoria mc ON m.id = mc.marca_id
    JOIN categorias c ON mc.categoria_id = c.id
  `);

  return marcas.map(marca => {
    const categorias = asociaciones
      .filter(a => a.marca_id === marca.id)
      .map(a => ({ id: a.categoria_id, categoria: a.categoria }));
    return { ...marca, categorias };
  });
};

admin.agregarMarca = async (nombre, logo, categorias = []) => {
  const [result] = await db.query("INSERT INTO p_marcas (nombre, logo) VALUES (?, ?)", [nombre, logo]);
  const marcaId = result.insertId;
  await admin.asociarCategoriasMarca(marcaId, categorias);
  return marcaId;
};

admin.editarMarca = async (id, nombre, logo, categorias = []) => {
  await db.query("UPDATE p_marcas SET nombre = ?, logo = ? WHERE id = ?", [nombre, logo, id]);
  await admin.asociarCategoriasMarca(id, categorias);
};

admin.eliminarMarca = async (id) => {
  await db.query("DELETE FROM marca_categoria WHERE marca_id = ?", [id]);

  await db.query("DELETE FROM p_marcas WHERE id = ?", [id]);
};

// Variantes

admin.obtenerVariantes = async () => {
  const query = `
    SELECT 
      v.id,
      v.producto_id,
      v.color,
      v.stock,
      v.img,
      p.nombre AS producto
    FROM p_variantes v
    JOIN productos p ON v.producto_id = p.id
    ORDER BY v.id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.agregarVariante = async ({ producto_id, color, stock, img }) => {
  const [result] = await db.query(
    "INSERT INTO p_variantes (producto_id, color, stock, img) VALUES (?, ?, ?, ?)",
    [producto_id, color, stock, img]
  );
  return result.affectedRows > 0;
};

admin.eliminarVariante = async (id) => {
  const [result] = await db.query("DELETE FROM p_variantes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

admin.actualizarVariante = async ({ id, color, stock, img, producto_id }) => {
  const [result] = await db.query(
    "UPDATE p_variantes SET color = ?, stock = ?, img = ?, producto_id = ? WHERE id = ?",
    [color, stock, img, producto_id, id]
  );
  return result.affectedRows > 0;
};

// Usuarios 

admin.obtenerUsuarios = async () => {
  const query = `
    SELECT id, username, email, is_active, created_at
    FROM usuarios
    ORDER BY created_at DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.estadoUsuario = async (id, isActive) => {
  const [result] = await db.query("UPDATE usuarios SET is_active = ? WHERE id = ?", [isActive, id]);
  return result.affectedRows > 0;
};

// Pedidos

admin.obtenerPedidos = async () => {
  const [rows] = await db.query(
    `SELECT p.*, c.costo_envio 
     FROM pedidos p
     LEFT JOIN ciudades_envio c ON p.ciudad_envio_id = c.id
     ORDER BY p.fecha_creacion DESC`
  );
  return rows;
};

admin.obtenerPedidoId = async (id) => {
  const [rows] = await db.query(
    `SELECT p.*, c.costo_envio 
     FROM pedidos p
     LEFT JOIN ciudades_envio c ON p.ciudad_envio_id = c.id
     WHERE p.id = ?`,
    [id]
  );
  return rows[0]; 
};

admin.productoPedido = async (orderId) => {
  const [rows] = await db.query("SELECT * FROM detalles_pedido WHERE order_id = ?", [orderId]);
  return rows;
};

export default admin;