import cart from '../models/cart.js';
import product from "../models/product.js";

const cartController = {};

cartController.syncCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const localItems = req.body.items;
    const dbItems = await cart.getByUserId(userId);

    for (const dbItem of dbItems) {
      const existsInLocal = localItems.some(
        (item) => item.id === dbItem.producto_id && item.colorSeleccionado === dbItem.colorSeleccionado);

      if (!existsInLocal) {
        await cart.removeItem(dbItem.id, userId);
      }
    }

    for (const item of localItems) {
      const stockReal = await cart.getRealStock(item.id, item.colorSeleccionado);
      const existingItem = await cart.itemExists(userId, item.id, item.colorSeleccionado);

      if (stockReal <= 0) {
        if (existingItem) await cart.removeItem(existingItem.id, userId);
        continue;
      }
      
      if (existingItem) {
        const nuevaCantidad = existingItem.cantidad + item.cantidad;
        const cantidadFinal = Math.min(nuevaCantidad, stockReal);
        
        await cart.updateQuantity(existingItem.id, userId, cantidadFinal);
      } else {
        const cantidadFinal = Math.min(item.cantidad, stockReal);
        await cart.addItem({usuario_id: userId, 
          producto_id: item.id,
          colorSeleccionado: item.colorSeleccionado,
          cantidad: cantidadFinal,
          descuento: item.descuento,
          precio: item.precio,
          imagen: item.imagen,
          nombre: item.nombre});
        }
      }

    res.json({ success: true, count: await cart.getCount(userId) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al sincronizar carrito" });
  }
};

cartController.addToCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado, cantidad = 1, nombre, precio, descuento = 0, imagen } = req.body;

    if (!producto_id || cantidad < 1 || !nombre || !precio) {
      return res.status(400).json({ success: false, message: "Datos inválidos" });
    }

    const stockReal = await cart.getRealStock(producto_id, colorSeleccionado);
    
    if (stockReal <= 0) {
      return res.status(400).json({success: false,
        message: "Este producto está agotado. Haz clic para ver otras variantes disponibles."});
    }

    const existingItem = await cart.itemExists(userId, producto_id, colorSeleccionado);

    if (existingItem) {
      const nuevaCantidad = existingItem.cantidad + cantidad;
      const cantidadFinal = Math.min(nuevaCantidad, stockReal);

      await cart.updateQuantity(existingItem.id, userId, cantidadFinal);
      
      return res.json({success: true,
        count: await cart.getCount(userId), 
        message: cantidadFinal !== nuevaCantidad 
        ? `Solo se agregaron ${cantidadFinal - existingItem.cantidad} unidades (stock máximo: ${stockReal})`
        : 'Producto actualizado en el carrito'});
    } else {
      const cantidadFinal = Math.min(cantidad, stockReal);
      
      await cart.addItem({
        usuario_id: userId, producto_id, colorSeleccionado, cantidad: cantidadFinal,
        descuento, precio, imagen, nombre}); 

      res.json({success: true, count: await cart.getCount(userId),
         message: 'Producto agregado al carrito'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al añadir al carrito" });
  }
};

cartController.getCartItems = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const items = await cart.getByUserId(userId);

    res.json({success: true, items});
  } catch (error) {console.error(error);
    res.status(500).json({success: false,
      message: 'Error al obtener los productos del carrito'});
  }
};

cartController.updateQuantity = async (req, res) => {
  try {
    const { producto_id, colorSeleccionado, cantidad } = req.body;
    await cart.updateQuantity(
      producto_id, req.session.user.id, cantidad, colorSeleccionado);
    res.json({ success: true });
  } catch (error) {res.status(500).json({ 
      success: false, message: 'Error al actualizar cantidad'});
  }
};

cartController.removeItem = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado } = req.body; 

    if (!producto_id) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const item = await cart.itemExists(userId, producto_id, colorSeleccionado);
    if (item) await cart.removeItem(item.id, userId);

    const items = await cart.getByUserId(userId);
    const subtotal = items.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    const total = items.reduce((sum, i) => sum + ((i.precio * (1 - i.descuento/100)) * i.cantidad), 0);
    const count = await cart.getCount(userId);

    res.json({ success: true, subtotal, total, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al eliminar' });
  }
};

cartController.clearAllCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    await cart.clearCart(userId);
    res.json({ success: true, count: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al vaciar carrito' });
  }
};

cartController.getStock = async (req, res) => {
  try {
    const { id, color, bulk } = req.query;
    const userId = req.session.user?.id;

    if (bulk === 'true' && userId) {
      const items = await cart.getByUserId(userId);
      const stockInfo = {};
      
      for (const item of items) {
        const stock = await cart.getRealStock(item.producto_id, item.colorSeleccionado);
        stockInfo[`${item.producto_id}_${item.colorSeleccionado}`] = stock;
      }
      
      return res.json({ success: true, stocks: stockInfo });
    }

    if (!id || !color) {
      return res.status(400).json({
        success: false, message: "Se requieren los parámetros id y color"});
    }

    const stock = await cart.getRealStock(id, color);
    res.json({ success: true, stock });
  } catch (error) {
    console.error("Error al consultar stock:", error);
    res.status(500).json({ success: false, message: "Error al consultar stock" });
  }
};

cartController.getRelated = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    let cartItems = [];

    if (userId) {
      cartItems = await cart.getByUserId(userId);
    }

    const lastCart = cartItems[0];
    let productRelacionados = [];

    if (lastCart && lastCart.categoria_id) {
      productRelacionados = await product.obtenerRelacionados(
        [lastCart.carrito_id], [lastCart.categoria_id]);
    }

    res.render("store/cart", {cartItems, productRelacionados, isAuthenticated: !!userId});
  } catch (error) {
    console.error("Error al cargar la página del carrito:", error);
    res.status(500).render("error", { mensaje: error.message });
  }
};

export default cartController;