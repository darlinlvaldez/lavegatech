import orders from '../../models/store/orders.js';
import cart from '../../models/store/cart.js';
import { getExchangeRate } from '../../services/exchange.js';

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { nombre, apellido, email, direccion, distrito, telefono, ciudad_envio, envio_diferente } = req.body;

    const cartItems = await cart.getCartToPay(userId);
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    const ciudadData = await orders.getCityId(ciudad_envio);
    if (!ciudadData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }

    const costoEnvio = parseFloat(ciudadData.costo_envio);

    const orderItems = cartItems.map(item => {
      const precioBase = Number(item.precioOriginal) || 0; 
      const impuesto = Number(item.impuesto) || 0;
      const descuento = Number(item.descuento) || 0;

      const subtotal = precioBase * item.cantidad * (1 + impuesto / 100) * (1 - descuento / 100);

      return {
        producto_id: item.producto_id,
        nombre_producto: item.nombre,
        ram: item.ram,
        almacenamiento: item.almacenamiento,
        colorSeleccionado: item.colorSeleccionado,
        cantidad: item.cantidad,
        precio_unitario: precioBase,
        impuesto,
        descuento,
        subtotal
      };
    });

    const totalPesos = orderItems.reduce((sum, item) => sum + item.subtotal, 0) + costoEnvio;

    const tasaCambio = await getExchangeRate();

    const totalEnDolares = (totalPesos * tasaCambio).toFixed(2);

    const orderData = {
      usuario_id: userId,
      nombre,
      apellido,
      email,
      direccion,
      ciudad: ciudadData.nombre,
      distrito,
      telefono,
      total: totalPesos,
      ciudad_envio,
      envio_diferente,
    };

    res.json({
      success: true,
      orderData,
      orderItems,
      totalPesos,
      totalEnDolares,
      tasaCambio
    });

  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ success: false, message: 'Error al procesar la orden' });
  }
};

orderController.getCities = async function (req, res) {
  try {
    const ciudades = await orders.listCities();
    res.json({ success: true, ciudades });
  } catch (error) {
    console.error('Error al cargar ciudades:', error);
    res.status(500).json({ success: false, message: 'Error al cargar ciudades' });
  }
}

orderController.processPayment = async (req, res) => {
  try {
    console.log("BODY RECIBIDO EN /api/order/payment:", req.body);
    const { orderData, orderItems, paymentDetails, payerId, paymentId, pagadoDolares } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const userId = req.session.user.id;
    const cartItems = await cart.getCartToPay(userId);

    if (cartItems.length === 0) { 
      return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    const ciudadData = await orders.getCityId(orderData.ciudad_envio);
    if (!ciudadData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }

    const costoEnvio = parseFloat(ciudadData.costo_envio);

    const subtotalProductos = cartItems.reduce((sum, item) => {
      const precioBase = Number(item.precioOriginal) || 0;
      const descuento = Number(item.descuento) || 0;
      const impuesto = Number(item.impuesto) || 0;

      const precioFinal = precioBase * (1 - descuento / 100) * (1 + impuesto / 100);
      return sum + (precioFinal * item.cantidad);
    }, 0);

    const totalPesos = subtotalProductos + costoEnvio;

    const tasaCambio = orderData.tasaCambio || await getExchangeRate();

    const pagadoPesos = totalPesos; 
    console.log("DEBUG pago =>", { subtotalProductos, costoEnvio, 
      totalPesos, pagadoDolares, tasaCambio, pagadoPesos });

    if (Math.abs(pagadoPesos - totalPesos) > 50) { 
      return res.status(400).json({
        success: false,
        message: 'Monto pagado no coincide con el total real de la orden'
      });
    }

    await orders.checkStock(cartItems);

    const pedido_id = await orders.createOrder(
      {...orderData, estado: "pagado", total: totalPesos,
        ciudad_envio: ciudadData.nombre}, 
        orderItems,costoEnvio);

    await orders.createPayment(pedido_id, {
      paymentMethod: 'paypal',
      paymentId,
      payerId
    });

    await orders.updateStock(pedido_id, userId);
    await cart.clearCart(userId);

    res.json({
      success: true,
      message: 'Pago procesado correctamente',
      pedido_id,
      redirectUrl: `/api/order/orderDetails/${pedido_id}`
    });

  } catch (error) {
    console.error('Error al procesar pago:', error);

    if (error.stockItems) {
      return res.status(400).json({
        success: false,
        message: error.message,
        stockItems: error.stockItems
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al procesar el pago',
      error: error.message
    });
  }
};

orderController.getExchange = async (req, res) => {
  try {
    const rate = await getExchangeRate();
    res.json({ success: true, rate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

orderController.getLastOrder = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const userId = req.session.user.id;

    const lastOrder = await orders.getLastOrderByUserId(userId);

    if (!lastOrder) {
      return res.json({ success: true, lastOrder: null });
    }

    res.json({ success: true, lastOrder });
  } catch (error) {
    console.error("Error al obtener último pedido:", error);
    res.status(500).json({ success: false, message: "Error al obtener último pedido" });
  }
};

orderController.showUserOrders = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userOrders = await orders.getUserOrders(userId);

    res.render('store/orders/showOrders', {user: req.session.user, orders: userOrders});
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).render('error', { message: 'Error al cargar tus pedidos' });
  }
};

orderController.showOrderDetails = async (req, res) => {
  try {
    const order = await orders.getOrderById(req.params.pedido_id, req.session.user.id);

    if (!order) {
      return res.status(404).render('error', { message: 'Pedido no encontrado' });
    }

    res.render('store/orders/orderDetails', {user: req.session.user, order});
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).render('error', { message: 'Error al cargar el pedido' });
  }
};

export default orderController;