import specs from "../../models/admin/specs.js";
import db from "../../database/mobiles.js";

const specsController = {};

specsController.listarMoviles = async (req, res) => {
  try {
    const Moviles = await specs.obtenerMoviles();
    res.json(Moviles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Moviles' });
  }
};

specsController.listarTodosProductos = async (req, res) => {
  try {
    const productos = await specs.obtenerTodosProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Error al obtener todos los productos' });
  }
};

specsController.crearMovil = async (req, res) => {
  try {
    const { productIds = [], ...movilData } = req.body;
    const movilId = await specs.agregarMovil(movilData);
    
    if (productIds.length > 0) {
      await db.query("UPDATE productos SET movil_id = ? WHERE id IN (?)", [movilId, productIds]);
    }
    
    res.status(201).json({ message: 'Comparación creada con éxito', id: movilId });
  } catch (error) {
    console.error('Error al crear comparación:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

specsController.editarMovil = async (req, res) => {
  const { id } = req.params;
  const { productIds = [], ...movilData } = req.body;

  try {
    const actualizado = await specs.actualizarMovil(id, movilData);
    
    await db.query("UPDATE productos SET movil_id = NULL WHERE movil_id = ?", [id]);
    
    if (productIds.length > 0) {
      await db.query("UPDATE productos SET movil_id = ? WHERE id IN (?)", [id, productIds]);
    }
    
    if (actualizado) {
      res.json({ message: 'Móvil actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Móvil no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar móvil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

specsController.borrarMovil = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await specs.eliminarMovil(id); 
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Movil' });
  }
};

// Tabla almacenamiento

specsController.listarAlmacenamiento = async (req, res) => {
  try {
    const datos = await specs.obtenerAlmacenamiento();
    res.json(datos);
  } catch (err) {
    console.error("Error al listar almacenamiento:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

specsController.crearAlmacenamiento = async (req, res) => {
  try {
    const id = await specs.agregarAlmacenamiento(req.body);
    res.status(201).json({ message: "Almacenamiento creado con éxito", id });
  } catch (err) {
    console.error("Error al crear almacenamiento:", err);
    res.status(500).json({ error: "Error al crear almacenamiento" });
  }
};

specsController.editarAlmacenamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await specs.actualizarAlmacenamiento(id, req.body);
    if (actualizado) {
      res.json({ message: "Almacenamiento actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (err) {
    console.error("Error al editar almacenamiento:", err);
    res.status(500).json({ error: "Error al editar almacenamiento" });
  }
};

specsController.borrarAlmacenamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await specs.eliminarAlmacenamiento(id);
    if (eliminado) {
      res.json({ message: "Almacenamiento eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (err) {
    console.error("Error al borrar almacenamiento:", err);
    res.status(500).json({ error: "Error al borrar almacenamiento" });
  }
};

// Tabla variantes almacenamiento 

specsController.listarVariantesAlmacenamiento = async (req, res) => {
  try {
    const datos = await specs.obtenerVariantesAlmacenamiento();
    res.json(datos);
  } catch (err) {
    console.error("Error al listar variantes de almacenamiento:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

specsController.crearVarianteAlmacenamiento = async (req, res) => {
  try {
    const id = await specs.agregarVarianteAlmacenamiento(req.body);
    res.status(201).json({ message: "Variante de almacenamiento creada con éxito", id });
  } catch (err) {
    console.error("Error al crear variante de almacenamiento:", err);
    res.status(500).json({ error: "Error al crear variante de almacenamiento" });
  }
};

specsController.editarVarianteAlmacenamiento = async (req, res) => {
  try {
    const { movil_id, almacenamiento_id } = req.params;
    const { 
      nuevo_movil_id = movil_id, 
      nuevo_almacenamiento_id = almacenamiento_id 
    } = req.body;

    const actualizado = await specs.actualizarVarianteAlmacenamiento(
      movil_id,
      almacenamiento_id,
      nuevo_movil_id,
      nuevo_almacenamiento_id
    );

    if (actualizado) {
      res.json({ message: "Variante actualizada correctamente" });
    } else {
      res.status(404).json({ message: "Variante no encontrada" });
    }
  } catch (err) {
    console.error("Error al actualizar variante:", err);
    res.status(500).json({ 
      error: "Error del servidor al actualizar variante",
      details: err.message 
    });
  }
};

specsController.borrarVarianteAlmacenamiento = async (req, res) => {
  try {
    const { movil_id, almacenamiento_id } = req.params;
    const eliminado = await specs.eliminarVarianteAlmacenamiento(movil_id, almacenamiento_id);
    if (eliminado) {
      res.json({ message: "Variante de almacenamiento eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (err) {
    console.error("Error al borrar variante de almacenamiento:", err);
    res.status(500).json({ error: "Error al borrar variante de almacenamiento" });
  }
};

// Tabla baterias

specsController.listarBaterias = async (req, res) => {
try {
  const datos = await specs.obtenerBaterias();
  res.json(datos);
} catch (err) {
  console.error("Error al listar baterías:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearBateria = async (req, res) => {
try {
  const id = await specs.agregarBateria(req.body);
  res.status(201).json({ message: "Batería creada con éxito", id });
} catch (err) {
  console.error("Error al crear batería:", err);
  res.status(500).json({ error: "Error al crear batería" });
}
};

specsController.editarBateria = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarBateria(id, req.body);
  if (actualizado) {
    res.json({ message: "Batería actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar batería:", err);
  res.status(500).json({ error: "Error al editar batería" });
}
};

specsController.borrarBateria = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarBateria(id);
  if (eliminado) {
    res.json({ message: "Batería eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar batería:", err);
  res.status(500).json({ error: "Error al borrar batería" });
}
};

// Tabla cámaras
specsController.listarCamaras = async (req, res) => {
try {
  const datos = await specs.obtenerCamaras();
  res.json(datos);
} catch (err) {
  console.error("Error al listar cámaras:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearCamara = async (req, res) => {
try {
  const id = await specs.agregarCamara(req.body);
  res.status(201).json({ message: "Cámara creada con éxito", id });
} catch (err) {
  console.error("Error al crear cámara:", err);
  res.status(500).json({ error: "Error al crear cámara" });
}
};

specsController.editarCamara = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarCamara(id, req.body);
  if (actualizado) {
    res.json({ message: "Cámara actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar cámara:", err);
  res.status(500).json({ error: "Error al editar cámara" });
}
};

specsController.borrarCamara = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarCamara(id);
  if (eliminado) {
    res.json({ message: "Cámara eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar cámara:", err);
  res.status(500).json({ error: "Error al borrar cámara" });
}
};

// Tabla conectividad

specsController.listarConectividad = async (req, res) => {
try {
  const datos = await specs.obtenerConectividad();
  res.json(datos);
} catch (error) {
  res.status(500).json({ error: "Error al obtener conectividades" });
}
};

specsController.crearConectividad = async (req, res) => {
try {
  await specs.agregarConectividad(req.body);
  res.json({ message: "Conectividad agregada correctamente" });
} catch (error) {
  res.status(500).json({ error: "Error al agregar conectividad" });
}
};

specsController.editarConectividad = async (req, res) => {
try {
  const { id } = req.params;
  await specs.actualizarConectividad(id, req.body);
  res.json({ message: "Conectividad actualizada correctamente" });
} catch (error) {
  res.status(500).json({ error: "Error al actualizar conectividad" });
}
};

specsController.borrarConectividad = async (req, res) => {
try {
  const { id } = req.params;
  await specs.eliminarConectividad(id);
  res.json({ message: "Conectividad eliminada correctamente" });
} catch (error) {
  res.status(500).json({ error: "Error al eliminar conectividad" });
}
};

// Tabla cpu

specsController.listarCpu = async (req, res) => {
try {
  const datos = await specs.obtenerCpu();
  res.json(datos);
} catch (err) {
  console.error("Error al listar CPU:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearCpu = async (req, res) => {
try {
  const id = await specs.agregarCpu(req.body);
  res.status(201).json({ message: "CPU creada con éxito", id });
} catch (err) {
  console.error("Error al crear CPU:", err);
  res.status(500).json({ error: "Error al crear CPU" });
}
};

specsController.editarCpu = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarCpu(id, req.body);
  if (actualizado) {
    res.json({ message: "CPU actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar CPU:", err);
  res.status(500).json({ error: "Error al editar CPU" });
}
};

specsController.borrarCpu = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarCpu(id);
  if (eliminado) {
    res.json({ message: "CPU eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar CPU:", err);
  res.status(500).json({ error: "Error al borrar CPU" });
}
};

// Tabla Dimensiones

specsController.listarDimensiones = async (req, res) => {
try {
  const datos = await specs.obtenerDimensiones();
  res.json(datos);
} catch (err) {
  console.error("Error al listar dimensiones y peso:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearDimensiones = async (req, res) => {
try {
  const id = await specs.agregarDimensiones(req.body);
  res.status(201).json({ message: "Dimensiones y peso creados con éxito", id });
} catch (err) {
  console.error("Error al crear dimensiones y peso:", err);
  res.status(500).json({ error: "Error al crear dimensiones y peso" });
}
};

specsController.editarDimensiones = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarDimensiones(id, req.body);
  if (actualizado) {
    res.json({ message: "Dimensiones y peso actualizados con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar dimensiones y peso:", err);
  res.status(500).json({ error: "Error al editar dimensiones y peso" });
}
};

specsController.borrarDimensiones = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarDimensiones(id);
  if (eliminado) {
    res.json({ message: "Dimensiones y peso eliminados con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar dimensiones y peso:", err);
  res.status(500).json({ error: "Error al borrar dimensiones y peso" });
}
};

// Tabla gpu

specsController.listarGpu = async (req, res) => {
try {
  const datos = await specs.obtenerGpu();
  res.json(datos);
} catch (err) {
  console.error("Error al listar GPU:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearGpu = async (req, res) => {
try {
  const id = await specs.agregarGpu(req.body);
  res.status(201).json({ message: "GPU creada con éxito", id });
} catch (err) {
  console.error("Error al crear GPU:", err);
  res.status(500).json({ error: "Error al crear GPU" });
}
};

specsController.editarGpu = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarGpu(id, req.body);
  if (actualizado) {
    res.json({ message: "GPU actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar GPU:", err);
  res.status(500).json({ error: "Error al editar GPU" });
}
};

specsController.borrarGpu = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarGpu(id);
  if (eliminado) {
    res.json({ message: "GPU eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar GPU:", err);
  res.status(500).json({ error: "Error al borrar GPU" });
}
};

// Tabla pantalla

specsController.listarPantalla = async (req, res) => {
try {
  const datos = await specs.obtenerPantalla();
  res.json(datos);
} catch (err) {
  console.error("Error al listar pantalla:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearPantalla = async (req, res) => {
try {
  const id = await specs.agregarPantalla(req.body);
  res.status(201).json({ message: "Pantalla creada con éxito", id });
} catch (err) {
  console.error("Error al crear pantalla:", err);
  res.status(500).json({ error: "Error al crear pantalla" });
}
};

specsController.editarPantalla = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarPantalla(id, req.body);
  if (actualizado) {
    res.json({ message: "Pantalla actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar pantalla:", err);
  res.status(500).json({ error: "Error al editar pantalla" });
}
};

specsController.borrarPantalla = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarPantalla(id);
  if (eliminado) {
    res.json({ message: "Pantalla eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar pantalla:", err);
  res.status(500).json({ error: "Error al borrar pantalla" });
}
};

// Tabla RAM

specsController.listarRam = async (req, res) => {
try {
  const datos = await specs.obtenerRam();
  res.json(datos);
} catch (err) {
  console.error("Error al listar RAM:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearRam = async (req, res) => {
try {
  const id = await specs.agregarRam(req.body);
  res.status(201).json({ message: "RAM creada con éxito", id });
} catch (err) {
  console.error("Error al crear RAM:", err);
  res.status(500).json({ error: "Error al crear RAM" });
}
};

specsController.editarRam = async (req, res) => {
try {
  const { id } = req.params;
  const actualizado = await specs.actualizarRam(id, req.body);
  if (actualizado) {
    res.json({ message: "RAM actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al editar RAM:", err);
  res.status(500).json({ error: "Error al editar RAM" });
}
};

specsController.borrarRam = async (req, res) => {
try {
  const { id } = req.params;
  const eliminado = await specs.eliminarRam(id);
  if (eliminado) {
    res.json({ message: "RAM eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar RAM:", err);
  res.status(500).json({ error: "Error al borrar RAM" });
}
};

// Tabla variantes RAM

specsController.listarVariantesRam = async (req, res) => {
try {
  const datos = await specs.obtenerVariantesRam();
  res.json(datos);
} catch (err) {
  console.error("Error al listar variantes RAM:", err);
  res.status(500).json({ error: "Error del servidor" });
}
};

specsController.crearVarianteRam = async (req, res) => {
try {
  const id = await specs.agregarVarianteRam(req.body);
  res.status(201).json({ message: "Variante RAM creada con éxito", id });
} catch (err) {
  console.error("Error al crear variante RAM:", err);
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ 
      error: "Esta combinación de móvil y RAM ya existe",
      validationError: true,
      errors: [{ path: ['movil_id'], message: "Esta combinación ya existe" }]
    });
  }
  res.status(500).json({ error: "Error al crear variante RAM" });
}
};

specsController.editarVarianteRam = async (req, res) => {
try {
  const { movil_id, ram_id } = req.params; 
  const { nuevo_movil_id, nuevo_ram_id } = req.body; 

  if (!nuevo_movil_id || !nuevo_ram_id) {
    return res.status(400).json({ error: "Debe enviar nuevo_movil_id y nuevo_ram_id" });
  }

  const actualizado = await specs.actualizarVarianteRam(movil_id, ram_id, nuevo_movil_id, nuevo_ram_id);

  if (actualizado) {
    res.json({ message: "Variante RAM actualizada con éxito" });
  } else {
    res.status(404).json({ message: "Variante RAM no encontrada" });
  }
} catch (err) {
  console.error("Error al actualizar variante RAM:", err);
  res.status(500).json({ error: "Error al actualizar variante RAM" });
}
};

specsController.borrarVarianteRam = async (req, res) => {
try {
  const { movil_id, ram_id } = req.params;
  const eliminado = await specs.eliminarVarianteRam(movil_id, ram_id);
  if (eliminado) {
    res.json({ message: "Variante RAM eliminada con éxito" });
  } else {
    res.status(404).json({ message: "Registro no encontrado" });
  }
} catch (err) {
  console.error("Error al borrar variante RAM:", err);
  res.status(500).json({ error: "Error al borrar variante RAM" });
}
};

export default specsController