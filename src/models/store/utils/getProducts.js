import db from "../../../database/mobiles.js";
import { applyTaxDiscount } from "../../../utils/applyRate.js";

const productsBase = {};

function validateLimit(limit) {
  if (!limit) return "";
  const match = limit.match(/^LIMIT\s+(\d+)(\s+OFFSET\s+(\d+))?$/i);
  return match ? limit : "";
}

productsBase.getActiveJoins = () => {
  return `
    JOIN categorias c ON p.categoria_id = c.id AND c.activo = 1
    JOIN p_marcas m ON p.marca_id = m.id AND m.activo = 1
    LEFT JOIN p_variantes v ON p.id = v.producto_id AND v.activo = 1
  `;
};

productsBase.getProductsBase = async ({
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
  const limitClause = validateLimit(limit);

  const query = `
      SELECT 
        p.id,
        p.nombre AS name,
        p.precio AS price,
        p.impuesto AS tax,
        p.descuento AS discount,
        p.fecha_publicacion AS publicationDate,
        c.categoria AS category,
        v.id AS variantId,
        v.color,
        v.stock,
        v.img AS image,
        r.capacidad AS ram,
        a.capacidad AS storage,
        CONCAT(r.capacidad, '+', a.capacidad) AS specs,
        COALESCE(AVG(cl.calificacion), 0) AS averageRating
      FROM productos p
      ${productsBase.getActiveJoins()}
      LEFT JOIN ram r ON p.ram_id = r.id
      LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
      LEFT JOIN clasificacion cl ON cl.producto_id = p.id
      ${whereClause}
      GROUP BY p.id
      ${order}
      ${limitClause};
    `;

  const [rows] = await db.query(query, params);
  return applyTaxDiscount(rows);
};

export default productsBase;