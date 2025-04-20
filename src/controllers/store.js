import store from '../models/store.js';

store.storeController = async (req, res) => {
    try {
        const pagina = req.params.pagina ? parseInt(req.params.pagina) : 1;
        const limite = req.query.limite ? parseInt(req.query.limite) : 9;
        const orden = req.query.orden ? parseInt(req.query.orden) : 0;
        const categorias = req.query.categoria ? req.query.categoria.split(',').map(Number) : [];
        const marcas = req.query.marca ? req.query.marca.split(',').map(String) : [];
        const precioMin = req.query.precioMin ? parseFloat(req.query.precioMin) : null;
        const precioMax = req.query.precioMax ? parseFloat(req.query.precioMax) : null;

        const marcasCompatibles = await store.cantidadMarcas(categorias);
        const marcasCompatiblesIds = marcasCompatibles.map(m => m.marca_id.toString());
            
        const marcasFiltradas = marcas.filter(marca => 
            marcasCompatiblesIds.includes(marca)
        );

        const [productos, totalProduct, cantCategoria, cantMarcas] = await Promise.all([
            store.obtenerStore(pagina, limite, orden, categorias, marcasFiltradas, precioMin, precioMax),
            store.totalProductos(categorias, marcasFiltradas, precioMin, precioMax),
            store.cantidadCategoria(),
            store.cantidadMarcas(categorias)
        ]);

        res.render("store/store", {productos,  totalProduct, limite, pagina,  orden, categorias, marcas: marcasFiltradas,  
            marcasFiltradas: marcasFiltradas, cantCategoria, cantMarcas, precioMin, precioMax, 
            defaultMin: 1, defaultMax: 100000
        });
    } catch (err) {
        console.error('Error al obtener datos de productos:', err);
        res.status(500).send('Error al cargar los datos.');
    }
}

export default store;