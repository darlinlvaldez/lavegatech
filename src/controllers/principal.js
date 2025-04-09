import {obtenerProductos, obtenerCategorias, obtenerRecomendados} from '../models/principal.js';

export async function productosController(req, res) {
  const {categoria} = req.query;

  try {
      const productos = await obtenerProductos(categoria);
      const categorias = await obtenerCategorias();
      const recomendados = await obtenerRecomendados();

      res.render('index', {productos, categorias, recomendados});  
  } catch (err) {
      console.error('Error al obtener datos', err);
      res.status(500).send('Error al cargar los datos.');  
  } 
}