export const buildProductFilters = ({
  categorias = [],
  marcas = []
}) => {
  const conditions = [];
  const params = [];

  if (categorias.length > 0) {
    const placeholders = categorias.map(() => '?').join(',');
    conditions.push(`p.categoria_id IN (${placeholders})`);
    params.push(...categorias);
  }

  if (marcas.length > 0) {
    const placeholders = marcas.map(() => '?').join(',');
    conditions.push(`p.marca_id IN (${placeholders})`);
    params.push(...marcas);
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : '',
    params
  };
};