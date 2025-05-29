import product from "../models/product.js";

product.detallesController = async (req, res) => {
    try {
        const { id } = req.params;
        const { color } = req.query;
        const producto = await product.obtenerDetalles(id);

        if (!producto) {
            return res.status(404).render('error', { mensaje: "Producto no encontrado" });
        }

        const colorActual = color && producto.imagenesPorColor[decodeURIComponent(color)]
            ? decodeURIComponent(color) : producto.colores[0];

        if (!color && producto.colores.length > 0) {
            return res.redirect(`/product/${id}?color=${encodeURIComponent(colorActual)}`);
        }

        const productRelacionados = await product.obtenerRelacionados(producto.id, producto.categoriaId);

        res.render('store/product', {
            producto,
            productRelacionados,
            imagenesPorColor: producto.imagenesPorColor,
            colorSeleccionado: colorActual,
            stocksPorColor: producto.stocksPorColor,
            currentUrl: req.originalUrl,
            colores: producto.colores
        });
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        res.status(500).render('error', { message: error.message });
    }
};

export default product;