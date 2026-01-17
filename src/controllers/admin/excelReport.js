import ExcelJS from "exceljs";
import admin from '../../models/admin/admin.js';
import styles from '../../utils/excelReport/styles.js';
import {salesSummary} from "../../services/salesSummary.js";
import {salesTitle} from '../../utils/excelReport/filterTitle.js';
import {formatDateForExcel} from '../../utils/excelReport/formatDate.js';

const reportController = {};

reportController.exportSalesExcel = async (req, res) => {
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

reportController.exportTopProductsExcel = async (req, res) => {
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
      `${p.nombre_producto} ${p.specs || ""}`.trim(),
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

export default reportController;