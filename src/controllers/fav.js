import fav from "../models/fav.js"
import product from "../models/product.js";

const favController = {};

favController.addToFav = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado, nombre, ram, almacenamiento, precio, descuento = 0, imagen } = req.body;

    if (!producto_id || !nombre || !precio) {
      return res.status(400).json({ 
        success: false, message: 'Datos inválidos'});
    }

    const existingItem = await fav.itemExists(userId, producto_id, colorSeleccionado);

    if (!existingItem) {
      await fav.addItem({usuario_id: userId, producto_id, colorSeleccionado, descuento, 
        precio, imagen, nombre, ram, almacenamiento});
    }

    res.json({success: true, count: await fav.getCount(userId) });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Error al agregar a favControlleroritos'});
  }
};

favController.removeFromFav = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado } = req.body;

    await fav.removeItem(userId, producto_id, colorSeleccionado);
    
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
    let productRelacionados = [];

    if (lastFav && lastFav.categoria_id) {
      productRelacionados = await product.obtenerRelacionados(
        [lastFav.id], [lastFav.categoria_id]);
    }

    res.render('store/fav', {
      favItems, productRelacionados, isAuthenticated: true
    });
  } catch (error) {
    console.error('Error al cargar la página del carrito:', error);
    res.status(500).render('error', { mensaje: error.message });
  }
};

export default favController;