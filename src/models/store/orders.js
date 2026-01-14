import db from "../../database/mobiles.js";

const orders = {};

orders.createOrder = async (orderData, items, shippingCost, cartItems) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

      const [orderResult] = await conn.query(
      `INSERT INTO pedidos (usuario_id, nombre, apellido, email, direccion, 
        distrito, telefono, total, estado, ciudad_envio_id, ciudad_envio_nombre, 
        ciudad_envio_costo, envio_diferente) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.userId,
        orderData.name,
        orderData.lastName,
        orderData.email,
        orderData.address,
        orderData.district,
        orderData.tel,
        orderData.total,
        orderData.state,
        orderData.shippingCityId,
        orderData.shippingCityName,
        orderData.shippingCityCost,
        orderData.differentShipping || 0  
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.query(
        `INSERT INTO detalles_pedido 
          (pedido_id, producto_id, nombre_producto, ram, almacenamiento, 
          colorSeleccionado, cantidad, precio_unitario, impuesto, descuento, subtotal) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.productName,
          item.ram,
          item.storage,
          item.selectedColor,
          item.quantity,
          item.unitPrice,
          item.tax || 0,
          item.discount || 0,
          item.subtotal 
        ]
      );
    }

    await orders.createShipping(conn, orderId, {
      shippingStatus: "pendiente",
      shippingCost: shippingCost,
    });

    await orders.updateStock(cartItems, conn);

    await conn.commit();
    return orderId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

orders.getCityId = async (shippingCityId) => {
  const [result] = await db.query(
    "SELECT id, nombre AS name, costo_envio AS shippingCost FROM ciudades_envio WHERE id = ?",
    [shippingCityId]
  );
  return result.length ? result[0] : null;
};

orders.listCities = async function () {
  const [cities] = await db.query("SELECT id, nombre AS name, costo_envio AS shippingCost FROM ciudades_envio WHERE activo = 1;");
  return cities;
}

orders.createShipping = async (conn, orderId, shippingData) => {
  const {shippingStatus = 'pendiente', shippingCost = 0.00 } = shippingData;

  await conn.query(`
    INSERT INTO envios (pedido_id, estado_envio, costo_envio)
    VALUES (?, ?, ?)`,
    [orderId, shippingStatus, shippingCost]
  );
};

orders.getLastOrderByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT nombre AS name, apellido AS lastName, email, direccion AS address, 
    distrito AS district, telefono AS tel, envio_diferente AS differentShipping 
     FROM pedidos 
     WHERE usuario_id = ? 
     ORDER BY fecha_creacion DESC 
     LIMIT 1`,
    [userId]
  );
  return rows.length ? rows[0] : null;
};

orders.updateStock = async (items, conn) => {
  for (const item of items) {
    const [res] = await conn.query(
      `UPDATE p_variantes
       SET stock = stock - ?
       WHERE id = ?
       AND stock >= ?`,
      [item.quantity, item.varianteId, item.quantity]
    );

    if (!res.affectedRows) {
      throw new Error(`Stock insuficiente: ${item.name}`);
    }
  }
};

orders.getOrderById = async (orderId, userId) => {
  const [order] = await db.query(
    `SELECT p.id,
    p.usuario_id AS userId,
    p.nombre AS name, 
    p.apellido AS lastName, 
    p.email,
    p.direccion AS address, 
    p.distrito AS district, 
    p.telefono AS tel,
    p.total,
    p.estado AS state, 
    p.fecha_creacion AS creationDate, 
    p.envio_diferente AS differentShipping, 
    p.ciudad_envio_nombre AS shippingCityName, 
    p.ciudad_envio_costo AS shippingCityCost, 
    e.estado_envio AS shippingStatus
     FROM pedidos p
     LEFT JOIN envios e ON p.id = e.pedido_id
     WHERE p.id = ? AND p.usuario_id = ?`,
    [orderId, userId]
  );

  if (order.length === 0) return null;

  const [items] = await db.query(
    `SELECT dp.id,
    dp.pedido_id AS orderId,
    dp.producto_id AS productId,
    dp.nombre_producto AS productName,
    dp.cantidad AS quantity,
    dp.precio_unitario AS unitPrice,
    dp.impuesto AS tax,
    dp.descuento AS discount,
    dp.subtotal,
    dp.colorSeleccionado AS selectedColor,     
     CONCAT(dp.ram, '+', dp.almacenamiento) AS specs
     FROM detalles_pedido dp
     WHERE pedido_id = ?`,
    [orderId]
  );

  return {
    ...order[0],
    items
  };
};

orders.getUserOrders = async (userId) => {
  const [orders] = await db.query(
    `SELECT p.id,
    p.nombre AS name, 
    p.direccion AS address,
    p.total, 
    p.estado AS state, 
    p.fecha_creacion AS creationDate, 
    p.ciudad_envio_nombre AS shippingCityName, 
    e.estado_envio AS shippingStatus
     FROM pedidos p
     LEFT JOIN envios e ON p.id = e.pedido_id
     WHERE p.usuario_id = ?
     ORDER BY p.fecha_creacion DESC`,
    [userId]
  );
  return orders;
};

orders.createPayment = async (orderId, paymentData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO pagos 
      (pedido_id, metodo_pago, estado_pago, paypal_order_id) 
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