import orders from '../models/orders.js';
import cart from '../models/cart.js';

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ 
        success: false, message: 'No autorizado'});
    }

    const userId = req.session.user.id;
    const { nombre, apellido, email, direccion, ciudad, 
      distrito, telefono, ciudad_envio_id } = req.body;

    if (!nombre || !direccion || !telefono || !email) {
      return res.status(400).json({ 
        success: false, message: 'Faltan datos requeridos'});
    }

    const cartItems = await cart.getCartToPay(userId);
    if (cartItems.length === 0) { 
      return res.status(400).json({success: false,
        message: 'El carrito está vacío'});
    }

    const ciudadData = await orders.getCiudadEnvioById(ciudad_envio_id);
    if (!ciudadData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }

    const costoEnvio = parseFloat(ciudadData.costo_envio);

    const total = cartItems.reduce((sum, item) => {
      const precioFinal = item.descuento > 0 
        ? item.precio * (1 - item.descuento / 100)
        : item.precio;
      return sum + (precioFinal * item.cantidad);
    }, 0) + costoEnvio;

    const orderData = { user_id: userId, nombre, apellido, email, direccion, 
      ciudad: ciudadData.nombre, distrito, telefono, total, ciudad_envio_id
    };

    const orderItems = cartItems.map(item => ({
      producto_id: item.producto_id,
      nombre_producto: item.nombre,
      colorSeleccionado: item.colorSeleccionado,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
      descuento: item.descuento || 0,
      subtotal: (item.precio * (1 - (item.descuento || 0) / 100)) * item.cantidad
    }));

    res.json({success: true, orderData, orderItems, total});
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({success: false, 
      message: 'Error al procesar la orden' 
    });
  }
};

orderController.getCiudades = async function (req, res) {
  try {
    const ciudades = await orders.obtenerCiudades();
    res.json({ success: true, ciudades });
  } catch (error) {
    console.error('Error al cargar ciudades:', error);
    res.status(500).json({ success: false, message: 'Error al cargar ciudades' });
  }
}

orderController.processPayment = async (req, res) => {
  try {
    const { orderData, orderItems } = req.body; 
    const { paymentMethod, paymentDetails, payerId, paymentId } = req.body;
    
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'No autorizado'});
    }

    const userId = req.session.user.id;

    const cartItems = await cart.getCartToPay(userId);

    if (cartItems.length === 0) { 
      return res.status(400).json({success: false, message: 'El carrito está vacío'});
    }

    const ciudadData = await orders.getCiudadEnvioById(orderData.ciudad_envio_id);
    if (!ciudadData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }
    const costoEnvio = parseFloat(ciudadData.costo_envio);

    const totalReal = parseFloat(orderData.total);
    const pagado = parseFloat(paymentDetails.purchase_units[0].amount.value);

    const totalCalculado = cartItems.reduce((sum, item) => {
      const precioFinal = item.descuento > 0
        ? item.precio * (1 - item.descuento / 100)
        : item.precio;
      return sum + (precioFinal * item.cantidad);
    }, 0) + costoEnvio;

    if (Math.abs(pagado - totalCalculado) > 0.01) {
      return res.status(400).json({success: false,
        message: 'Monto pagado no coincide con el total real de la orden'});
    }

    await orders.checkStock(cartItems);

    if (pagado !== totalReal) {
      return res.status(400).json({success: false, 
        message: 'Monto pagado no coincide con el total de la orden'});
    }

    const orderId = await orders.createOrder({...orderData, status: 'pagado'}, orderItems);

    await orders.createPayment(orderId, {paymentMethod: 'paypal',
      paymentId: paymentId, payerId: payerId});    

    await orders.updateStock(orderId, userId);

    await cart.clearCart(userId);

    res.json({success: true, message: 'Pago procesado correctamente',
      orderId, redirectUrl: `/api/order/orderDetails/${orderId}`
    });
  } catch (error) {
    console.error('Error al procesar pago:', error);
    
    if (error.stockItems) {
      return res.status(400).json({success: false,
        message: error.message, stockItems: error.stockItems});
    }
    
    res.status(500).json({success: false, message: 'Error al procesar el pago',
      error: error.message
    });
  }
};

orderController.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.session.user.id;

    const order = await orders.getOrderById(orderId, userId);
    if (!order) {
      return res.status(404).json({ 
        success: false, message: 'Orden no encontrada'});
    }

    res.json({success: true, order});
  } catch (error) {
    console.error('Error al obtener detalles de orden:', error);
    res.status(500).json({success: false, 
      message: 'Error al obtener detalles de la orden'});
  }
};

orderController.showUserOrders = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userOrders = await orders.getUserOrders(userId);

    res.render('store/showOrders', {user: req.session.user, orders: userOrders});
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).render('error', { message: 'Error al cargar tus pedidos' });
  }
};

orderController.showOrderDetails = async (req, res) => {
  try {
    const order = await orders.getOrderById(req.params.orderId, req.session.user.id);

    if (!order) {
      return res.status(404).render('error', { message: 'Pedido no encontrado' });
    }

    res.render('store/orderDetails', {user: req.session.user, order});
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).render('error', { message: 'Error al cargar el pedido' });
  }
};

export default orderController;