import db from "../database/mobiles.js";

const store = {};

const construirWhereClause = (categorias = [], marcas = [], precioMin = null, precioMax = null) => {
    const condiciones = [];
    
    if (categorias.length > 0) {
        condiciones.push(`p.categoria_id IN (${categorias.join(',')})`);
    }

    if (marcas.length > 0) {
        condiciones.push(`(
            p.marca_id IN (${marcas.join(',')}) OR p.categoria_id NOT IN ( 
            SELECT DISTINCT mc.categoria_id
            FROM marca_categoria mc 
            WHERE mc.marca_id IN (${marcas.join(',')})))`);
        }

    if (precioMin !== null && !isNaN(precioMin)) {
        condiciones.push(`p.precio >= ${precioMin}`);
    }

    if (precioMax !== null && !isNaN(precioMax)) {
        condiciones.push(`p.precio <= ${precioMax}`);
    }

    return condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';
};

store.obtenerStore = async (pagina = 1, limite = 9, orden = 0, categorias = [], marcas = [], precioMin, precioMax) => {
    const offset = (pagina - 1) * limite;
    const whereClause = construirWhereClause(categorias, marcas, precioMin, precioMax);

    const orderByClause = {
        1: "ORDER BY p.fecha ASC",
        2: "ORDER BY p.precio ASC",     
        3: "ORDER BY p.precio DESC",
        4: "ORDER BY p.descuento DESC",
    }[orden] || "ORDER BY p.fecha DESC";
    
    const query = `
        SELECT 
    p.id,
    p.nombre,
    p.precio,
    p.descuento,
    p.fecha,
    p.img_principal AS imagen,
    c.categoria,
    v.stock,
    v.color
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN variantes v ON p.id = v.producto_id
${whereClause}
GROUP BY p.id
${orderByClause}
LIMIT ? OFFSET ?
    `;

    try {
        const [results] = await db.query(query, [limite, offset]);
        return results;
    } catch (err) {
        throw new Error("Error al obtener los productos: " + err.message);
    }
};

store.totalProductos = async (categorias = [], marcas = [], precioMin, precioMax) => {
    const whereClause = construirWhereClause(categorias, marcas, precioMin, precioMax);

    const query = `
        SELECT COUNT(*) as total
        FROM productos p
        ${whereClause}
    `;

    try {
        const [results] = await db.query(query);
        return results[0].total;
    } catch (err) {
        throw new Error("Error al obtener el total de productos: " + err.message);
    }
};

store.cantidadCategoria = async () => {
    const mapeoCategorias = {
        1: "Móviles",
        2: "SmartTV",
        3: "Laptops",
        4: "Consolas",
        5: "Tablets",
        6: "Otros"
    };

    const query = `
        SELECT 
            c.id AS categoria_id, 
            c.categoria, 
            COUNT(p.id) AS cantidad
        FROM categorias c
        LEFT JOIN productos p ON c.id = p.categoria_id
        GROUP BY c.id
    `;

    try {
        const [results] = await db.query(query);
        return results.map(row => ({
            categoria_id: row.categoria_id,
            categoria: mapeoCategorias[row.categoria_id] || row.categoria,
            cantidad: row.cantidad
        }));
    } catch (err) {
        throw new Error("Error al obtener la cantidad de productos por categoría: " + err.message);
    }
};

store.cantidadMarcas = async (categorias = []) => {
    let whereClause = '';
    let joinClause = '';
    
    if (categorias.length > 0) {
        whereClause = `WHERE p.categoria_id IN (${categorias.join(',')})`;
        joinClause = `JOIN marca_categoria mc ON m.id = mc.marca_id AND mc.categoria_id IN (${categorias.join(',')})`;
    }

    const query = `
        SELECT 
            m.id AS marca_id,
            m.nombre AS marca,
            COUNT(p.id) AS cantidad
        FROM p_marcas m
        LEFT JOIN productos p ON m.id = p.marca_id
        ${joinClause}
        ${whereClause}
        GROUP BY m.id, m.nombre
        HAVING cantidad > 0
        ORDER BY m.nombre
    `;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw new Error("Error al obtener las marcas y cantidad de productos: " + err.message);
    }
};

export default store;