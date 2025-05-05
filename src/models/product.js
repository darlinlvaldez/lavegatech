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
    GROUP BY p.id `;

    try {
        const [results] = await db.query(query, [id]);
        return results.length > 0 ? results[0] : null;
    } catch (err) {
        console.error("Error al obtener detalles del producto:", err.message);
        throw new Error("Error al obtener detalles del producto: " + err.message);
    }
};

product.obtenerImagen = async (productoId, color) => {
    try {
        const query = `
            SELECT img 
            FROM variantes 
            WHERE producto_id = ? AND color = ?
        `;
        const [result] = await db.execute(query, [productoId, color]);
        return result.length > 0 ? result[0].img : null;
    } catch (error) {
        console.error('Error al obtener la imagen por color:', error);
        throw error;
    }
};

product.obtenerStock = async (productoId, color) => {
    try {
        const query = `
            SELECT stock 
            FROM variantes 
            WHERE producto_id = ? AND color = ?`;
        const [result] = await db.execute(query, [productoId, color]);
        
        return result.length > 0 ? result[0].stock : 0;
    } catch (error) {
        console.error('Error al obtener el stock por color:', error);
        return 0;
    }
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