import db from "../../database/mobiles.js";

const product = {};

product.obtenerDetalles = async (id) => {
  const query = `
  SELECT 
  p.id,
  p.nombre,
  p.descripcion,
  p.precio,
  p.descuento,
  p.fecha,
  p.categoria_id AS categoriaId,
  c.categoria,
  v.color,
  v.stock,
  v.img,
  r.capacidad AS ram,
  a.capacidad AS almacenamiento
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
  LEFT JOIN p_variantes v ON p.id = v.producto_id 
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE p.id = ?`;

  const [results] = await db.query(query, [id]);
  if (!results.length) return null;

  const producto = {
    ...results[0],
    stocksPorColor: {},
    imagenesPorColor: {},
    colores: [],
  };

  results.forEach(({ color, stock, img }) => {
    if (color) {
      producto.stocksPorColor[color] = stock;
      producto.imagenesPorColor[color] = img;
      producto.colores.push(color);
    }
  });

  return producto;
};

product.obtenerRelacionados = async (productoId, categoriaId) => {
  const ids = Array.isArray(productoId) ? productoId : [productoId];
  const cats = Array.isArray(categoriaId) ? categoriaId : [categoriaId];

  const placeholders = ids.map(() => "?").join(",");
  const catPlaceholders = cats.map(() => "?").join(",");

  const query = `
    SELECT 
    p.id,
    p.nombre,
    p.precio,
    p.descuento,
    p.fecha,
    c.categoria,
    v.color AS color, 
    v.stock AS stock,
    v.img AS imagen,
    r.capacidad AS ram,
    a.capacidad AS almacenamiento
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN p_variantes v ON p.id = v.producto_id 
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE p.id NOT IN (${placeholders}) 
    AND p.categoria_id IN (${catPlaceholders})
    GROUP BY p.id 
    LIMIT 4`;

  try {
    const [results] = await db.query(query, [...ids, ...cats]);
    return results;
  } catch (err) {
    console.error("Error al obtener productos relacionados:", err);
    return [];
  }
};

export default product;
