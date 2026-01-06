import comparison from "../../models/store/comparison.js";

const comparisonController = {};

comparisonController.searchMobiles = async (req, res) => {
  try {
    const query = req.query.q || '';
    const excludeMobileIds = req.query.exclude ? 
      req.query.exclude.split(',').map(id => parseInt(id)) : [];
    
    const results = await comparison.searchDevice(query, excludeMobileIds);
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

comparisonController.listMobiles = async (req, res) => {
  try {
    const devices = await comparison.getSelectableDevices();
    res.json(devices);
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
    
    const mobileIds = await comparison.getProductMobileIds(ids);
    const uniqueMobileIds = [...new Set(mobileIds.map(item => item.mobileId))];

    if (uniqueMobileIds.length < ids.length) {
      return res.status(400).json({
        error: "No puedes comparar productos que pertenecen al mismo dispositivo móvil.",
      });
    }
    
    const devices = await comparison.getDevice(ids);
    console.log("Dispositivos cargados:", devices.map(d => d.name));

    res.json({devices, excludedMobileIds: uniqueMobileIds});
  } catch (err) {
    console.error("Error en comparación:", err);
    res.status(500).json({ error: err.message });
  }
};

export default comparisonController;