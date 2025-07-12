import admin from '../models/admin.js';

const adminController = {};

// Productos

adminController.listarItems = async (req, res) => {
  try {
    const productos = await admin.obtenerItems();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

adminController.crearItems = async (req, res) => {
  try {
    const { nombre, precio, descuento, descripcion, categoria, marca} = req.body;
    const insertId = await admin.agregarItems({ nombre, 
        precio, descuento, descripcion, categoria, marca});

    res.json({ success: true, id: insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

adminController.editarItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descuento, descripcion, categoria, marca, fecha} = req.body;
    const affectedRows = await admin.actualizarItems({ id, nombre, precio, descuento, 
        descripcion, categoria, marca, fecha});

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

adminController.borrarItems = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await admin.eliminarItems(id);
    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// Variantes

adminController.listarVariantes = async (req, res) => {
  try {
    const variantes = await admin.obtenerVariantes();
    res.json(variantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener variantes' });
  }
};

adminController.crearVariante = async (req, res) => {
  try {
    const { producto_id, color, stock, img } = req.body;

    const success = await admin.agregarVariante({ producto_id, color, stock, img });

    res.status(201).json({ success });
  } catch (error) {
    console.error("Error al crear variante:", error);
    res.status(500).json({ error: 'Error al crear variante' });
  }
};

adminController.borrarVariante = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await admin.eliminarVariante(id);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar variante' });
  }
};

adminController.editarVariante = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, stock, img, producto_id } = req.body;

    const success = await admin.actualizarVariante({
      id, color, stock, img, producto_id});

    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar variante' });
  }
};

// Usuarios

adminController.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await admin.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Pedidos

adminController.listarPedidos = async (req, res) => {
  try {
    const pedidos = await admin.obtenerPedidos();
    res.render("admin/pedidos", { orders: pedidos }); 
  } catch (error) {
    res.status(500).send("Error al cargar pedidos");
  }
};

adminController.detallePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await admin.obtenerPedidoId(id);

    if (!pedido) return res.status(404).send("Pedido no encontrado");

    const items = await admin.productoPedido(id);
    res.render("admin/detallePedido", {
      order: { ...pedido, items },
    });
  } catch (error) {
    res.status(500).send("Error al cargar detalles del pedido");
  }
};

// Usuarios

adminController.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const success = await admin.estadoUsuario(id, is_active);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado del usuario' });
  }
};

adminController.listarCategorias = async (req, res) => {
  try {
    const categorias = await admin.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

adminController.listarMarcas = async (req, res) => {
  try {
    const marcas = await admin.obtenerMarcas();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
};

export default adminController;