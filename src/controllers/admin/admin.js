import path from 'path';
import fs from 'fs';
import sharp from "sharp";
import ExcelJS from "exceljs";
import axios from "axios";
import admin from '../../models/admin/admin.js';
import styles from '../../utils/excelReport/styles.js';
import {salesTitle} from '../../utils/excelReport/filterTitle.js';
import {formatDateForExcel} from '../../utils/excelReport/formatDate.js';
import { salesSummary } from "../../services/salesSummary.js";

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

// Charts

adminController.graficoVentas = async (req, res) => {
  const { rango, mes, fecha, anio, desde, hasta } = req.query;

  try {
    const rows = await admin.graficoVentas(
      rango, mes, fecha, anio, desde, hasta
    );

    const resumen = salesSummary(rows);

    res.json({ rows, resumen });
  } catch (error) {
    console.error("Error al obtener ventas por fecha:", error);
    res.status(500).json({ error: "Error al obtener ventas por fecha" });
  }
};

adminController.topProductos = async (req, res) => {
  try {
    const {limite, categoria, marca} = req.query;

    const categorias = categoria ? categoria.split(',') : [];
    const marcas = marca ? marca.split(',') : [];

    const productos = await admin.getTopProductos({
      limit: limite || null, categorias, marcas});

    res.json({ top10: productos.slice(0, 10), todos: productos });

  } catch (error) {
    console.error('Error al obtener top productos:', error);
    res.status(500).json({ error: 'Error al obtener top productos' });
  }
};

adminController.allProductsView = async (req, res) => {
  try {
    const cantCategoria = await admin.cantidadCategoriaVendida();
    const cantMarcas = await admin.cantidadMarcasVendidas();

    res.render('admin/allProducts', {
      cantCategoria,
      cantMarcas
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error cargando filtros');
  }
};

adminController.marcaCategoria = async (req, res) => {
  try {
    const categorias = req.query.categoria
      ? req.query.categoria.split(',').map(Number) : [];

    const marcas = await admin.cantidadMarcasVendidas({ categorias });
    res.json({ marcas });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error cargando marcas" });
  }
};

adminController.exportSalesExcel = async (req, res) => {
  const { rango, mes, fecha, anio, desde, hasta } = req.query;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Ventas');

  workbook.creator = 'Sistema de Ventas';
  workbook.lastModifiedBy = 'Administrador';
  workbook.created = new Date();

  const titulo = salesTitle({ tipo: 'fecha', rango, mes, fecha, anio, desde, hasta });
  const titleRow = sheet.addRow([titulo]);
  sheet.mergeCells('A1:E1');
  styles.styleTitleCell(titleRow.getCell(1));
  
  const fechaGeneracion = new Date().toLocaleDateString('es-DO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });   
  
  const subtitleRow = sheet.addRow([`Reporte generado: ${fechaGeneracion}`]);
  sheet.mergeCells('A2:E2');
  styles.styleSubtitleCell(subtitleRow.getCell(1));
  
  sheet.addRow([]);

  const data = await admin.graficoVentas(rango, mes, fecha, anio, desde, hasta);

  if (!data || data.length === 0) {
    return res.status(400).json({
      error: "No hay datos para exportar",
    });
  }

  const resumen = salesSummary(data);

  const headers = sheet.addRow([
    rango === 'fecha-especifica' ? "Hora" : "Fecha", 
    "Ventas", "Porcentaje", "Tendencia"]);
    styles.styleHeaderRow(headers);

  data.forEach((r, index) => {
    const valorFecha = rango === 'fecha-especifica'
      ? new Date(1970, 0, 1, r.hora).toLocaleTimeString("es-DO", { 
          hour: "numeric", minute: "2-digit", hour12: true 
        }) : formatDateForExcel(r.fecha);

    const totalVentas = Number(r.totalVentas);
    const totalGeneral = data.reduce((sum, item) => sum + Number(item.totalVentas), 0);
    const porcentaje = totalGeneral > 0 ? (totalVentas / totalGeneral) * 100 : 0;
    
    const previousSale = index > 0 ? Number(data[index - 1].totalVentas) : null;
    const tendencia = previousSale ? totalVentas - previousSale : 0;

    const row = sheet.addRow([ valorFecha, totalVentas,
      { formula: `C${index + 5}/SUM(C$5:C$${data.length + 4})*100`, result: porcentaje },
      tendencia]);
      styles.styleDataRow(row, index);
    });

  const totalRow = sheet.addRow([
    'TOTAL',
    { formula: `SUM(B5:B${data.length + 4})` },
    '100.00%',
    { formula: `SUM(D5:D${data.length + 4})` }
  ]);
  
  styles.styleTotalRow(totalRow);

  sheet.getColumn('B').numFmt = '"$"#,##0.00;[Red]"$"#,##0.00';
  sheet.getColumn('C').numFmt = '0.00"%";[Red]0.00"%";"-"';
  sheet.getColumn('D').numFmt = '"$"#,##0.00;[Red]"$"#,##0.00';

  sheet.addRow([]);
  sheet.addRow([]);
  
  const summaryTitle = sheet.addRow(['RESUMEN ESTADÍSTICO']);
  sheet.mergeCells(`A${summaryTitle.number}:D${summaryTitle.number}`);
  styles.styleSummaryTitle(summaryTitle.getCell(1));
  
  const totalVendido = data.reduce((sum, r) => sum + Number(r.totalVentas || 0), 0);
  const totalPedidos = data.reduce((sum, r) => sum + Number(r.totalPedidos || 0), 0);
  const ticketPromedio = totalPedidos > 0 ? totalVendido / totalPedidos : 0;
  const ventaMaxima = Math.max(...data.map(r => Number(r.totalVentas || 0)));
  const ventaMinima = Math.min(...data.map(r => Number(r.totalVentas || 0)));
  const fechaMaxima = data.find(r => Number(r.totalVentas) === ventaMaxima);
  const fechaMinima = data.find(r => Number(r.totalVentas) === ventaMinima);

  const resumenData = [
    ["Total vendido:", totalVendido],
    ["Total de pedidos:", totalPedidos],
    ["Ticket promedio:", ticketPromedio],
    ["Venta más alta:", ventaMaxima],
    ["Fecha de venta más alta:", fechaMaxima ? (rango === 'fecha-especifica' 
      ? new Date(1970, 0, 1, fechaMaxima.hora).toLocaleTimeString("es-DO", { 
          hour: "numeric", minute: "2-digit", hour12: true })
      : formatDateForExcel(fechaMaxima.fecha)) : 'N/A'],
    ["Venta más baja:", ventaMinima],
    ["Fecha de venta más baja:", fechaMinima ? (rango === 'fecha-especifica' 
      ? new Date(1970, 0, 1, fechaMinima.hora).toLocaleTimeString("es-DO", { 
          hour: "numeric", minute: "2-digit", hour12: true })
      : formatDateForExcel(fechaMinima.fecha)) : 'N/A'],
    ["Promedio diario:", totalPedidos > 0 ? totalVendido / totalPedidos : 0]
  ];

  resumenData.forEach(([label, value], index) => {
    const row = sheet.addRow([label, value]);
    styles.styleSummaryRow(row, index);
  });

  sheet.autoFilter = { 
    from: { row: 4, column: 1 }, 
    to: { row: data.length + 4, column: 4 } 
  };
  
  sheet.columns.forEach((col, index) => {
    col.width = [20, 15, 15, 15][index] || 15;
  });

  sheet.views = [
    { state: 'frozen', ySplit: 3, xSplit: 0 }
  ];

  const fechaActual = new Date().toLocaleDateString("es-DO").replace(/\//g, "-");
  res.setHeader("Content-Disposition", `attachment; filename=Ventas_${fechaActual}.xlsx`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  await workbook.xlsx.write(res);
  res.end();
};

adminController.exportTopProductsExcel = async (req, res) => {
  const { limit, categoria, marca } = req.query;
  const categoriaIds = categoria ? categoria.split(",") : [];
  const marcas = marca ? marca.split(",") : [];

  const categoriaNombres = await admin.getCategoryNames(categoriaIds);
  
  const productos = await admin.getTopProductos({limit: Number(limit), 
    categorias: categoriaIds, marcas});

  const datosCategorias = [];
  const datosMarcas = [];
  const categoriasMapTop = {};
  const marcasMap = {};

  productos.forEach((p) => {
    if (!categoriasMapTop[p.categoria_id])
      categoriasMapTop[p.categoria_id] = {
        categoria: p.categoria, cantidad: 0,
      };
    categoriasMapTop[p.categoria_id].cantidad += Number(p.totalVendido);

    if (!marcasMap[p.marca_id])
      marcasMap[p.marca_id] = { marca: p.marca, cantidad: 0 };
    marcasMap[p.marca_id].cantidad += Number(p.totalVendido);
  });

  datosCategorias.push(...Object.values(categoriasMapTop));
  datosMarcas.push(...Object.values(marcasMap));

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Top Productos');

  const titulo = salesTitle({
    tipo: "productos",
    categorias: categoriaNombres, 
    totalProductos: productos.length
  });

  const titleRow = sheet.addRow([titulo]);
  sheet.mergeCells("A1:H1");
  styles.styleTitleCell(titleRow.getCell(1));
  
  let filtroInfo = [];
  if (categoriaIds.length > 0 && categoriaNombres.length > 0) {
    filtroInfo.push(`Categorías: ${categoriaNombres.join(', ')}`);
  }
  if (marcas.length > 0) {
    filtroInfo.push(`Marcas: ${marcas.join(', ')}`);
  }
  if (limit) {
    filtroInfo.push(`Límite: Top ${limit} productos`);
  }
  
  if (filtroInfo.length > 0) {
    const filterRow = sheet.addRow([filtroInfo.join(' | ')]);
    sheet.mergeCells("A2:H2");
    styles.styleSubtitleCell(filterRow.getCell(1));
  }
  
  const fechaGenRow = sheet.addRow([
    `Reporte generado: ${new Date().toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`
  ]);
  const fechaRowNum = filtroInfo.length > 0 ? 3 : 2;
  sheet.mergeCells(`A${fechaRowNum}:H${fechaRowNum}`);
  styles.styleSubtitleCell(fechaGenRow.getCell(1));
  
  sheet.addRow([]);

  const totalCantidad = productos.reduce((sum, p) => sum + Number(p.totalVendido), 0);
  const totalIngresos = productos.reduce((sum, p) => sum + Number(p.totalPrecio), 0);
  
  const headerOffset = fechaRowNum + 2;
  sheet.addRow([
    "#", 
    "Producto", 
    "Cantidad Vendida", 
    "% del Total", 
    "Ingresos", 
    "% de Ingresos",
    "Precio Promedio",
    "Participación Acumulada"
  ]);
  
  let ingresoAcumulado = 0;
  productos.forEach((p, i) => {
    const cantidad = Number(p.totalVendido);
    const ingresos = Number(p.totalPrecio);
    const porcentajeCantidad = totalCantidad > 0 ? (cantidad / totalCantidad) * 100 : 0;
    const porcentajeIngresos = totalIngresos > 0 ? (ingresos / totalIngresos) * 100 : 0;
    const precioPromedio = cantidad > 0 ? ingresos / cantidad : 0;
    
    ingresoAcumulado += ingresos;
    const participacionAcumulada = totalIngresos > 0 ? (ingresoAcumulado / totalIngresos) * 100 : 0;
    
    sheet.addRow([ i + 1, 
      `${p.nombre_producto} ${p.especificaciones || ""}`.trim(),
      cantidad,
      porcentajeCantidad,
      ingresos,
      porcentajeIngresos,
      precioPromedio,
      participacionAcumulada
    ]);
  });

  const totalRowNum = headerOffset + productos.length + 1;
  const totalRow = sheet.addRow([
    "TOTAL", "", 
    totalCantidad, "100%", 
    totalIngresos, "100%",
    totalCantidad > 0 ? totalIngresos / totalCantidad : 0, "100%"
  ]);
  
  sheet.getColumn(3).numFmt = '#,##0'; 
  sheet.getColumn(4).numFmt = '0.00"%";[Red]0.00"%";"-"'; 
  sheet.getColumn(5).numFmt = '"$"#,##0.00;[Red]"$"#,##0.00'; 
  sheet.getColumn(6).numFmt = '0.00"%";[Red]0.00"%";"-"'; 
  sheet.getColumn(7).numFmt = '"$"#,##0.00;[Red]"$"#,##0.00'; 
  sheet.getColumn(8).numFmt = '0.00"%";[Red]0.00"%";"-"';
  
  styles.styleTotalRow(totalRow);

  const headerRow = sheet.getRow(headerOffset);
  styles.styleHeaderRow(headerRow);

  for (let i = 0; i < productos.length; i++) {
    const row = sheet.getRow(headerOffset + 1 + i);
    styles.styleDataRow(row, (headerOffset + 1 + i) % 2 === 0);
  }

  sheet.addRow([]);
  sheet.addRow([]);
  
  const categoriaTitle = sheet.addRow(["ANÁLISIS POR CATEGORÍA"]);
  sheet.mergeCells(`A${categoriaTitle.number}:H${categoriaTitle.number}`);
  styles.styleSummaryTitle(categoriaTitle.getCell(1));
  
  const catHeaderRow = sheet.addRow(["Categoría", "Cantidad Vendida", "% del Total", "Ranking"]);
  sheet.mergeCells(`A${catHeaderRow.number}:B${catHeaderRow.number}`);
  sheet.mergeCells(`C${catHeaderRow.number}:D${catHeaderRow.number}`);
  sheet.mergeCells(`E${catHeaderRow.number}:F${catHeaderRow.number}`);
  sheet.mergeCells(`G${catHeaderRow.number}:H${catHeaderRow.number}`);
  styles.styleHeaderRow(catHeaderRow);
  
  const categoriasMap = datosCategorias.reduce((acc, cat) => {
    acc[cat.categoria_id] = {nombre: cat.categoria,
      cantidad: Number(cat.cantidad)
    };
    return acc;
  }, {});
  
  const totalCategoria = datosCategorias.reduce((sum, cat) => sum + Number(cat.cantidad), 0);
  
  const categoriasOrdenadas = [...datosCategorias]
    .sort((a, b) => Number(b.cantidad) - Number(a.cantidad));
  
  categoriasOrdenadas.forEach((cat, i) => {
    const porcentaje = totalCategoria > 0 ? (Number(cat.cantidad) / totalCategoria) * 100 : 0;
    const row = sheet.addRow([cat.categoria, Number(cat.cantidad), porcentaje, i + 1]);
    
    const rowNum = row.number;
    sheet.mergeCells(`A${rowNum}:B${rowNum}`);
    sheet.mergeCells(`C${rowNum}:D${rowNum}`);
    sheet.mergeCells(`E${rowNum}:F${rowNum}`);
    sheet.mergeCells(`G${rowNum}:H${rowNum}`);
    
    styles.styleDataRow(row, rowNum % 2 === 0);
  });
  
  sheet.addRow([]);
  sheet.addRow([]);
  
  const marcaTitle = sheet.addRow(["ANÁLISIS POR MARCA"]);
  sheet.mergeCells(`A${marcaTitle.number}:H${marcaTitle.number}`);
  styles.styleSummaryTitle(marcaTitle.getCell(1));
  
  const marcaHeaderRow = sheet.addRow(["Marca", "Cantidad Vendida", "% del Total", "Ranking"]);
  sheet.mergeCells(`A${marcaHeaderRow.number}:B${marcaHeaderRow.number}`);
  sheet.mergeCells(`C${marcaHeaderRow.number}:D${marcaHeaderRow.number}`);
  sheet.mergeCells(`E${marcaHeaderRow.number}:F${marcaHeaderRow.number}`);
  sheet.mergeCells(`G${marcaHeaderRow.number}:H${marcaHeaderRow.number}`);
  styles.styleHeaderRow(marcaHeaderRow);
  
  const totalMarca = datosMarcas.reduce((sum, m) => sum + Number(m.cantidad), 0);
  
  const marcasOrdenadas = [...datosMarcas]
    .sort((a, b) => Number(b.cantidad) - Number(a.cantidad));
  
  marcasOrdenadas.forEach((m, i) => {
    const porcentaje = totalMarca > 0 ? (Number(m.cantidad) / totalMarca) * 100 : 0;
    const row = sheet.addRow([m.marca, Number(m.cantidad), porcentaje, i + 1]);
    
    const rowNum = row.number;
    sheet.mergeCells(`A${rowNum}:B${rowNum}`);
    sheet.mergeCells(`C${rowNum}:D${rowNum}`);
    sheet.mergeCells(`E${rowNum}:F${rowNum}`);
    sheet.mergeCells(`G${rowNum}:H${rowNum}`);
    
    styles.styleDataRow(row, rowNum % 2 === 0);
  });
  
  sheet.addRow([]);
  sheet.addRow([]);
  
  const resumenTitle = sheet.addRow(["RESUMEN EJECUTIVO"]);
  sheet.mergeCells(`A${resumenTitle.number}:H${resumenTitle.number}`);
  styles.styleSummaryTitle(resumenTitle.getCell(1));
  
  const precioPromedioGeneral = totalCantidad > 0 ? totalIngresos / totalCantidad : 0;

  const participacionTop5 = productos.length >= 5 
    ? productos.slice(0, 5).reduce((sum, p) => sum + (Number(p.totalPrecio)/totalIngresos*100), 0)
    : null;

  const participacionTop10 = productos.length >= 10 
    ? productos.slice(0, 10).reduce((sum, p) => sum + (Number(p.totalPrecio)/totalIngresos*100), 0)
    : null;

  const productoTop = productos[0];
  const marcaTop = datosMarcas.sort((a,b) => b.cantidad - a.cantidad)[0];
  const categoriaTop = datosCategorias.sort((a,b) => b.cantidad - a.cantidad)[0];

  const resumenData = [
    ["Producto más vendido:", productoTop ? `${productoTop.nombre_producto} (${productoTop.totalVendido} unidades)` : "N/A"],
    ["Ingresos del producto top:", productoTop ? `$${Number(productoTop.totalPrecio).toFixed(2)}` : "$0.00"],
    ["Marca líder:", marcaTop ? `${marcaTop.marca} (${marcaTop.cantidad} unidades)` : "N/A"],
    ["Categoría líder:", categoriaTop ? `${categoriaTop.categoria} (${categoriaTop.cantidad} unidades)` : "N/A"],
  ];

  if(participacionTop5 !== null) resumenData.push(["Participación del Top 5:", `${participacionTop5.toFixed(1)}% de los ingresos`]);
  if(participacionTop10 !== null) resumenData.push(["Participación del Top 10:", `${participacionTop10.toFixed(1)}% de los ingresos`]);

  resumenData.push(
    ["Precio promedio unitario:", `$${precioPromedioGeneral.toFixed(2)}`],
    ["Productos analizados:", `${productos.length} productos`]
  );

  resumenData.forEach(([label, value], index) => {
    const row = sheet.addRow([null, label, value]);
    const rowNum = row.number;
    sheet.mergeCells(`C${rowNum}:D${rowNum}`);
    styles.styleExecutiveSummaryRow(row, index);
  });

  sheet.autoFilter = { 
    from: { row: headerOffset, column: 1 }, 
    to: { row: headerOffset + productos.length, column: 8 } 
  };
  
  sheet.columns = [
    { width: 8 },  
    { width: 40 },
    { width: 15 }, 
    { width: 12 }, 
    { width: 15 },  
    { width: 12 }, 
    { width: 15 },  
    { width: 18 }  
  ];
  
  sheet.views = [{
    state: 'frozen',
    ySplit: headerOffset,
    xSplit: 0
  }];

  const fechaActual = new Date().toLocaleDateString("es-DO").replace(/\//g, "-");
  res.setHeader("Content-Disposition", `attachment; filename=TopProductos_${fechaActual}.xlsx`);
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

adminController.varianteEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const success = await admin.estadoVariante(id, activo);

    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado de la variante" });
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

adminController.estadoMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const affectedRows = await admin.estadoMarca(id, activo);

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado' });
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

adminController.estadoCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const affectedRows = await admin.estadoCategoria(id, activo);

    res.json({ success: affectedRows > 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado' });
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

adminController.estadoUsuario = async (req, res) => {
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