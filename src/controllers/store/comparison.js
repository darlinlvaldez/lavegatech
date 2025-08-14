import comparison from "../../models/comparison.js";

const comparisonController = {};

comparisonController.searchMobiles = async (req, res) => {
  try {
    const query = req.query.q || '';
    const excludeMovilIds = req.query.exclude ? 
      req.query.exclude.split(',').map(id => parseInt(id)) : [];
    
    const results = await comparison.searchDevice(query, excludeMovilIds);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

comparisonController.comparer = async (req, res) => {
  try {
    const ids = req.query.ids?.split(",").map((id) => parseInt(id)).filter((id) => !isNaN(id));
    if (!ids || ids.length < 1 ) {
      return res.status(400).json({ 
        error: "Debes seleccionar al menos dos dispositivos válidos" });
    }
    
    const movilIds = await comparison.getProductMovilIds(ids);
    const uniqueMovilIds = [...new Set(movilIds.map(item => item.movil_id))];

    if (uniqueMovilIds.length < ids.length) {
      return res.status(400).json({
        error: "No puedes comparar productos que pertenecen al mismo dispositivo móvil.",
      });
    }
    
    const devices = await comparison.getDevice(ids);
    console.log("Dispositivos cargados:", devices.map(d => d.nombre));

    res.json({devices, excludedMovilIds: uniqueMovilIds});
  } catch (err) {
    console.error("Error en comparación:", err);
    res.status(500).json({ error: err.message });
  }
};

export default comparisonController;