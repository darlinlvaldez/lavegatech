import db from "../../../database/mobiles.js";
import { impuestoDescuento } from "../../../utils/applyRate.js";

const productosBase = {};

const columnasOrden = [
  "p.fecha_publicacion ASC",
  "p.fecha_publicacion DESC",
  "p.precio ASC",
  "p.precio DESC",
  "p.descuento DESC",
];

function validarOrder(order) {
  if (!order) return "";
  return columnasOrden.includes(order.trim()) ? `ORDER BY ${order}` : "";
}

function validarLimit(limit) {
  if (!limit) return "";
  const match = limit.match(/^LIMIT\s+(\d+)(\s+OFFSET\s+(\d+))?$/i);
  return match ? limit : "";
}

productosBase.obtenerProductosBase = async ({
  where = "",
  limit = "",
  order = "",
  params = [],
} = {}) => {
  const condiciones = ["p.activo = 1"];

  if (where) {
    condiciones.push(where);
  }

  const whereClause = `WHERE ${condiciones.join(" AND ")}`;

  const orderClause = validarOrder(order);
  const limitClause = validarLimit(limit);

  const query = `
      SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.impuesto,
        p.descuento,
        p.fecha_publicacion,
        c.categoria,
        v.id AS variante_id,
        v.color,
        v.stock,
        v.img AS imagen,
        r.capacidad AS ram,
        a.capacidad AS almacenamiento,
        CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN p_variantes v ON p.id = v.producto_id AND v.activo = 1
      LEFT JOIN ram r ON p.ram_id = r.id
      LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
      ${whereClause}
      GROUP BY p.id
      ${orderClause}
      ${limitClause};
    `;

  const [rows] = await db.query(query, params);
  return impuestoDescuento(rows);
};

export default productosBase;
