import cart from "../models/store/cart.js";
import variantModel from "../models/store/utils/getVariant.js";

const cartService = {};

cartService.addOrUpdateItem = async ({ userId, variantId, quantity }) => {
  const vId = Number(variantId);
  const qty = Number(quantity);

  if (!vId || !qty) return null;

  const variant = await variantModel.getById(vId);
  if (!variant || !variant.activo) return null;

  const existingItem = await cart.itemExists(userId, vId);

  let finalQuantity;

  if (variant.stock > 0) {
    finalQuantity = Math.min(
      existingItem ? existingItem.quantity + qty : qty,
      variant.stock
    );
  } else {
    finalQuantity = existingItem ? existingItem.quantity : qty;
  }

  if (existingItem) {
    await cart.updateQuantity(existingItem.id, userId, finalQuantity);
  } else {
    await cart.addItem({
      userId,
      productId: variant.productId,
      variantId: vId,
      quantity: finalQuantity,
    });
  }

  return true;
};

export default cartService;