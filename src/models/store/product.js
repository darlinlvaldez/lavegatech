import db from "../../database/mobiles.js";
import {impuestoDescuento} from "../../utils/applyRate.js";
import productosBase from "../store/utils/getProduct.js";

const product = {};

product.obtenerDetalles = async (id) => {
  const query = `
  SELECT 
    p.id,
    p.nombre,
    p.descripcion,
    p.precio,
    p.impuesto,
    p.descuento,
    p.fecha_publicacion,
    p.categoria_id AS categoriaId,
    c.categoria,
    v.id AS variante_id,
    v.color,
    v.stock,
    v.img,
    r.capacidad AS ram,
    a.capacidad AS almacenamiento,
    CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
  LEFT JOIN p_variantes v ON p.id = v.producto_id AND v.activo = 1 
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE p.id = ? AND p.activo = 1`;

  const [results] = await db.query(query, [id]);
  if (!results.length) return null;

  const productoFinal = impuestoDescuento([results[0]])[0];

  const producto = {
    ...productoFinal,
    stocksPorColor: {},
    imagenesPorColor: {},
    colores: [],
    variantesPorColor: {}  
  };

  results.forEach(({ color, stock, img, variante_id }) => {
    if (color) {
      producto.stocksPorColor[color] = stock;
      producto.imagenesPorColor[color] = img;
      producto.colores.push(color);
      producto.variantesPorColor[color] = variante_id; 
    }
  });

  return producto;
};

product.obtenerRelacionados = async (productoId, categoriaId) => {
  const ids = Array.isArray(productoId) ? productoId : [productoId];
  const cats = Array.isArray(categoriaId) ? categoriaId : [categoriaId];

  const placeholders = ids.map(() => "?").join(",");
  const catPlaceholders = cats.map(() => "?").join(",");

  const where = `p.id NOT IN (${placeholders}) AND p.categoria_id IN (${catPlaceholders})`;
  const params = [...ids, ...cats];
  const limit = "LIMIT 4";

  return productosBase.obtenerProductosBase({ where, params, limit });
};

export default product;