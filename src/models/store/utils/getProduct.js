import db from "../../../database/mobiles.js";
import { impuestoDescuento } from "../../../utils/applyRate.js"; 

const productosBase = {};

productosBase.obtenerProductosBase = async({ 
  where = '', 
  limit = '', 
  order = '', 
  params = [] 
} = {}) => {
    const condiciones = ["p.activo = 1"];
    if (where) {
        const condicionAdicional = where.replace(/^WHERE\s*/i, '');
        condiciones.push(condicionAdicional);
    }
    
    const whereClause = `WHERE ${condiciones.join(" AND ")}`;

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
    LEFT JOIN p_variantes v ON p.id = v.producto_id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    ${whereClause}
    GROUP BY p.id
    ${order}
    ${limit};
  `;
  
  const [rows] = await db.query(query, params);
  return impuestoDescuento(rows);
}

export default productosBase;