import path from 'path';
import fs from 'fs';
import admin from '../../models/admin.js';

const adminController = {};

// Panel Admin

adminController.adminDashboard = async (req, res) => {
  try {
    const result = await admin.dashboard();
    res.render('admin/panel', { result });
  } catch (err) {
    res.status(500).send('Error al cargar el panel de administración');
  }
};

adminController.graficoVentas = async (req, res) => {
  const { rango, mes, fecha } = req.query;

  try {
    const ventas = await admin.graficoVentas(rango, mes, fecha);
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas por fecha:', error);
    res.status(500).json({ error: 'Error al obtener ventas por fecha' });
  }
};

adminController.estadoEnvio = async (req, res) => {
  const pedidoId = req.params.id;
  const { estado_envio } = req.body;

  if (!estado_envio || !['pendiente', 'enviado', 'entregado', 'cancelado'].includes(estado_envio)) {
    return res.status(400).json({ error: 'Estado de envío no válido' });
  }

  try {
    await admin.actualizarEstadoEnvio(estado_envio, pedidoId);
    res.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando estado de envío:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

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
    const { nombre, precio, descuento, descripcion, categoria, marca, ram, almacenamiento} = req.body;
    const insertId = await admin.agregarItems({ nombre, precio, descuento,
      descripcion, categoria, marca, almacenamiento_id: almacenamiento, ram_id: ram});

    res.json({ success: true, id: insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

adminController.editarItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descuento, descripcion, categoria, marca, ram, almacenamiento, fecha} = req.body;
    const affectedRows = await admin.actualizarItems({ id, nombre, precio, descuento, 
      descripcion, categoria, marca, almacenamiento_id: almacenamiento, ram_id: ram, fecha});

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

//Ram y Almacenamiento

adminController.listarRAM = async (req, res) => {
  try {
    const ram = await admin.obtenerRAM();
    res.json(ram);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener RAM" });
  }
};

adminController.listarAlm = async (req, res) => {
  try {
    const almacenamientos = await admin.obtenerAlm();
    res.json(almacenamientos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener almacenamiento" });
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

adminController.cargarImagen = async (req, res) => {
  try {
    if (!req.files || !req.files.img) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const imgFile = req.files.img;

    const allowedExtensions = /png|jpg|jpeg/;
    const ext = path.extname(imgFile.name).toLowerCase();

    if (!allowedExtensions.test(ext)) {
      return res.status(400).json({ error: 'Formato de imagen no permitido' });
    }

    const uploadPath = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${Date.now()}_${imgFile.name}`;

    await imgFile.mv(path.join(uploadPath, fileName));

    return res.status(200).json({ path: `/uploads/${fileName}` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al subir la imagen' });
  }
};

// Pedidos

adminController.listarPedidos = async (req, res) => {
  try {
    const pedidos = await admin.obtenerPedidos();
    res.render("admin/orders", { orders: pedidos }); 
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
    res.render("admin/orderDetails", {
      order: { ...pedido, items },
    });
  } catch (error) {
    res.status(500).send("Error al cargar detalles del pedido");
  }
};

// Categorías y marcas

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

// Ciudades de Envío

adminController.listarCiudades = async (req, res) => {
  try {
    const ciudades = await admin.obtenerCiudades();
    res.json(ciudades);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ciudades de envío' });
  }
};

adminController.crearCiudad = async (req, res) => {
  try {
    const { nombre, costo_envio } = req.body;
    const insertId = await admin.agregarCiudad({ nombre, costo_envio });

    res.json({ success: true, id: insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear ciudad de envío' });
  }
};

adminController.editarCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, costo_envio } = req.body;
    const affectedRows = await admin.actualizarCiudad({ id, nombre, costo_envio });

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar ciudad de envío' });
  }
};

adminController.borrarCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await admin.eliminarCiudad(id);
    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar ciudad de envío' });
  }
};

export default adminController;