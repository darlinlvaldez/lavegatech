import db from "../../database/mobiles.js";
import { buildProductFilters } from '../../utils/filterProducts.js';

const admin = {};

// Panel admin

admin.dashboard = async () => {
  const [productosRows] = await db.query('SELECT COUNT(*) AS total FROM productos');
  const [usuariosRows] = await db.query('SELECT COUNT(*) AS total FROM usuarios WHERE rol = "cliente"');
  const [pedidosRows] = await db.query('SELECT COUNT(*) AS total FROM pedidos');
  const [ventasRows] = await db.query(`SELECT SUM(p.total) AS totalVentas
    FROM pedidos p
    JOIN envios e ON p.id = e.pedido_id
    WHERE p.estado = ? AND e.estado_envio != ?`,
    ['pagado', 'cancelado']);

  const [[pendientes]] = await db.query(`SELECT COUNT(*) AS total FROM envios WHERE estado_envio = 'pendiente'`);
  const [[enviados]] = await db.query(`SELECT COUNT(*) AS total FROM envios WHERE estado_envio = 'enviado'`);
  const [[entregados]] = await db.query(`SELECT COUNT(*) AS total FROM envios WHERE estado_envio = 'entregado'`);
  const [[cancelados]] = await db.query(`SELECT COUNT(*) AS total FROM envios WHERE estado_envio = 'cancelado'`);

  return {
    productos: productosRows[0]?.total || 0,
    usuarios: usuariosRows[0]?.total || 0,
    pedidos: pedidosRows[0]?.total || 0,
    ventas: Number(ventasRows[0]?.totalVentas) || 0,
    envios: {
      pendientes: pendientes.total || 0,
      enviados: enviados.total || 0,
      entregados: entregados.total || 0,
      cancelados: cancelados.total || 0
    }
  };
};

admin.graficoVentas = async (rango, mes, fecha, anio, desde, hasta) => {
  let query = '';
  let params = [];

  if (rango === 'mes') {
    if (mes) {
      query = `
        SELECT DATE_FORMAT(p.fecha_creacion, '%Y-%m-%d') AS fecha, SUM(p.total) AS totalVentas, 
        COUNT(DISTINCT p.id) AS totalPedidos
        FROM pedidos p
        JOIN envios e ON p.id = e.pedido_id
        WHERE p.estado = 'pagado' 
          AND e.estado_envio != 'cancelado'
          AND DATE_FORMAT(p.fecha_creacion, '%Y-%m') = ?
        GROUP BY fecha ORDER BY fecha
      `;
      params = [mes];
    }
    else {
      query = `
        SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%d') AS fecha, SUM(total) AS totalVentas,
        COUNT(DISTINCT p.id) AS totalPedidos
        FROM pedidos p
        JOIN envios e ON p.id = e.pedido_id
        WHERE estado = 'pagado' AND e.estado_envio != 'cancelado'
        GROUP BY fecha ORDER BY fecha
      `;
    }
  }

  else if (rango === 'año' && anio) {
    query = `
      SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%d') AS fecha, SUM(total) AS totalVentas,
      COUNT(DISTINCT p.id) AS totalPedidos
      FROM pedidos p
      JOIN envios e ON p.id = e.pedido_id
      WHERE estado = 'pagado' AND e.estado_envio != 'cancelado'
        AND YEAR(fecha_creacion) = ?
      GROUP BY DATE(fecha_creacion) ORDER BY fecha
    `;
    params = [anio];
  }

  else if (rango === 'fecha-especifica' && fecha) {
    query = `
      SELECT 
        HOUR(fecha_creacion) AS hora,
        SUM(total) AS totalVentas,
        COUNT(DISTINCT p.id) AS totalPedidos
      FROM pedidos p
      JOIN envios e ON p.id = e.pedido_id
      WHERE p.estado = 'pagado'
        AND e.estado_envio != 'cancelado'
        AND DATE(fecha_creacion) = ?
      GROUP BY hora
      ORDER BY hora
    `;
    params = [fecha];
  }

  else if (rango === 'personalizado' && desde && hasta) {
    query = `
      SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%d') AS fecha, SUM(total) AS totalVentas,
      COUNT(DISTINCT p.id) AS totalPedidos
      FROM pedidos p 
      JOIN envios e ON p.id = e.pedido_id
      WHERE estado = 'pagado' AND e.estado_envio != 'cancelado'
        AND DATE(fecha_creacion) BETWEEN ? AND ?
      GROUP BY DATE(fecha_creacion) ORDER BY fecha
    `;
    params = [desde, hasta];
  }

  else {
    query = `
      SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%d') AS fecha, SUM(total) AS totalVentas,
      COUNT(DISTINCT p.id) AS totalPedidos
      FROM pedidos p 
      JOIN envios e ON p.id = e.pedido_id
      WHERE estado = 'pagado' AND e.estado_envio != 'cancelado'
      GROUP BY DATE(fecha_creacion) ORDER BY fecha
    `;
  }

  const [rows] = await db.query(query, params);
  return rows;
};

admin.getTopProductos = async ({
  limit = null,
  categorias = [],
  marcas = [],
} = {}) => {
  const { where, params } = buildProductFilters({ categorias, marcas });

  let query = `
    SELECT 
  dp.producto_id,
  dp.nombre_producto,
  SUM(dp.cantidad) AS totalVendido,
  SUM(dp.subtotal) AS totalPrecio,
  CONCAT(r.capacidad, '+', a.capacidad) AS specs,
  p.categoria_id,
  c.categoria,
  p.marca_id,
  m.nombre AS marca
FROM detalles_pedido dp
JOIN pedidos ped ON dp.pedido_id = ped.id
JOIN envios e ON ped.id = e.pedido_id
JOIN productos p ON dp.producto_id = p.id
LEFT JOIN ram r ON p.ram_id = r.id
LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
LEFT JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN p_marcas m ON p.marca_id = m.id
WHERE ped.estado = 'pagado'
  AND e.estado_envio != 'cancelado'
  ${where ? `AND ${where}` : ""}
GROUP BY dp.producto_id, dp.nombre_producto, p.categoria_id, c.categoria, p.marca_id, m.nombre
ORDER BY totalVendido DESC
  `;

  if (limit) {
    query += ` LIMIT ${Number(limit)}`;
  }

  const [rows] = await db.query(query, params);
  return rows;
};

admin.cantidadCategoriaVendida = async ({ categorias = [], marcas = [] } = {}) => {
  const { where, params } = buildProductFilters({ categorias, marcas });

  const query = `
    SELECT
      c.id AS categoria_id,
      c.categoria,
      COALESCE(SUM(dp.cantidad), 0) AS cantidad
    FROM categorias c
    LEFT JOIN productos p ON p.categoria_id = c.id
    LEFT JOIN detalles_pedido dp ON dp.producto_id = p.id
    LEFT JOIN pedidos ped ON dp.pedido_id = ped.id
    LEFT JOIN envios e ON ped.id = e.pedido_id
    WHERE ped.estado = 'pagado'
      AND e.estado_envio != 'cancelado'
      ${where ? `AND ${where}` : ""}
    GROUP BY c.id
  `;
  const [rows] = await db.query(query, params);
  return rows;
};

admin.cantidadMarcasVendidas = async ({ categorias = [], marcas = [] } = {}) => {
  const { where, params } = buildProductFilters({ categorias, marcas });

  const query = `
    SELECT
      m.id AS marca_id,
      m.nombre AS marca,
      COALESCE(SUM(dp.cantidad), 0) AS cantidad
    FROM p_marcas m
    JOIN productos p ON p.marca_id = m.id
    JOIN detalles_pedido dp ON dp.producto_id = p.id
    JOIN pedidos ped ON dp.pedido_id = ped.id
    JOIN envios e ON ped.id = e.pedido_id
    WHERE ped.estado = 'pagado'
      AND e.estado_envio != 'cancelado'
      ${where ? `AND ${where}` : ""}
    GROUP BY m.id
    HAVING cantidad > 0
    ORDER BY cantidad DESC
  `;
  const [rows] = await db.query(query, params);
  return rows;
};

admin.getCategoryNames = async (ids = []) => {
  if (!ids.length) return [];

  const placeholders = ids.map(() => "?").join(",");
  const query = `SELECT categoria FROM categorias WHERE id IN (${placeholders})`;
  const [rows] = await db.query(query, ids);
  return rows.map(r => r.categoria); 
};

admin.actualizarEstadoEnvio = async (estado_envio, pedido_id) => {
  let campos = 'estado_envio = ?';
  let valores = [estado_envio];

  if (estado_envio === "enviado") {
    campos += ", fecha_envio = NOW(), fecha_cancelado = NULL";
  }

  if (estado_envio === 'entregado') {
    campos += ', fecha_entregado = NOW(), fecha_cancelado = NULL';
  }

  if (estado_envio === 'pendiente') {
    campos += ', fecha_envio = NULL, fecha_entregado = NULL, fecha_cancelado = NULL';
  }

  if (estado_envio === 'cancelado') {
    campos += ', fecha_envio = NULL, fecha_entregado = NULL, fecha_cancelado = NOW()';
  }

  valores.push(pedido_id);

  const sql = `UPDATE envios SET ${campos} WHERE pedido_id = ?`;
  return db.query(sql, valores);
};

// Productos

admin.obtenerItems = async () => {
  const query = `
    SELECT 
      p.id, 
      p.nombre, 
      p.precio, 
      p.descripcion,
      p.impuesto, 
      p.descuento, 
      p.categoria_id AS categoria_id,
      p.marca_id AS marca_id,
      p.activo,
      p.almacenamiento_id,
      p.ram_id,
      CONCAT(r.capacidad, '+', a.capacidad) AS specs,
      c.categoria AS categoria,
      m.nombre AS marca,
      p.fecha,
      p.fecha_publicacion
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN p_marcas m ON p.marca_id = m.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    ORDER BY p.id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.agregarItems = async ({nombre, precio, descripcion, impuesto, 
    descuento, categoria, marca, almacenamiento_id, ram_id, fecha_publicacion}) => {
        
    const query = `INSERT INTO productos 
    (nombre, precio, descripcion, impuesto, descuento, categoria_id, marca_id, 
    almacenamiento_id, ram_id, fecha_publicacion) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(query, [nombre, precio, descripcion, 
      impuesto, descuento, categoria, marca, almacenamiento_id, ram_id, fecha_publicacion]);

  return result.insertId;
};

admin.actualizarItems = async ({id, nombre, precio, descripcion, impuesto,
    descuento, categoria, marca, fecha_publicacion, almacenamiento_id, ram_id}) => {
    const query = `UPDATE productos 
    SET nombre = ?, precio = ?, descripcion = ?, impuesto = ?, descuento = ?, 
    categoria_id = ?, marca_id = ?, fecha_publicacion = ?, almacenamiento_id = ?, ram_id = ?
    WHERE id = ?`;
    
    const [result] = await db.query(query, [nombre, precio, descripcion, 
      impuesto, descuento, categoria, marca, fecha_publicacion, 
      almacenamiento_id, ram_id, id]);

  return result.affectedRows;
};

admin.eliminarItems = async (id) => {
  const query = `DELETE FROM productos WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};

admin.itemEstado = async (id) => {
  const query = `UPDATE productos SET activo = NOT activo WHERE id = ?`;
  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query(`SELECT id, activo FROM productos WHERE id = ?`, [id]);
  return rows[0]; 
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

admin.getCategories = async () => {
  const [rows] = await db.query("SELECT id, categoria, activo FROM categorias ORDER BY activo, id DESC");
  return rows;
};

admin.crearCategoria = async (categoria) => {
  await db.query("INSERT INTO categorias (categoria) VALUES (?)", [categoria]);
};

admin.actualizarCategoria = async (id, categoria) => {
  await db.query("UPDATE categorias SET categoria = ? WHERE id = ?", [categoria, id]);
};

admin.asociarCategoriasMarca = async (marcaId, categoriasIds) => {
  await db.query("DELETE FROM marca_categoria WHERE marca_id = ?", [marcaId]);

  const values = categoriasIds.map(catId => [marcaId, catId]);
  if (values.length > 0) {
    await db.query("INSERT INTO marca_categoria (marca_id, categoria_id) VALUES ?", [values]);
  }
};

admin.estadoCategoria = async (id, activo) => {
  const [result] = await db.query(
    `UPDATE categorias SET activo = ? WHERE id = ?`,
    [activo, id]
  );
  return result.affectedRows;
};

// Marcas

admin.obtenerMarcas = async () => {
  const [marcas] = await db.query("SELECT id, nombre, activo FROM p_marcas ORDER BY activo, id DESC;");

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

admin.agregarMarca = async (nombre, categorias = []) => {
  const [result] = await db.query("INSERT INTO p_marcas (nombre) VALUES (?)", [nombre]);
  const marcaId = result.insertId;
  await admin.asociarCategoriasMarca(marcaId, categorias);
  return marcaId;
};

admin.editarMarca = async (id, nombre, categorias = []) => {
  await db.query("UPDATE p_marcas SET nombre = ? WHERE id = ?", [nombre, id]);
  await admin.asociarCategoriasMarca(id, categorias);
};

admin.estadoMarca = async (id, activo) => {
  const [result] = await db.query(
    `UPDATE p_marcas SET activo = ? WHERE id = ?`,
    [activo, id]
  );
  return result.affectedRows;
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
      v.activo,
      p.nombre AS producto,
      r.capacidad AS ram,
      a.capacidad AS almacenamiento,
      CONCAT(r.capacidad, '+', a.capacidad) AS specs
    FROM p_variantes v
    JOIN productos p ON v.producto_id = p.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
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

admin.estadoVariante = async (id, activo) => {
  const [result] = await db.query("UPDATE p_variantes SET activo = ? WHERE id = ?", [activo, id]);
  return result.affectedRows > 0;
};

// Usuarios 

admin.obtenerUsuarios = async () => {
  const query = `
    SELECT id, username, email, activo, fecha_creacion
    FROM usuarios
    WHERE rol = 'cliente'
    ORDER BY fecha_creacion DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.estadoUsuario = async (id, activo) => {
  const [result] = await db.query("UPDATE usuarios SET activo = ? WHERE id = ?", [activo, id]);
  return result.affectedRows > 0;
};

// Pedidos

admin.obtenerPedidos = async () => {
  const [rows] = await db.query(
    `SELECT p.*, e.estado_envio, e.fecha_envio, e.fecha_entregado, e.fecha_cancelado, e.costo_envio,
    p.ciudad_envio_nombre
    FROM pedidos p
    LEFT JOIN envios e ON p.id = e.pedido_id
    ORDER BY p.fecha_creacion DESC`
  );

  return rows;
};

admin.obtenerPedidoId = async (id) => {
  const [rows] = await db.query(
    `SELECT p.*, e.estado_envio, e.fecha_envio, e.fecha_entregado, e.fecha_cancelado, e.costo_envio,
    p.ciudad_envio_nombre, p.ciudad_envio_costo, pa.metodo_pago, pa.paypal_order_id, pa.fecha_pago
    FROM pedidos p
    LEFT JOIN envios e ON p.id = e.pedido_id
    LEFT JOIN pagos pa ON p.id = pa.pedido_id
    WHERE p.id = ?`,
    [id]
  );

  return rows[0];
};

admin.productoPedido = async (pedido_id) => {
  const [rows] = await db.query(`
    SELECT dp.*,
    CONCAT(r.capacidad, '+', a.capacidad) AS specs
    FROM detalles_pedido dp
    LEFT JOIN productos p ON dp.producto_id = p.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE dp.pedido_id = ?
  `, [pedido_id]);

  return rows;
};

// Ciudades de envíos

admin.obtenerCiudades = async () => {
  const [rows] = await db.query(
    `SELECT * FROM ciudades_envio ORDER BY activo, id DESC`
  );
  return rows;
};

admin.obtenerCiudadId = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM ciudades_envio WHERE id = ?`,
    [id]
  );
  return rows[0];
};

admin.agregarCiudad = async ({ nombre, costo_envio }) => {
  const [result] = await db.query(
    `INSERT INTO ciudades_envio (nombre, costo_envio, activo)
     VALUES (?, ?, 1)`,
    [nombre, costo_envio]
  );
  return result.insertId;
};

admin.actualizarCiudad = async ({ id, nombre, costo_envio }) => {
  const [result] = await db.query(
    `UPDATE ciudades_envio SET nombre = ?, costo_envio = ? WHERE id = ?`,
    [nombre, costo_envio, id]
  );
  return result.affectedRows;
};

admin.estadoCiudad = async (id, activo) => {
  const [result] = await db.query(
    `UPDATE ciudades_envio SET activo = ? WHERE id = ?`,
    [activo, id]
  );
  return result.affectedRows;
};

export default admin;