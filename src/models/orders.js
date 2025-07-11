import db from "../database/mobiles.js";

const orders = {};

orders.createOrder = async (orderData, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.query(
      `INSERT INTO pedidos (user_id, nombre, apellido, email, direccion, ciudad, 
       distrito, telefono, total, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.user_id,
        orderData.nombre,
        orderData.apellido,
        orderData.email,
        orderData.direccion,
        orderData.ciudad,
        orderData.distrito,
        orderData.telefono,
        orderData.total,
        orderData.status
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.query(
        `INSERT INTO detalles_pedido 
        (order_id, producto_id, nombre_producto, colorSeleccionado, cantidad, precio_unitario, descuento, subtotal) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.producto_id,
          item.nombre_producto,
          item.colorSeleccionado,
          item.cantidad,
          item.precio_unitario,
          item.descuento || 0,
          item.subtotal,
        ]
      );
    }

    await conn.commit();
    return orderId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

orders.updateStock = async (orderId, userId) => {
  const { items } = await orders.getOrderById(orderId, userId) || {};
  if (!items) throw new Error(`Orden no encontrada`);

  await Promise.all(items.map(async ({ cantidad, producto_id, colorSeleccionado, nombre_producto }) => {
    const [result] = await db.query(
      `UPDATE p_variantes SET stock = stock - ? 
       WHERE producto_id = ? ${colorSeleccionado ? 'AND color = ?' : ''} AND stock >= ?`,
      [cantidad, producto_id, ...(colorSeleccionado ? [colorSeleccionado] : []), cantidad]
    );
    if (!result.affectedRows) throw new Error(`Stock insuficiente: ${nombre_producto}
      ${colorSeleccionado ? ` (${colorSeleccionado})` : ''}`);
  }));
};

orders.checkStock = async (items) => {
  const stockItems = [];
  
  await Promise.all(items.map(async (item) => {
    const [stock] = await db.query(
      `SELECT stock FROM p_variantes 
       WHERE producto_id = ? ${item.colorSeleccionado ? 'AND color = ?' : ''}`,
      [item.producto_id, ...(item.colorSeleccionado ? [item.colorSeleccionado] : [])]
    );
    
    if (stock.length === 0 || stock[0].stock < item.cantidad) {
      stockItems.push({id: item.producto_id,
        name: item.nombre,
        color: item.colorSeleccionado,
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

orders.getOrderById = async (orderId, userId) => {
  const [order] = await db.query(
    `SELECT * FROM pedidos WHERE id = ? AND user_id = ?`,[orderId, userId]);

  if (order.length === 0) return null;

  const [items] = await db.query(
    `SELECT * FROM detalles_pedido WHERE order_id = ?`, [orderId]);

  return {
    ...order[0], items};
};

orders.updateOrderStatus = async (orderId, status) => {
  await db.query(`UPDATE pedidos SET status = ? WHERE id = ?`, 
    [status, orderId]);
};

orders.getUserOrders = async (userId) => {
  const [orders] = await db.query(
    `SELECT * FROM pedidos WHERE user_id = ? ORDER BY fecha_creacion DESC`,
    [userId]);
  return orders;
};

orders.createPayment = async (orderId, paymentData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO pagos 
      (order_id, metodo_pago, estado_pago, paypal_order_id) 
      VALUES (?, ?, ?, ?)`,
      [orderId, paymentData.paymentMethod, "completado", paymentData.paymentId]
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