import ExcelJS from "exceljs";

export const exportExcel = async (req, res) => {
  const { tipo, rango, mes, fecha, anio, desde, hasta } = req.query;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Reporte");

  if (tipo === "fecha") {
    const data = await admin.graficoVentas(
      rango, mes, fecha, anio, desde, hasta
    );

    sheet.columns = [
      { header: "Fecha", key: "fecha", width: 18 },
      { header: "Ventas", key: "totalVentas", width: 15 }
    ];

    data.forEach(row => {
      sheet.addRow({
        fecha: row.fecha,
        totalVentas: Number(row.totalVentas)
      });
    });

    sheet.addRow({});
    sheet.addRow({
      fecha: "TOTAL",
      totalVentas: data.reduce((s, r) => s + Number(r.totalVentas), 0)
    });
  }

  if (tipo === "productos") {
    const { top10 } = await admin.topProductos();

    sheet.columns = [
      { header: "#", key: "rank", width: 5 },
      { header: "Producto", key: "producto", width: 30 },
      { header: "Cantidad", key: "cantidad", width: 12 },
      { header: "Ingresos", key: "ingresos", width: 15 }
    ];

    top10.forEach((p, i) => {
      sheet.addRow({
        rank: i + 1,
        producto: `${p.nombre_producto} ${p.especificaciones || ""}`,
        cantidad: p.totalVendido,
        ingresos: p.totalPrecio
      });
    });
  }

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=LaVegaTech-${tipo}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
};