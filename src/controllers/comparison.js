import comparison from "../models/comparison.js";

const comparisonController = {};

comparisonController.searchMobiles =  async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = await comparison.buscarMoviles(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

comparisonController.comparer = async (req, res) => {
  try {
    const ids = req.query.ids.split(',').map(id => parseInt(id));
    if (ids.length < 2 || ids.length > 3) {
      return res.status(400).json({ error: 'Debes comparar entre 2 y 4 dispositivos' });
    }
    
    const devices = await comparison.obtenerDispositivosParaComparar(ids);
    res.json(devices);
  } catch (err) {
    console.error('Error en comparación:', err);
    res.status(500).json({ error: err.message });
  }
};

export default comparisonController;