import adminProductosModel from '../models/admin.js';

const adminProductosController = {};

adminProductosController.listar = async (req, res) => {
  try {
    const productos = await adminProductosModel.obtenerTodos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

adminProductosController.crear = async (req, res) => {
  try {
    const { nombre, precio, descuento, descripcion, categoria, marca} = req.body;
    const insertId = await adminProductosModel.agregar({ nombre, 
        precio, descuento, descripcion, categoria, marca});

    res.json({ success: true, id: insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

adminProductosController.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descuento, descripcion, categoria, marca, fecha} = req.body;
    const affectedRows = await adminProductosModel.actualizar({ id, nombre, precio, descuento, 
        descripcion, categoria, marca, fecha});

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

adminProductosController.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await adminProductosModel.eliminar(id);
    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

export default adminProductosController;
