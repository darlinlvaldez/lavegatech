import cart from '../../models/store/cart.js';
import product from "../../models/store/product.js";
import { itsNewProduct } from "../../utils/filterRecent.js";

const cartController = {};

cartController.syncCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const localItems = req.body.items;
    const dbItems = await cart.getByUserId(userId);

    for (const dbItem of dbItems) {
      const existsInLocal = localItems.some(
        (item) => item.productId === dbItem.productId && item.selectedColor === dbItem.selectedColor);

      if (!existsInLocal) {
        await cart.removeItem(dbItem.id, userId);
      }
    }

    for (const item of localItems) {
      const variant = await cart.getVariant(item.productId, item.selectedColor);
      if (!variant) continue;
      
      const stockReal = variant.stock;
      const variantId = variant.id;

      const existingItem = await cart.itemExists(userId, item.productId, variantId);

      if (stockReal <= 0) {
        if (existingItem) await cart.removeItem(existingItem.id, userId);
        continue;
      }
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        const finalQuantity = Math.min(newQuantity, stockReal);
        
        await cart.updateQuantity(existingItem.id, userId, finalQuantity);
      } else {
        const finalQuantity = Math.min(item.quantity, stockReal);
        await cart.addItem({
          userId: userId, 
          productId: item.productId,
          variantId: variantId,
          quantity: finalQuantity,
          discount: item.discount,
          price: item.price,
          image: item.image,
          name: item.name,
          ram: item.ram,
          storage: item.storage
        });
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
    const { productId, selectedColor, quantity = 1 } = req.body;

    if (!productId || !selectedColor || quantity < 1) {
      return res.status(400).json({ success: false, message: "Datos inválidos" });
    }

    const variant = await cart.getVariant(productId, selectedColor);
    
    if (!variant) {
      return res.status(404).json({success: false,
        message: "variant no encontrada para este producto y color"
      });
    }

    const { id: variantId, stock: stockReal } = variant;

    if (stockReal <= 0) {
      return res.status(400).json({success: false,
        message: "Este producto está agotado. Haz clic para ver otras variants disponibles."
      });
    }

    const existingItem = await cart.itemExists(userId, productId, variantId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      const finalQuantity = Math.min(newQuantity, stockReal);

      await cart.updateQuantity(existingItem.id, userId, finalQuantity);
      return res.json({
        success: true,
        count: await cart.getCount(userId),
        message: finalQuantity !== newQuantity
          ? `Solo se agregaron ${finalQuantity - existingItem.quantity} unidades (stock máximo: ${stockReal})`
          : "Producto actualizado en el carrito"
      });
    } else {
      const finalQuantity = Math.min(quantity, stockReal);

      await cart.addItem({userId, productId, variantId, quantity: finalQuantity});

      return res.json({
        success: true,
        count: await cart.getCount(userId),
        message: "Producto agregado al carrito"
      });
    }
  } catch (error) {
    console.error("Error en addToCart:", error);
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
    const { productId, selectedColor, quantity } = req.body;

    if (!productId || !selectedColor || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }

    const variant = await cart.getVariant(productId, selectedColor);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'variant no encontrada' });
    }

    const item = await cart.itemExists(req.session.user.id, productId, variant.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado en carrito' });
    }

    await cart.updateQuantity(item.id, req.session.user.id, quantity);

    res.json({ success: true });
  } catch (error) {
    console.error('Error en updateQuantity:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar quantity' });
  }
};

cartController.removeItem = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { productId, selectedColor } = req.body; 

    if (!productId || !selectedColor) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }

    const variant = await cart.getVariant(productId, selectedColor);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'variant no encontrada' });
    }

    const item = await cart.itemExists(userId, productId, variant.id);
    if (item) await cart.removeItem(item.id, userId);

    const items = await cart.getByUserId(userId);
    const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const total = items.reduce((sum, i) => sum + ((i.price * (1 - i.discount/100)) * i.quantity), 0);
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
        const stock = await cart.getRealStock(item.productId, item.selectedColor);
        stockInfo[`${item.productId}_${item.selectedColor}`] = stock;
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
    let productRelated = [];

    if (lastCart && lastCart.categoryId) {
      productRelated = await product.getRelated(
        [lastCart.cartId], [lastCart.categoryId]);
    }

     productRelated.forEach((p) => {
       p.itsMobile = p.category?.toLowerCase() === "moviles";
       p.itsNew = itsNewProduct(p.publicationDate, 30);
     });

    res.render("store/cart", {cartItems, productRelated, isAuthenticated: !!userId});
  } catch (error) {
    console.error("Error al cargar la página del carrito:", error);
    res.status(500).render("error", { mensaje: error.message });
  }
};

export default cartController;