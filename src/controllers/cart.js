import cart from '../models/cart.js';
import product from "../models/product.js";

const cartController = {};

cartController.syncCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const localItems = req.body.items;
    const dbItems = await cart.getByUserId(userId);

    for (const dbItem of dbItems) {
      const existsInLocal = localItems.some(item => 
        item.id === dbItem.producto_id && 
        item.colorSeleccionado === dbItem.colorSeleccionado);
      
      if (!existsInLocal) {
        await cart.removeItem(dbItem.id, userId);
      }
    }

    for (const item of localItems) {
      const existingItem = await cart.itemExists(userId, item.id, item.colorSeleccionado); 
      
      if (existingItem) {
        const nuevaCantidad = existingItem.cantidad + item.cantidad;
        const cantidadFinal = Math.min(nuevaCantidad, item.stock || existingItem.stock);

        await cart.updateQuantity(existingItem.id, userId, cantidadFinal);
      } else {
        await cart.addItem({usuario_id: userId, producto_id: item.id,
          colorSeleccionado: item.colorSeleccionado, cantidad: item.cantidad,
          descuento: item.descuento, precio: item.precio, imagen: item.imagen,
          nombre: item.nombre, stock: item.stock});
        }
      }
      
      res.json({ success: true, count: await cart.getCount(userId) });
    } catch (error) {console.error(error);
    res.status(500).json({ success: false, message: 'Error al sincronizar carrito' });
  }
};

cartController.addToCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado, cantidad = 1, nombre, precio, descuento = 0, imagen, stock } = req.body;

    if (!producto_id || cantidad < 1 || !nombre || !precio) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos inválidos'
      });
    }

    const stockActual = stock;
    const existingItem = await cart.itemExists(userId, producto_id, colorSeleccionado);

    if (existingItem) {
      const nuevaCantidad = existingItem.cantidad + cantidad;
      const cantidadFinal = Math.min(nuevaCantidad, stockActual); 

      if (nuevaCantidad > stockActual) {
        await cart.updateQuantity(existingItem.id, userId, cantidadFinal);
        return res.json({success: true, count: await cart.getCount(userId),
          message: `Solo se agregaron ${cantidadFinal - existingItem.cantidad} unidades (stock máximo: ${stockActual})`
        });
      }

      await cart.incrementQuantity(existingItem.id, userId, cantidad);
    } else { if (cantidad > stockActual) {
        return res.status(400).json({success: false,
          message: `No hay suficiente stock disponible. Stock máximo: ${stockActual}`
        });
      }

      await cart.addItem({usuario_id: userId, producto_id, colorSeleccionado, 
        cantidad, descuento, precio, imagen, nombre, stock: stockActual});
    }

    res.json({success: true, count: await cart.getCount(userId) });
  } catch (error) {console.error(error);
    res.status(500).json({success: false, message: 'Error al Añadir al carrito'});
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

cartController.getCartPage = async (req, res) => {
    try {
        const userId = req.session.user?.id;
        let cartItems = [];

        if (userId) {
            cartItems = await cart.getByUserId(userId);
        }

        const categoriaIds = [...new Set(cartItems.map(item => item.categoria_id).filter(Boolean))];
        const productoIds = cartItems.map(item => item.id);
        
        let productRelacionados = [];
        if (categoriaIds.length > 0) {
            productRelacionados = await product.obtenerRelacionados(productoIds, categoriaIds);
        }

        res.render('store/cart', {
            cartItems,
            productRelacionados,
            formatPrice: (price) => Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            isAuthenticated: !!userId
        });
    } catch (error) {
        console.error('Error al cargar la página del carrito:', error);
        res.status(500).render('error', { mensaje: error.message });
    }
};

export default cartController;