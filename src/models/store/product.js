import db from "../../database/mobiles.js";
import productsBase from "./utils/getProducts.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const productDetails = {};

productDetails.getProductDetails = async (id) => {
  const query = `
  SELECT 
    p.id,
    p.nombre AS name,
    p.descripcion AS description,
    p.precio AS price,
    p.impuesto AS tax,
    p.descuento AS discount,
    p.fecha_publicacion AS publicationDate,
    p.categoria_id AS categoryId,
    c.categoria AS category,
    v.id AS variantId,
    v.color,
    v.stock,
    v.img AS image,
    r.capacidad AS ram,
    a.capacidad AS storage,
    CONCAT(r.capacidad, '+', a.capacidad) AS specs
  FROM productos p
  ${productsBase.getActiveJoins()}
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

  results.forEach(({ color, stock, image, variantId }) => {
    if (color) {
      product.stockByColor[color] = stock;
      product.imagesByColor[color] = image;
      product.colors.push(color);
      product.variantsByColor[color] = variantId; 
    }
  });

  return product;
};

productDetails.getRelated = async (productId, categoryId) => {
  const ids = Array.isArray(productId) ? productId : [productId];
  const cats = Array.isArray(categoryId) ? categoryId : [categoryId];

  const placeholders = ids.map(() => "?").join(",");
  const catPlaceholders = cats.map(() => "?").join(",");

  const where = `p.id NOT IN (${placeholders}) AND p.categoria_id IN (${catPlaceholders})`;
  const params = [...ids, ...cats];
  const limit = "LIMIT 4";

  return productsBase.getProductsBase({ where, params, limit });
};

export default productDetails;