import db from "../database/mobiles.js";

const comparison = {};

comparison.searchDevice = async (query, excludeMovilIds = []) => {
  let searchQuery = ` 
  SELECT
  p.id,
  p.movil_id,
  p.nombre,
  p.precio,
  p.descuento,
  p.fecha,
  v.color AS colores, 
  v.img AS imagenes
  FROM productos p
  LEFT JOIN p_variantes v ON p.id = v.producto_id 
  WHERE p.categoria_id = (SELECT id FROM categorias WHERE categoria = 'moviles')
  AND (p.nombre LIKE ? OR p.descripcion LIKE ?)
  ${excludeMovilIds.length > 0 ? 'AND p.movil_id NOT IN (?)' : ''}
  GROUP BY p.movil_id
  LIMIT 10`;

  const params = [`%${query}%`, `%${query}%`];
  if (excludeMovilIds.length > 0) {
    params.push(excludeMovilIds);
  }

  try {
    const [results] = await db.query(searchQuery, params);
    return results;
  } catch (err) {
    throw new Error("Error al buscar móviles: " + err.message);
  }
};

comparison.getProductMovilIds = async (productIds) => {
  try {
    const [movilIds] = await db.query(
      'SELECT DISTINCT movil_id FROM productos WHERE id IN (?)',
      [productIds]
    );
    return movilIds;
  } catch (err) {
    throw new Error("Error al obtener IDs de móviles: " + err.message);
  }
};

comparison.getDevice = async (ids) => {
  let query = `
    SELECT 
      m.id,
      p.nombre,
      p.precio,
      p.descuento,
      v.img AS imagen,
      m.año,
      pant.tamaño AS pantalla_tamaño,
      pant.resolucion AS pantalla_resolucion,
      pant.tipo AS pantalla_tipo,
      pant.frecuencia AS pantalla_frecuencia,
      pant.proteccion AS pantalla_proteccion,
      cpu.nombre AS cpu_nombre,
      cpu.nucleos AS cpu_nucleos,
      cpu.velocidad AS cpu_velocidad,
      gpu.modelo AS gpu_modelo,
      gpu.nucleos AS gpu_nucleos,
      cam.principal AS camara_principal,
      cam.selfie AS camara_selfie,
      cam.video AS camara_video,
      bat.capacidad AS bateria_capacidad,
      bat.tipo AS bateria_tipo,
      bat.carga_rapida AS bateria_carga_rapida,
      bat.carga_inalambrica AS bateria_carga_inalambrica,
      con.red AS conectividad_red,
      con.wifi AS conectividad_wifi,
      con.bluetooth AS conectividad_bluetooth,
      con.nfc AS conectividad_nfc,
      dim.altura AS dimensiones_altura,
      dim.anchura AS dimensiones_anchura,
      dim.grosor AS dimensiones_grosor,
      dim.peso AS dimensiones_peso,
      GROUP_CONCAT(DISTINCT ram.capacidad ORDER BY ram.capacidad SEPARATOR ' / ') AS ram_capacidades,
      GROUP_CONCAT(DISTINCT alm.capacidad ORDER BY alm.capacidad SEPARATOR ' / ') AS almacenamiento_capacidades
    FROM moviles m
    JOIN productos p ON m.id = p.id
    LEFT JOIN p_variantes v ON p.id = v.producto_id
    LEFT JOIN cpu ON m.cpu_id = cpu.id
    LEFT JOIN gpu ON m.gpu_id = gpu.id
    LEFT JOIN camara cam ON m.camara_id = cam.id
    LEFT JOIN baterias bat ON m.bateria_id = bat.id
    LEFT JOIN conectividad con ON m.conectividad_id = con.id
    LEFT JOIN dimensionespeso dim ON m.dimensionespeso_id = dim.id
    LEFT JOIN pantalla pant ON m.pantalla_id = pant.id
    LEFT JOIN variantes_ram vr ON m.id = vr.movil_id
    LEFT JOIN ram ON vr.ram_id = ram.id
    LEFT JOIN variantes_almacenamiento va ON m.id = va.movil_id
    LEFT JOIN almacenamiento alm ON va.almacenamiento_id = alm.id
    WHERE m.id IN (?)
    GROUP BY m.id
  `;

  try {
    const [results] = await db.query(query, [ids]);
    return results;
  } catch (err) {
    console.error("Error en comparación:", err);
    throw new Error("Error al obtener dispositivos para comparar: " + err.message);
  }
};

export default comparison;