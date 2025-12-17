import path from 'path';
import fs from 'fs';
import sharp from "sharp";
import ExcelJS from "exceljs";
import axios from "axios";
import admin from '../../models/admin/admin.js';
import styles from '../../utils/excelReport/styles.js';
import {generarTituloExcel} from '../../utils/excelReport/filterTitle.js';
import {formatDateForExcel} from '../../utils/excelReport/formatDate.js';

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
  const { rango, mes, fecha, anio, desde, hasta } = req.query;

  try {
    const ventas = await admin.graficoVentas(rango, mes, fecha, anio, desde, hasta);
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas por fecha:', error);
    res.status(500).json({ error: 'Error al obtener ventas por fecha' });
  }
};

adminController.topProductos = async (req, res) => {
    try {
        const top = await admin.getTopProductos(10);
        const productos = await admin.getTopProductos();

        res.json({top10: top, todos: productos});
    } catch (error) {
        console.error('Error al obtener top productos:', error);
        res.status(500).json({ error: 'Error al obtener top productos' });
    }
};

adminController.exportExcel = async (req, res) => {
  const { tipo, rango, mes, fecha, anio, desde, hasta } = req.query;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Reporte');

  const titulo = generarTituloExcel({ tipo, rango, mes, fecha, anio, desde, hasta });
  const titleRow = sheet.addRow([titulo]);
  sheet.mergeCells('A1:B1');
  styles.styleTitleCell(titleRow.getCell(1));
  sheet.addRow([]);

  const agregarFilasVentas = (data) => {
    const isHora = rango === 'fecha-especifica';
    sheet.addRow([isHora ? "Hora" : "Fecha", "Ventas"]);

    data.forEach(r => {
      const valorFecha = isHora
        ? new Date(1970, 0, 1, r.hora).toLocaleTimeString("es-DO", 
          { hour: "numeric", minute: "2-digit", hour12: true })
        : formatDateForExcel(r.fecha);

      sheet.addRow([valorFecha, Number(r.totalVentas)]);
    });

    sheet.addRow([]);
    const totalRow = sheet.addRow(['TOTAL', data.reduce((sum, r) => sum + Number(r.totalVentas), 0)]);
    sheet.getColumn(2).numFmt = '"$"#,##0.00';
    styles.styleTotalRow(totalRow);
  };
  
  const agregarFilasProductos = async (limit = null) => {
    const productos = await admin.getTopProductos(limit); // si limit es null, trae todos
    sheet.addRow(["#", "Producto", "Cantidad", "Ingresos"]);

    productos.forEach((p, i) => {
      sheet.addRow([i + 1, `${p.nombre_producto} ${p.especificaciones || ""}`, 
        Number(p.totalVendido), Number(p.totalPrecio)]);
    });

    sheet.addRow([]);
    const totalCantidad = productos.reduce((sum, p) => sum + Number(p.totalVendido), 0);
    const totalIngresos = productos.reduce((sum, p) => sum + Number(p.totalPrecio), 0);
    const totalRow = sheet.addRow(["TOTAL", "", totalCantidad, totalIngresos]);
    sheet.getColumn(4).numFmt = '"$"#,##0.00';
    styles.styleTotalRow(totalRow);

    return productos.length;
  };

  let filasCount = 0;

  if (tipo === 'fecha') {
    const data = await admin.graficoVentas(rango, mes, fecha, anio, desde, hasta);
    agregarFilasVentas(data);
    filasCount = data.length;
  }

 if (tipo === "productos") {
   const limit = req.query.limit ? Number(req.query.limit) : null;
   filasCount = await agregarFilasProductos(limit);
 }

  const headerRow = sheet.getRow(3);
  styles.styleHeaderRow(headerRow);

  for (let i = 0; i < filasCount; i++) {
    const row = sheet.getRow(4 + i);
    styles.styleDataRow(row, (4 + i) % 2 === 0);
  }

  sheet.autoFilter = { from: 'A3', to: `${String.fromCharCode(64 + sheet.columnCount)}3` };
  sheet.columns.forEach(col => {
    let max = 10;
    col.eachCell({ includeEmpty: true }, cell => max = Math.max(max, (cell.value || '').toString().length));
    col.width = max + 2;
  });

  const hoy = new Date();
  const fechaActual = hoy.toLocaleDateString("es-DO", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "-");

  res.setHeader("Content-Disposition", `attachment; filename=Reporte_${fechaActual}.xlsx`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  await workbook.xlsx.write(res);
  res.end();
};

adminController.estadoEnvio = async (req, res) => {
  const pedido_id = req.params.id;
  const { estado_envio } = req.body;

  if (!estado_envio || !['pendiente', 'enviado', 'entregado', 'cancelado'].includes(estado_envio)) {
    return res.status(400).json({ error: 'Estado de envío no válido' });
  }

  try {
    await admin.actualizarEstadoEnvio(estado_envio, pedido_id);
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
    const { nombre, precio, descuento, impuesto, descripcion, categoria, 
      marca, ram, almacenamiento, fecha_publicacion} = req.body;

    const insertId = await admin.agregarItems({ nombre, precio, descuento, impuesto, descripcion, 
      categoria, marca, almacenamiento_id: almacenamiento, ram_id: ram, fecha_publicacion});

    res.json({ success: true, id: insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

adminController.editarItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, impuesto, descuento, descripcion, categoria, 
      marca, ram, almacenamiento, fecha_publicacion} = req.body;
      
      const affectedRows = await admin.actualizarItems({ id, nombre, precio, impuesto, descuento, 
      descripcion, categoria, marca, almacenamiento_id: almacenamiento, ram_id: ram, fecha_publicacion});

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

adminController.productoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizarItem = await admin.itemEstado(id);

    if (!actualizarItem) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(actualizarItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar estado del producto" });
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

    if (/^https?:\/\//.test(img)) {
      const response = await axios.get(img, { responseType: "arraybuffer" });
      await adminController.validarImagen(Buffer.from(response.data));
    }

    const success = await admin.agregarVariante({ producto_id, color, stock, img });
    res.status(201).json({ success });

  } catch (error) {
    console.error("Error al crear variante:", error);
    res.status(400).json({ error: error.message || "Error al crear variante" });
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

    if (/^https?:\/\//.test(img)) {
      const response = await axios.get(img, { responseType: "arraybuffer" });
      await adminController.validarImagen(Buffer.from(response.data));
    }

    const success = await admin.actualizarVariante({
      id, color, stock, img, producto_id});

    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al editar variante' });
  }
};

adminController.validarImagen = async (buffer) => {
  const metadata = await sharp(buffer).metadata();
  const { width, height } = metadata;

  if (width < 400 || height < 400 || width > 500 || height > 500) {
    throw new Error(`La imagen debe tener entre 400x400 y 500x500 píxeles. (Actual: ${width}x${height})`);
  }

  return true;
};

adminController.imagenArchivo = async (req, res) => {
   try {
    if (!req.files || !req.files.img) {
      return res.status(400).json({ error: "No se ha subido ningún archivo" });
    }

    const imgFile = req.files.img;
    const allowedExtensions = /png|jpg|jpeg/;
    const ext = path.extname(imgFile.name).toLowerCase();

    if (!allowedExtensions.test(ext)) {
      return res.status(400).json({ error: "Formato de imagen no permitido" });
    }

    await adminController.validarImagen(imgFile.data);

    const uploadPath = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `${Date.now()}_${imgFile.name}`;
    const savePath = path.join(uploadPath, fileName);

    await imgFile.mv(savePath);

    return res.status(200).json({ path: `/uploads/${fileName}` });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message || "Error al subir la imagen" });
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
    const { nombre, categorias } = req.body;
    await admin.agregarMarca(nombre, categorias || []);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la marca" });
  }
};

adminController.editarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categorias } = req.body;
    await admin.editarMarca(id, nombre, categorias || []);
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
    const { categoria } = req.body;
    await admin.crearCategoria(categoria);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

adminController.editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;
    await admin.actualizarCategoria(id, categoria);
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
    const { activo } = req.body;

    const success = await admin.estadoUsuario(id, activo);

    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado del usuario" });
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

adminController.estadoCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const affectedRows = await admin.estadoCiudad(id, activo);

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado de la ciudad' });
  }
};

export default adminController;