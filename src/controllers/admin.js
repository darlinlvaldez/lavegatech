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

adminController.crearMarca = async (req, res) => {
  try {
    const { nombre, logo, categorias } = req.body;
    await admin.agregarMarca(nombre, logo, categorias || []);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la marca" });
  }
};

adminController.editarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, logo, categorias } = req.body;
    await admin.editarMarca(id, nombre, logo, categorias || []);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar la marca" });
  }
};

adminController.borrarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.eliminarMarca(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

adminController.agregarCategoria = async (req, res) => {
  try {
    const { categoria, imagen } = req.body;
    await admin.crearCategoria(categoria, imagen);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

adminController.editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, imagen } = req.body;
    await admin.actualizarCategoria(id, categoria, imagen);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar la categoría' });
  }
};

adminController.borrarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.eliminarCategoria(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
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

export default adminController;