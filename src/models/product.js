import db from "../database/mobiles.js";

const product = {};

product.obtenerDetalles = async (id) => {
    const query = `
    SELECT 
        p.id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.descuento,
        p.fecha,
        p.categoria_id AS categoriaId,
        c.categoria,
        GROUP_CONCAT(DISTINCT v.color ORDER BY v.color) AS colores,
        GROUP_CONCAT(DISTINCT v.img ORDER BY v.color) AS imagenes,
        GROUP_CONCAT(DISTINCT v.stock ORDER BY v.color) AS stocks
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN variantes v ON p.id = v.producto_id
    WHERE p.id = ?
    GROUP BY p.id`;

    const [results] = await db.query(query, [id]);
    if (!results.length) return null;

    const producto = results[0];
    
    if (producto.colores && producto.stocks) {
        producto.stocksPorColor = {};
        const colores = producto.colores.split(',');
        const stocks = producto.stocks.split(',');
        colores.forEach((color, i) => {
            producto.stocksPorColor[color.trim()] = parseInt(stocks[i]);
        });
    }

    return producto;
};

product.obtenerRelacionados = async (productoId, categoriaId) => {
    const query = `
    SELECT 
    p.id,
    p.nombre,
    p.precio,
    p.descuento,
    p.fecha,
    c.categoria,
    v.color AS color, 
    v.stock AS stock,
    v.img AS imagen
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN variantes v ON p.id = v.producto_id 
    WHERE p.id != ? AND p.categoria_id = ?
    GROUP BY p.id 
    LIMIT 4`;
    
    try {
        const [results] = await db.query(query, [productoId, categoriaId]);
        return results;
    } catch (err) {
        console.error("Error al obtener productos relacionados:", err);
        return [];
    }
};

export default product;