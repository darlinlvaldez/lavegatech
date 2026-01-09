import db from "../../database/mobiles.js";
import productsBase from "./utils/getProducts.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const comparison = {};

comparison.searchDevice = async (query, excludeMobileIds = []) => {
  let searchQuery = `
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
      ${excludeMobileIds.length > 0 ? "AND p.movil_id NOT IN (" + excludeMobileIds.map(() => "?").join(",") + ")" : ""}
    GROUP BY p.movil_id
    LIMIT 10
  `;

  const params = [`%${query}%`];
  if (excludeMobileIds.length > 0) 
    params.push(...excludeMobileIds);

  try {
    const [results] = await db.query(searchQuery, params);
    return applyTaxDiscount(results);
  } catch (err) {
    throw new Error("Error al buscar móviles: " + err.message);
  }
};

comparison.getTopSoldMobiles = async (limit = 6) => {
  const query = `
    SELECT 
      p.id,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      v.img AS image,
      SUM(dp.cantidad) AS total_vendidos
    FROM detalles_pedido dp
    JOIN pedidos pe ON dp.pedido_id = pe.id
    JOIN productos p ON dp.producto_id = p.id
    ${productsBase.getActiveJoins()}
    WHERE c.categoria = 'moviles'
      AND p.activo = 1
      AND pe.estado IN ('pagado', 'completado')
    GROUP BY p.movil_id
    ORDER BY total_vendidos DESC
    LIMIT ?
  `;

  const [rows] = await db.query(query, [limit]);
  return applyTaxDiscount(rows);
};

comparison.getTopRatedMobiles = async (limit = 6) => {
  const query = `
    SELECT 
      p.id,
      p.movil_id AS mobileId,
      p.nombre AS name,
      p.precio AS price,
      p.impuesto AS tax,
      p.descuento AS discount,
      v.img AS image,
      ROUND(AVG(c.calificacion), 1) AS rating,
      COUNT(c.id) AS total_reviews
    FROM clasificacion c
    JOIN productos p ON c.producto_id = p.id
    ${productsBase.getActiveJoins()}
    WHERE cat.categoria = 'moviles' AND p.activo = 1 AND c.calificacion IS NOT NULL
    GROUP BY p.movil_id
    HAVING total_reviews >= 2
    ORDER BY rating DESC, total_reviews DESC
    LIMIT ?
  `;

  const [rows] = await db.query(query, [limit]);
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