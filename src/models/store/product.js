import db from "../../database/mobiles.js";
import productsBase from "./utils/getProducts.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const productDetails = {};

productDetails.getProductDetails = async (id) => {
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
    v.id AS variantId,
    v.color,
    v.stock,
    v.img,
    r.capacidad AS ram,
    a.capacidad AS almacenamiento,
    CONCAT(r.capacidad, '+', a.capacidad) AS specs
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id AND c.activo = 1
  JOIN p_marcas m ON p.marca_id = m.id AND m.activo = 1
  LEFT JOIN p_variantes v ON p.id = v.producto_id AND v.activo = 1 
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE p.id = ? AND p.activo = 1`;

  const [results] = await db.query(query, [id]);
  if (!results.length) return null;

  const finalProduct = applyTaxDiscount([results[0]])[0];

  const product = {
    ...finalProduct,
    stockByColor: {},
    imagesByColor: {},
    colors: [],
    variantsByColor: {}  
  };

  results.forEach(({ color, stock, img, variantId }) => {
    if (color) {
      product.stockByColor[color] = stock;
      product.imagesByColor[color] = img;
      product.colors.push(color);
      product.variantsByColor[color] = variantId; 
    }
  });

  return product;
};

productDetails.getRelated = async (productoId, categoriaId) => {
  const ids = Array.isArray(productoId) ? productoId : [productoId];
  const cats = Array.isArray(categoriaId) ? categoriaId : [categoriaId];

  const placeholders = ids.map(() => "?").join(",");
  const catPlaceholders = cats.map(() => "?").join(",");

  const where = `p.id NOT IN (${placeholders}) AND p.categoria_id IN (${catPlaceholders})`;
  const params = [...ids, ...cats];
  const limit = "LIMIT 4";

  return productsBase.getProductsBase({ where, params, limit });
};

export default productDetails;