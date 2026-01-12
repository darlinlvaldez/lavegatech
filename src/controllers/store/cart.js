import cart from '../../models/store/cart.js';
import product from "../../models/store/product.js";
import variantModel from "../../models/store/utils/getVariant.js";
import { itsNewProduct } from "../../utils/filterRecent.js";

const cartController = {};

cartController.syncCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const localItems = Array.isArray(req.body.items) ? req.body.items : [];

    if (localItems.length === 0) {
      return res.json({ success: true, count: await cart.getCount(userId) });
    }

    for (const item of localItems) {
      const variantId = Number(item.variantId);
      const productId = Number(item.productId);
      const quantity = Number(item.quantity);

      if (!variantId || !quantity || quantity < 1) continue;

      const variant = await variantModel.getById(variantId);
      if (!variant || variant.stock <= 0) continue;

      const existingItem = await cart.itemExists(userId, productId, variantId);

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity, variant.stock);
          
        await cart.updateQuantity(existingItem.id, userId, newQuantity);
      } else {
        const finalQuantity = Math.min(quantity, variant.stock);
        await cart.addItem({
          userId,
          productId: variant.producto_id,
          variantId,
          quantity: finalQuantity,
        });
      }
    }

    res.json({ success: true, count: await cart.getCount(userId) });
  } catch (err) {
    console.error("Error en syncCart:", err);
    res.status(500).json({ success: false, message: "Error al sincronizar" });
  }
};

cartController.addToCart = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const variantId = Number(req.body.variantId);
    const quantity = Number(req.body.quantity || 1);

    if (!Number.isInteger(variantId) || quantity < 1) {
      return res.status(400).json({ success: false, message: "Datos inválidos" });
    }

    const variant = await variantModel.getById(variantId);
    if (!variant || variant.stock <= 0) {
      return res.status(400).json({ success: false, message: "Producto agotado" });
    }

    const existingItem = await cart.itemExists(userId, variantId);
    const finalQuantity = Math.min(
      existingItem ? existingItem.quantity + quantity : quantity,
      variant.stock
    );

    if (existingItem) {
      await cart.updateQuantity(existingItem.id, userId, finalQuantity);
    } else {
      await cart.addItem({
        userId,
        productId: variant.producto_id,
        variantId,
        quantity: finalQuantity
      });
    }

    res.json({success: true,
      count: await cart.getCount(userId)
    });
  } catch (err) {
    console.error(err);
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
    const { variantId, quantity } = req.body;
    const userId = req.session.user.id;

    if (!variantId || quantity === undefined || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }

    const variant = await variantModel.getById(variantId);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant no encontrada' });
    }

    const item = await cart.itemExists(userId, variant.producto_id, variantId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado en carrito' });
    }

    const finalQuantity = Math.min(quantity, variant.stock);
    await cart.updateQuantity(item.id, userId, finalQuantity);

    res.json({success: true, 
      quantity: finalQuantity,
      message: finalQuantity !== quantity ? `Cantidad ajustada al stock máximo (${variant.stock})` : 'Cantidad actualizada correctamente'
    });
  } catch (error) {
    console.error('Error en updateQuantity:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar cantidad' });
  }
};

cartController.removeItem = async (req, res) => {
  try {
    const { variantId } = req.body;
    const userId = req.session.user.id;

    if (!variantId) {
      return res.status(400).json({ success: false, message: 'Datos inválidos' });
    }

    const item = await cart.itemExists(userId, variant.producto_id, variantId);
    if (item) {
      await cart.removeItem(item.id, userId);
    }

    res.json({ success: true, message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error en removeItem:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar del carrito' });
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
    const { variantId, bulk } = req.query;

    if (bulk === 'true' && req.session.user) {
      const userId = req.session.user.id;
      const items = await cart.getCartToPay(userId);
      
      const stocks = {};
      items.forEach(item => {
        const key = `${item.productId}_${item.selectedColor}`;
        stocks[key] = item.stock; 
      });

      return res.json({ success: true, stocks });
    }

    if (!variantId) {
      return res.status(400).json({ success: false, message: "variantId es requerido" });
    }

    const variant = await variantModel.getById(Number(variantId));
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variante no encontrada" });
    }

    res.json({ success: true, stock: variant.stock });
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