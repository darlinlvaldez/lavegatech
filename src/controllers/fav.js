import fav from "../models/fav.js"

const favController = {};

favController.addToFav = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { producto_id, colorSeleccionado, nombre, precio, descuento = 0, imagen } = req.body;

    if (!producto_id || !nombre || !precio) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos inválidos'
      });
    }

    const existingItem = await fav.itemExists(userId, producto_id, colorSeleccionado);

    if (!existingItem) {
      await fav.addItem({usuario_id: userId, producto_id, colorSeleccionado, descuento, 
        precio, imagen, nombre});
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

export default favController;