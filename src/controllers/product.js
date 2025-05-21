import product from "../models/product.js";

product.detallesController = async (req, res) => {
    try {
        const { id } = req.params;
        const { color } = req.query;

        const producto = await product.obtenerDetalles(id);
        if (!producto) {
            return res.status(404).render('error', { mensaje: "Producto no encontrado" });
        }

        const colores = producto.colores ? producto.colores.split(',') : [];
        
        if (!color && colores.length > 0) {
            const colorDefault = encodeURIComponent(colores[0].trim());
            return res.redirect(`/product/${id}?color=${colorDefault}`);
        }

        const imagenes = producto.imagenes ? producto.imagenes.split(',') : [];
        const imagenesPorColor = {};
        colores.forEach((colorItem, index) => {
            imagenesPorColor[colorItem.trim()] = imagenes[index];
        });

        const colorActual = color && imagenesPorColor[decodeURIComponent(color)] 
            ? decodeURIComponent(color) 
            : colores[0]?.trim();

        const productRelacionados = await product.obtenerRelacionados(producto.id, producto.categoriaId);

        res.render('store/product', {producto, productRelacionados, imagenesPorColor,
            colorSeleccionado: colorActual, stocksPorColor: producto.stocksPorColor,
            currentUrl: req.originalUrl});
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        res.status(500).render('error', { mensaje: error.message });
    }
};

export default product;