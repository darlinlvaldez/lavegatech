import db from "../database/mobiles.js";

const orders = {};

orders.createOrder = async (orderData, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, nombre, apellido, email, direccion, ciudad, 
       distrito, telefono, horario_entrega, total, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.user_id,
        orderData.nombre,
        orderData.apellido,
        orderData.email,
        orderData.direccion,
        orderData.ciudad,
        orderData.distrito,
        orderData.telefono,
        orderData.horario_entrega,
        orderData.total,
        orderData.status || 'pendiente'
      ]
    );
    
    const orderId = orderResult.insertId;
    
    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items 
         (order_id, producto_id, nombre_producto, cantidad, precio_unitario, descuento, subtotal) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.producto_id,
          item.nombre_producto,
          item.cantidad,
          item.precio_unitario,
          item.descuento || 0,
          item.subtotal
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

orders.getOrderById = async (orderId, userId) => {
  const [order] = await db.query(
    `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
    [orderId, userId]
  );
  
  if (order.length === 0) return null;
  
  const [items] = await db.query(
    `SELECT * FROM order_items WHERE order_id = ?`,
    [orderId]
  );
  
  return {
    ...order[0],
    items
  };
};

orders.updateOrderStatus = async (orderId, status) => {
  await db.query(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, orderId]
  );
};

orders.getUserOrders = async (userId) => {
  const [orders] = await db.query(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY fecha_creacion DESC`,
    [userId]
  );
  return orders;
};

orders.createPayment = async (orderId, paymentData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    const [result] = await conn.query(
      `INSERT INTO payments 
      (order_id, metodo_pago, estado_pago, paypal_order_id) 
      VALUES (?, ?, ?, ?)`,
      [
        orderId,
        paymentData.paymentMethod,
        'completado', 
        paymentData.paymentId
      ]
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