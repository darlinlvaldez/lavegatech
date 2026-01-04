import fav from "../../models/store/fav.js"
import product from "../../models/store/product.js";
import { itsNewProduct } from "../../utils/filterRecent.js";

const favController = {};

favController.addToFav = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const { productId, selectedColor } = req.body;

        if (!productId || !selectedColor) {
            return res.status(400).json({ 
                success: false, message: 'Datos inválidos'
            });
        }

        const variant = await fav.getVariant(productId, selectedColor);
        const variantId = variant ? variant.id : null;

        if (!variantId) {
            return res.status(400).json({success: false,
                message: 'Variante no encontrada para el color seleccionado'
            });
        }

        const existingItem = await fav.itemExists(userId, productId, variantId);

        if (!existingItem) {
            await fav.addItem({userId: userId, 
              productId, variantId
            });
        }

        res.json({success: true, 
          count: await fav.getCount(userId)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false,
            message: 'Error al agregar a favoritos'
        });
    }
};

favController.removeFromFav = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { productId, variantId } = req.body; 

    await fav.removeItem(userId, productId, variantId); 
    
    res.json({success: true, count: await fav.getCount(userId) });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Error al eliminar de favoritos'});
  }
};

favController.clearAllFav = async (req, res) => {
  try {
    const userId = req.session.user.id;
    await fav.clearAll(userId);
    res.json({ success: true, count: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al vaciar favoritos' });
  }
};

favController.getFavItems = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const items = await fav.getByUserId(userId);
    
    res.json({success: true, items});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Error al obtener favoritos'});
  }
};

favController.getFavPage = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    let favItems = [];

    if (userId) {
      favItems = await fav.getByUserId(userId);
    }

    const lastFav = favItems[0]; 
    let productRelated = [];

    if (lastFav && lastFav.categoryId) {
      productRelated = await product.getRelated(
        [lastFav.id], [lastFav.categoryId]);
    }

    productRelated.forEach((p) => {
      p.itsMobile = p.category?.toLowerCase() === "moviles";
      p.itsNew = itsNewProduct(p.publicationDate, 30);
    });

    res.render('store/fav', {
      favItems, productRelated, isAuthenticated: true
    });
  } catch (error) {
    console.error('Error al cargar la página del carrito:', error);
    res.status(500).render('error', { mensaje: error.message });
  }
};

export default favController;