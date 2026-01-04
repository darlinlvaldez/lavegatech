import db from "../../database/mobiles.js";

const orders = {};

orders.createOrder = async (orderData, items, costoEnvio) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

      const [orderResult] = await conn.query(
      `INSERT INTO pedidos (usuario_id, nombre, apellido, email, direccion, 
        distrito, telefono, total, estado, ciudad_envio_id, ciudad_envio_nombre, 
        ciudad_envio_costo, envio_diferente) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.usuario_id,
        orderData.nombre,
        orderData.apellido,
        orderData.email,
        orderData.direccion,
        orderData.distrito,
        orderData.telefono,
        orderData.total,
        orderData.estado,
        orderData.ciudad_envio_id,
        orderData.ciudad_envio_nombre,
        orderData.ciudad_envio_costo,
        orderData.envio_diferente || 0  
      ]
    );

    const pedido_id = orderResult.insertId;

    for (const item of items) {
      await conn.query(
        `INSERT INTO detalles_pedido 
          (pedido_id, producto_id, nombre_producto, ram, almacenamiento, 
          taxRate, cantidad, precio_unitario, impuesto, descuento, subtotal) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pedido_id,
          item.producto_id,
          item.nombre_producto,
          item.ram,
          item.almacenamiento,
          item.taxRate,
          item.cantidad,
          item.precio_unitario,
          item.impuesto || 0,
          item.descuento || 0,
          item.subtotal 
        ]
      );
    }

    await orders.createShipping(conn, pedido_id, {
      estado_envio: "pendiente",
      costo_envio: costoEnvio,
    });

    await conn.commit();
    return pedido_id;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

orders.getCityId = async (ciudad_envio_id) => {
  const [result] = await db.query(
    "SELECT id, nombre, costo_envio FROM ciudades_envio WHERE id = ?",
    [ciudad_envio_id]
  );
  return result.length ? result[0] : null;
};

orders.listCities = async function () {
  const [ciudades] = await db.query("SELECT id, nombre, costo_envio FROM ciudades_envio WHERE activo = 1;");
  return ciudades;
}

orders.createShipping = async (conn, pedido_id, envioData) => {
  const {estado_envio = 'pendiente', costo_envio = 0.00 } = envioData;

  await conn.query(`
    INSERT INTO envios (pedido_id, estado_envio, costo_envio)
    VALUES (?, ?, ?)`,
    [pedido_id, estado_envio, costo_envio]
  );
};

orders.getLastOrderByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT nombre, apellido, email, direccion, distrito, telefono, envio_diferente 
     FROM pedidos 
     WHERE usuario_id = ? 
     ORDER BY fecha_creacion DESC 
     LIMIT 1`,
    [userId]
  );
  return rows.length ? rows[0] : null;
};

orders.updateStock = async (pedido_id, userId) => {
  const { items } = await orders.getOrderById(pedido_id, userId) || {};
  if (!items) throw new Error(`Orden no encontrada`);

  await Promise.all(items.map(async ({ cantidad, producto_id, taxRate, nombre_producto }) => {
    const [result] = await db.query(
      `UPDATE p_variantes SET stock = stock - ? 
       WHERE producto_id = ? ${taxRate ? 'AND color = ?' : ''} AND stock >= ?`,
      [cantidad, producto_id, ...(taxRate ? [taxRate] : []), cantidad]
    );
    if (!result.affectedRows) throw new Error(`Stock insuficiente: ${nombre_producto}
      ${taxRate ? ` (${taxRate})` : ''}`);
  }));
};

orders.checkStock = async (items) => {
  const stockItems = [];
  
  await Promise.all(items.map(async (item) => {
    const [stock] = await db.query(
      `SELECT stock FROM p_variantes 
       WHERE producto_id = ? ${item.taxRate ? 'AND color = ?' : ''}`,
      [item.producto_id, ...(item.taxRate ? [item.taxRate] : [])]
    );
  
    if (stock.length === 0 || stock[0].stock < item.cantidad) {
      stockItems.push({id: item.producto_id,
        name: item.nombre,
        color: item.taxRate,
        requested: item.cantidad,
        available: stock.length > 0 ? stock[0].stock : 0
      });
    }
  }));

  if (stockItems.length > 0) {
    const error = new Error('Stock insuficiente para algunos productos');
    error.stockItems = stockItems;
    throw error;
  }
};

orders.getOrderById = async (pedido_id, userId) => {
  const [order] = await db.query(
    `SELECT p.*, p.ciudad_envio_nombre, p.ciudad_envio_costo, e.estado_envio
     FROM pedidos p
     LEFT JOIN envios e ON p.id = e.pedido_id
     WHERE p.id = ? AND p.usuario_id = ?`,
    [pedido_id, userId]
  );

  if (order.length === 0) return null;

  const [items] = await db.query(
    `SELECT dp.*, 
     CONCAT(dp.ram, '+', dp.almacenamiento) AS specs
     FROM detalles_pedido dp
     WHERE pedido_id = ?`,
    [pedido_id]
  );

  return {
    ...order[0],
    items
  };
};

orders.getUserOrders = async (userId) => {
  const [orders] = await db.query(
    `SELECT p.*, p.ciudad_envio_nombre, e.estado_envio
     FROM pedidos p
     LEFT JOIN envios e ON p.id = e.pedido_id
     WHERE p.usuario_id = ?
     ORDER BY p.fecha_creacion DESC`,
    [userId]
  );
  return orders;
};

orders.createPayment = async (pedido_id, paymentData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO pagos 
      (pedido_id, metodo_pago, estado_pago, paypal_order_id) 
      VALUES (?, ?, ?, ?)`,
      [pedido_id, paymentData.paymentMethod, "completado", paymentData.paymentId]
    );

    await conn.commit();
    return result.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export default orders;