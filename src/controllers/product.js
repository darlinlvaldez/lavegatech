import product from "../models/product.js";

product.detallesController = async (req, res) => {
    try {
        const { id } = req.params;
        const { color } = req.query;

        const producto = await product.obtenerDetalles(id);

        if (!producto) {
            return res.status(404).render('error', { mensaje: "Producto no encontrado" });
        }

        const categoriaId = producto.categoriaId;
        const productRelacionados = await product.obtenerRelacionados(producto.id, categoriaId);

        const colores = producto.colores ? producto.colores.split(',') : [];

        if (!color && colores.length > 0) {
            const colorDefault = encodeURIComponent(colores[0].trim());
            return res.redirect(`/mobiles/product/${id}?color=${colorDefault}`);
        }

        const imagenes = producto.imagenes ? producto.imagenes.split(',') : [];
        const imagenesPorColor = {};

        colores.forEach((colorItem, index) => {
            const colorKey = colorItem.trim();
            imagenesPorColor[colorKey] = imagenes[index];
        });

        const colorActual = color && imagenesPorColor[decodeURIComponent(color)] ?
        decodeURIComponent(color) : colores[0]?.trim();

        const stockColor = await product.obtenerStock(producto.id, colorActual);

        res.render('store/product', { 
            producto, productRelacionados, imagenesPorColor, colorSeleccionado: colorActual, 
            stockColor: stockColor || producto.stock, currentUrl: req.originalUrl
        });
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        res.status(500).render('error', { mensaje: error.message });
    }
}

product.StockController = async (req, res) => {
    try {
        const { productId, color } = req.params;
        const stock = await productModel.obtenerStock(productId, decodeURIComponent(color));
        res.json({ stock });
    } catch (error) {
        console.error('Error al obtener stock:', error);
        res.status(500).json({ error: 'Error al obtener stock' });
    }
};

export default product;