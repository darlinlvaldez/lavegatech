import orders from '../../models/store/orders.js';
import cart from '../../models/store/cart.js';
import { getExchangeRate } from '../../services/exchange.js';
import { calculateItemSubtotal } from '../../utils/orderPrices.js';

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
     console.log("Datos recibidos en createOrder:", req.body);
    console.log("Headers:", req.headers); 
    const userId = req.session.user.id;
    const { name, lastName, email, address, district, tel, shippingCityId, differentShipping } = req.body;

    const cartItems = await cart.getCartToPay(userId);
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    const cityData = await orders.getCityId(shippingCityId);
    if (!cityData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }

    const shippingCost = parseFloat(cityData.shippingCost);

      const orderItems = cartItems.map((item) => {
        const subtotal = calculateItemSubtotal({
          price: item.originalPrice,
          quantity: item.quantity,
          tax: item.tax,
          discount: item.discount,
        });

        return {
          productId: item.productId,
          productName: item.name,
          ram: item.ram,
          storage: item.storage,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          unitPrice: Number(item.originalPrice),
          tax: Number(item.tax),
          discount: Number(item.discount),
          subtotal,
        };
      });

    const totalLocal = orderItems.reduce((sum, item) => sum + item.subtotal, 0) + shippingCost;

    const exchangeRate = await getExchangeRate();

    const totalUSD = (totalLocal * exchangeRate).toFixed(2);  

    const orderData = {
      userId,
      name,
      lastName,
      email,
      address,
      district,
      tel,
      total: totalLocal,
      shippingCityId,
      shippingCityName: cityData.name,
      shippingCityCost: shippingCost,
      differentShipping,
    };

    console.log("TOTAL LOCAL:", totalLocal);
    console.log("EXCHANGE RATE:", exchangeRate);
    console.log("TOTAL USD:", totalUSD);

    res.json({success: true, orderData, orderItems, 
      totalLocal, totalUSD, exchangeRate });

  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ success: false, message: 'Error al procesar la orden' });
  }
};

orderController.getCities = async function (req, res) {
  try {
    const cities = await orders.listCities();
    res.json({ success: true, cities });
  } catch (error) {
    console.error('Error al cargar ciudades:', error);
    res.status(500).json({ success: false, message: 'Error al cargar ciudades' });
  }
}

orderController.processPayment = async (req, res) => {
  try {
    console.log("BODY RECIBIDO EN /api/order/payment:", req.body);
    const { orderData, orderItems, paymentDetails, payerId, paymentId, paidUSD } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const userId = req.session.user.id;
    const cartItems = await cart.getCartToPay(userId);

    if (cartItems.length === 0) { 
      return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    const cityData = await orders.getCityId(orderData.shippingCityId);
    if (!cityData) {
      return res.status(400).json({ success: false, message: 'Ciudad de envío no válida' });
    }

    const shippingCost = parseFloat(cityData.shippingCost);

    const subtotalProducts = cartItems.reduce((sum, item) => {
      return ( sum + calculateItemSubtotal({
          price: item.originalPrice,
          quantity: item.quantity,
          tax: item.tax,
          discount: item.discount,
        })
      );
    }, 0);

    const totalLocal = subtotalProducts + shippingCost;

    const exchangeRate = orderData.exchangeRate || await getExchangeRate();

    const paidLocal = paidUSD / exchangeRate;

    if (Math.abs(paidLocal - totalLocal) > 50) {
      return res.status(400).json({
        success: false,
        message: 'Monto pagado no coincide con el total real de la orden'
      });
    }

    await orders.checkStock(cartItems);

    const orderId = await orders.createOrder(
      {...orderData, state: "pagado", total: totalLocal,
        shippingCityId: cityData.id}, 
        orderItems,shippingCost);

    await orders.createPayment(orderId, {
      paymentMethod: 'paypal', paymentId, payerId});

    await orders.updateStock(orderId, userId);
    await cart.clearCart(userId);

    res.json({success: true,
      message: 'Pago procesado correctamente', orderId, 
      redirectUrl: `/api/order/orderDetails/${orderId}`
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

    res.status(500).json({success: false,
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
    const order = await orders.getOrderById(req.params.orderId, req.session.user.id);

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