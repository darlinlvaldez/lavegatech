import { obtenerDetalles, obtenerRelacionados, obtenerStock } from "../models/product.js";

export async function detallesController(req, res) {
    try {
        const { id } = req.params;
        const { color } = req.query;

        const producto = await obtenerDetalles(id);

        if (!producto) {
            return res.status(404).render('error', { mensaje: "Producto no encontrado" });
        }

        const categoriaId = producto.categoriaId;
        const productRelacionados = await obtenerRelacionados(producto.id, categoriaId);

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

        const stockColor = await obtenerStock(producto.id, colorActual);

        res.render('store/product', { 
            producto, productRelacionados, imagenesPorColor, colorSeleccionado: colorActual, 
            stockColor: stockColor || producto.stock, currentUrl: req.originalUrl
        });
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        res.status(500).render('error', { mensaje: error.message });
    }
}