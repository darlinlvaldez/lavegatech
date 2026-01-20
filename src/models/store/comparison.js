import db from "../../database/mobiles.js";
import productsBase from "./utils/getProducts.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const comparison = {};

comparison.searchDevice = async (query, excludeMobileIds = []) => {
  const sql = `
    SELECT 
      p.id,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      c.categoria AS category,
      v.img AS image
    FROM productos p
    ${productsBase.getActiveJoins()}
    WHERE c.categoria = 'moviles' AND p.activo = 1 AND p.nombre LIKE ?
      ${excludeMobileIds.length  ? 
        `AND p.movil_id NOT IN (${excludeMobileIds.map(() => '?').join(',')})`  : ''}
    GROUP BY p.movil_id
    LIMIT 10
  `;

  const params = [`%${query}%`, ...excludeMobileIds];
  const [rows] = await db.query(sql, params);
  return applyTaxDiscount(rows);
};

comparison.getTopSoldProducts = async ({
  limit = 6, category = null, onlyMobiles = false} = {}) => {

  let where = `
    p.activo = 1
    AND pe.estado IN ('pagado', 'completado')
  `;

  const params = [];

  if (category) {
    where += ` AND c.categoria = ?`;
    params.push(category);
  }

  if (onlyMobiles) {
    where += ` AND p.movil_id IS NOT NULL`;
  }

  const query = `
    SELECT 
      p.id,
      v.id as variantId,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      c.categoria AS category,
      v.img AS image,
      r.capacidad AS ram,
      a.capacidad AS storage,
      CONCAT(r.capacidad, '+', a.capacidad) AS specs,
      SUM(dp.cantidad) AS totalSold
    FROM detalles_pedido dp
    JOIN pedidos pe ON dp.pedido_id = pe.id
    JOIN productos p ON dp.producto_id = p.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    ${productsBase.getActiveJoins()}
    WHERE ${where}
    GROUP BY ${onlyMobiles ? "p.movil_id" : "p.id"}
    ORDER BY totalSold DESC
    LIMIT ?
  `;

  params.push(limit);

  const [rows] = await db.query(query, params);
  return applyTaxDiscount(rows);
};

comparison.getTopRatedMobiles = async (limit = 6) => {
  const sql = `
    SELECT 
      p.id,
      v.id as variantId,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      v.img AS image,
      ROUND(AVG(cl.calificacion), 1) AS rating,
      COUNT(cl.id) AS total_reviews
    FROM productos p
    ${productsBase.getActiveJoins()}
    JOIN clasificacion cl ON cl.producto_id = p.id
    WHERE c.categoria = 'moviles' AND p.activo = 1 AND cl.calificacion IS NOT NULL
    GROUP BY p.id
    HAVING total_reviews >= 2
    ORDER BY rating DESC, total_reviews DESC
    LIMIT ?
  `;

  const [rows] = await db.query(sql, [limit]);
  return applyTaxDiscount(rows);
};

comparison.getRatingBreakdown = async (productId) => {
  const query = `
    SELECT 
      calificacion AS stars,
      COUNT(*) AS total
    FROM clasificacion
    WHERE producto_id = ?
    GROUP BY calificacion
  `;

  try {
    const [rows] = await db.query(query, [productId]);
    return rows;
  } catch (err) {
    throw new Error("Error al obtener distribución de calificaciones: " + err.message);
  }
};

comparison.getProductMobileIds = async (productIds) => {
  try {
    const [mobileIds] = await db.query(
      'SELECT DISTINCT movil_id AS mobileId FROM productos WHERE id IN (?)',
      [productIds]
    );
    return mobileIds;
  } catch (err) {
    throw new Error("Error al obtener IDs de móviles: " + err.message);
  }
};

comparison.getDevice = async (productIds) => {
  const query = `
    SELECT 
      p.id,
      v.id as variantId,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      v.img AS image,
      pant.tamaño AS screen_size,
      pant.resolucion AS screen_resolution,
      pant.tipo AS screen_type,
      pant.frecuencia AS screen_refresh_rate,
      pant.proteccion AS screen_protection,
      cpu.nombre AS processor_name,
      cpu.nucleos AS processor_cores,
      cpu.velocidad AS processor_speed,
      gpu.modelo AS gpu_model,
      gpu.nucleos AS gpu_cores,
      cam.principal AS main_camera,
      cam.selfie AS selfie_camera,
      cam.video AS video_recording,
      bat.capacidad AS battery_capacity,
      bat.tipo AS battery_type,
      bat.carga_rapida AS fast_charging,
      bat.carga_inalambrica AS wireless_charging,
      con.red AS network,
      con.wifi AS wifi,
      con.bluetooth AS bluetooth,
      con.nfc AS nfc,
      dim.altura AS height,
      dim.anchura AS width,
      dim.grosor AS thickness,
      dim.peso AS weight,
      GROUP_CONCAT(DISTINCT ram.capacidad ORDER BY ram.capacidad SEPARATOR ' / ') AS ram_capacities,
      GROUP_CONCAT(DISTINCT alm.capacidad ORDER BY alm.capacidad SEPARATOR ' / ') AS storage_capacities,
      ROUND(AVG(cla.calificacion), 1) AS rating,
      COUNT(DISTINCT cla.id) AS total_reviews
    FROM productos p
    JOIN moviles mo ON p.movil_id = mo.id
    LEFT JOIN cpu ON mo.cpu_id = cpu.id
    LEFT JOIN gpu ON mo.gpu_id = gpu.id
    LEFT JOIN camara cam ON mo.camara_id = cam.id
    LEFT JOIN baterias bat ON mo.bateria_id = bat.id
    LEFT JOIN conectividad con ON mo.conectividad_id = con.id
    LEFT JOIN dimensionespeso dim ON mo.dimensionespeso_id = dim.id
    LEFT JOIN pantalla pant ON mo.pantalla_id = pant.id
    LEFT JOIN variantes_ram vr ON mo.id = vr.movil_id
    LEFT JOIN ram ON vr.ram_id = ram.id
    LEFT JOIN variantes_almacenamiento va ON mo.id = va.movil_id
    LEFT JOIN almacenamiento alm ON va.almacenamiento_id = alm.id
    LEFT JOIN clasificacion cla ON p.id = cla.producto_id 
    ${productsBase.getActiveJoins()}
    WHERE p.id IN (?) AND p.activo = 1
    GROUP BY p.id
  `;

  try {
    const [results] = await db.query(query, [productIds]);
    return applyTaxDiscount(results);
  } catch (err) {
    console.error("Error en comparación:", err);
    throw new Error("Error al obtener dispositivos para comparar: " + err.message);
  }
};

export default comparison;