import db from "../database/mobiles.js";

const specs = {};

specs.obtenerMoviles = async () => {
  const query = `
    SELECT 
      p.id,
      p.nombre,
      cpu.nombre AS cpu,
      gpu.modelo AS gpu,
      GROUP_CONCAT(DISTINCT CONCAT(r.capacidad, ' ', r.tipo)) AS ram,
      GROUP_CONCAT(DISTINCT CONCAT(a.capacidad, ' ', a.tipo)) AS almacenamiento,
      CONCAT(pantalla.tamaño, ' ', pantalla.tipo, ' ', pantalla.resolucion) AS pantalla,

      CONCAT(camara.principal, ' / Selfie: ', camara.selfie, ' / Video: ', camara.video) AS camara,
      CONCAT(baterias.capacidad, ' ', baterias.tipo, 
             IF(baterias.carga_rapida IS NOT NULL, ', carga rápida: ' + baterias.carga_rapida, ''),
             IF(baterias.carga_inalambrica = 1, ', inalámbrica', '')
      ) AS bateria,
      CONCAT(conectividad.red, ', WiFi: ', conectividad.wifi, ', BT: ', conectividad.bluetooth, 
             IF(conectividad.nfc = 1, ', NFC', '')) AS conectividad,
      CONCAT(dimensionespeso.altura, 'x', dimensionespeso.anchura, 'x', dimensionespeso.grosor, ' mm, ', dimensionespeso.peso, 'g') AS dimensionespeso

    FROM productos p
    JOIN moviles m ON p.movil_id = m.id
    LEFT JOIN cpu ON m.cpu_id = cpu.id
    LEFT JOIN gpu ON m.gpu_id = gpu.id
    LEFT JOIN pantalla ON m.pantalla_id = pantalla.id
    LEFT JOIN variantes_ram vr ON m.id = vr.movil_id
    LEFT JOIN ram r ON vr.ram_id = r.id
    LEFT JOIN variantes_almacenamiento va ON m.id = va.movil_id
    LEFT JOIN almacenamiento a ON va.almacenamiento_id = a.id
    LEFT JOIN camara ON m.camara_id = camara.id
    LEFT JOIN baterias ON m.bateria_id = baterias.id
    LEFT JOIN conectividad ON m.conectividad_id = conectividad.id
    LEFT JOIN dimensionespeso ON m.dimensionespeso_id = dimensionespeso.id

    GROUP BY p.id
    ORDER BY p.id DESC;
  `;

  const [rows] = await db.query(query);
  return rows;
};

specs.eliminarMovil = async (id) => {
  try {
    const [[producto]] = await db.query("SELECT movil_id FROM productos WHERE id = ?", [id]);
    if (!producto) return false;

    const movilId = producto.movil_id;

    await db.query("DELETE FROM variantes_ram WHERE movil_id = ?", [movilId]);
    await db.query("DELETE FROM variantes_almacenamiento WHERE movil_id = ?", [movilId]);

    await db.query("DELETE FROM moviles WHERE id = ?", [movilId]);

    await db.query("UPDATE productos SET movil_id = NULL WHERE id = ?", [id]);

    return true;
  } catch (err) {
    console.error("Error eliminando dispositivo:", err);
    return false;
  }
};

specs.agregarMovil = async (data) => {
  const sql = `
    INSERT INTO moviles (nombre, cpu, gpu, ram, pantalla, almacenamiento)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
    data.nombre,
    data.cpu,
    data.gpu,
    data.ram,
    data.pantalla,
    data.almacenamiento
  ]);
  return result.insertId;
};

specs.actualizarMovil = async (id, data) => {
  const sql = `
    UPDATE moviles
    SET cpu_id = ?, gpu_id = ?, pantalla_id = ?,
    dimensionespeso_id = ?, conectividad_id = ?, bateria_id = ?, camara_id = ? 
    WHERE id = ?
  `;
    console.log('Datos recibidos para actualizar móvil:', data);

  const [result] = await db.execute(sql, [
    data.cpu_id,
    data.gpu_id,
    data.pantalla_id,
    data.dimensionespeso_id,
    data.conectividad_id,
    data.bateria_id,
    data.camara_id,
    id
  ]);
  return result.affectedRows;
};

// Tabla almacenamiento
specs.obtenerAlmacenamiento = async () => {
  const query = `SELECT * FROM almacenamiento ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarAlmacenamiento = async (data) => {
  const query = `
    INSERT INTO almacenamiento (capacidad, tipo)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [data.capacidad, data.tipo]);
  return result.insertId;
};

specs.actualizarAlmacenamiento = async (id, data) => {
  const query = `
    UPDATE almacenamiento
    SET capacidad = ?, tipo = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [data.capacidad, data.tipo, id]);
  return result.affectedRows;
};

specs.eliminarAlmacenamiento = async (id) => {
  const query = `DELETE FROM almacenamiento WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla variantes almacenamiento

specs.obtenerVariantesAlmacenamiento = async () => {
  const query = `
    SELECT va.movil_id, va.almacenamiento_id, a.capacidad, a.tipo
    FROM variantes_almacenamiento va
    JOIN almacenamiento a ON va.almacenamiento_id = a.id
    ORDER BY va.movil_id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarVarianteAlmacenamiento = async (data) => {
  const query = `
    INSERT INTO variantes_almacenamiento (movil_id, almacenamiento_id)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [
    data.movil_id,
    data.almacenamiento_id
  ]);
  return result.insertId;
};

specs.eliminarVarianteAlmacenamiento = async (movil_id, almacenamiento_id) => {
  const query = `
    DELETE FROM variantes_almacenamiento WHERE movil_id = ? AND almacenamiento_id = ?
  `;
  const [result] = await db.execute(query, [movil_id, almacenamiento_id]);
  return result.affectedRows;
};

// Tabla baterías
specs.obtenerBaterias = async () => {
  const query = `SELECT * FROM baterias ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarBateria = async (data) => {
  const query = `
    INSERT INTO baterias (capacidad, tipo, carga_rapida, carga_inalambrica)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [
    data.capacidad,
    data.tipo,
    data.carga_rapida,
    data.carga_inalambrica
  ]);
  return result.insertId;
};

specs.actualizarBateria = async (id, data) => {
  const query = `
    UPDATE baterias
    SET capacidad = ?, tipo = ?, carga_rapida = ?, carga_inalambrica = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.capacidad,
    data.tipo,
    data.carga_rapida,
    data.carga_inalambrica,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarBateria = async (id) => {
  const query = `DELETE FROM baterias WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla cámaras
specs.obtenerCamaras = async () => {
  const query = `SELECT * FROM camara ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarCamara = async (data) => {
  const query = `
    INSERT INTO camara (principal, selfie, video)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(query, [
    data.principal,
    data.selfie,
    data.video
  ]);
  return result.insertId;
};

specs.actualizarCamara = async (id, data) => {
  const query = `
    UPDATE camara
    SET principal = ?, selfie = ?, video = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.principal,
    data.selfie,
    data.video,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarCamara = async (id) => {
  const query = `DELETE FROM camara WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla conectividad

specs.obtenerConectividad = async () => {
  const [rows] = await db.query("SELECT * FROM conectividad");
  return rows;
};

specs.agregarConectividad = async (data) => {
  const { red, wifi, bluetooth, nfc } = data;
  await db.query(
    "INSERT INTO conectividad (red, wifi, bluetooth, nfc) VALUES (?, ?, ?, ?)",
    [red, wifi, bluetooth, nfc]
  );
};

specs.actualizarConectividad = async (id, data) => {
  const { red, wifi, bluetooth, nfc } = data;
  await db.query(
    "UPDATE conectividad SET red = ?, wifi = ?, bluetooth = ?, nfc = ? WHERE id = ?",
    [red, wifi, bluetooth, nfc, id]
  );
};

specs.eliminarConectividad = async (id) => {
  await db.query("DELETE FROM conectividad WHERE id = ?", [id]);
};

// Tabla cpu
specs.obtenerCpu = async () => {
  const query = `SELECT * FROM cpu ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarCpu = async (data) => {
  const query = `
    INSERT INTO cpu (nombre, nucleos, velocidad)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(query, [
    data.nombre,
    data.nucleos,
    data.velocidad
  ]);
  return result.insertId;
};

specs.actualizarCpu = async (id, data) => {
  const query = `
    UPDATE cpu
    SET nombre = ?, nucleos = ?, velocidad = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.nombre,
    data.nucleos,
    data.velocidad,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarCpu = async (id) => {
  const query = `DELETE FROM cpu WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla dimensionespeso

specs.obtenerDimensiones = async () => {
  const query = `SELECT * FROM dimensionespeso ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarDimensiones = async (data) => {
  const query = `
    INSERT INTO Dimensiones (altura, anchura, grosor, peso)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [
    data.altura,
    data.anchura,
    data.grosor,
    data.peso
  ]);
  return result.insertId;
};

specs.actualizarDimensiones = async (id, data) => {
  const query = `
    UPDATE Dimensiones
    SET altura = ?, anchura = ?, grosor = ?, peso = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.altura,
    data.anchura,
    data.grosor,
    data.peso,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarDimensiones = async (id) => {
  const query = `DELETE FROM Dimensiones WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla gpu

specs.obtenerGpu = async () => {
  const query = `SELECT * FROM gpu ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarGpu = async (data) => {
  const query = `
    INSERT INTO gpu (modelo, nucleos)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [
    data.modelo,
    data.nucleos
  ]);
  return result.insertId;
};

specs.actualizarGpu = async (id, data) => {
  const query = `
    UPDATE gpu
    SET modelo = ?, nucleos = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.modelo,
    data.nucleos,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarGpu = async (id) => {
  const query = `DELETE FROM gpu WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla pantalla

specs.obtenerPantalla = async () => {
  const query = `SELECT * FROM pantalla ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarPantalla = async (data) => {
  const query = `
    INSERT INTO pantalla (tamaño, resolucion, tipo, frecuencia, proteccion)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [
    data.tamaño,
    data.resolucion,
    data.tipo,
    data.frecuencia,
    data.proteccion
  ]);
  return result.insertId;
};

specs.actualizarPantalla = async (id, data) => {
  const query = `
    UPDATE pantalla
    SET tamaño = ?, resolucion = ?, tipo = ?, frecuencia = ?, proteccion = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.tamaño,
    data.resolucion,
    data.tipo,
    data.frecuencia,
    data.proteccion,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarPantalla = async (id) => {
  const query = `DELETE FROM pantalla WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla RAM

specs.obtenerRam = async () => {
  const query = `SELECT * FROM ram ORDER BY id DESC`;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarRam = async (data) => {
  const query = `
    INSERT INTO ram (capacidad, tipo)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [
    data.capacidad,
    data.tipo
  ]);
  return result.insertId;
};

specs.actualizarRam = async (id, data) => {
  const query = `
    UPDATE ram
    SET capacidad = ?, tipo = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [
    data.capacidad,
    data.tipo,
    id
  ]);
  return result.affectedRows;
};

specs.eliminarRam = async (id) => {
  const query = `DELETE FROM ram WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

// Tabla variantes RAM

specs.obtenerVariantesRam = async () => {
  const query = `
    SELECT vr.movil_id, vr.ram_id, r.capacidad, r.tipo
    FROM variantes_ram vr
    JOIN ram r ON vr.ram_id = r.id
    ORDER BY vr.movil_id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

specs.agregarVarianteRam = async (data) => {
  const query = `
    INSERT INTO variantes_ram (movil_id, ram_id)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(query, [
    data.movil_id,
    data.ram_id
  ]);
  return result.insertId;
};

specs.eliminarVarianteRam = async (movil_id, ram_id) => {
  const query = `
    DELETE FROM variantes_ram WHERE movil_id = ? AND ram_id = ?
  `;
  const [result] = await db.execute(query, [movil_id, ram_id]);
  return result.affectedRows;
};

export default specs