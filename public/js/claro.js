app.get('/mobiles/product/:id', async (req, res) => {
    const { id } = req.params;
    const { color } = req.query;

    try {
        const producto = await obtenerDetallesProducto(id);

        if (!color && producto.colores) {
            const colores = producto.colores.split(',');
            const colorDefault = colores[0].trim();
            return res.redirect(`/mobiles/product/${id}?color=${colorDefault}`);
        }

        const colores = producto.colores.split(',');
        const imagenesPorColor = {};

        for (const color of colores) {
            const imagen = await obtenerImagen(id, color.trim());
            imagenesPorColor[color.trim()] = imagen || '/img/iphone12black.png';
        }

        res.render('store/product', { producto, imagenesPorColor });
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        res.status(500).send('Error al cargar el producto.');
    }
});

app.get('/api/imagen-producto', async (req, res) => {
  const { id, color } = req.query;

  try {
      const imageUrl = await obtenerImagen(id, color);

      if (imageUrl) {
          res.json({ success: true, imageUrl: imageUrl });
      } else {
          res.status(404).json({ success: false, message: 'Imagen no encontrada para el color seleccionado' });
      }
  } catch (error) {
      console.error('Error al obtener la imagen:', error);
      res.status(500).json({ success: false, message: 'Error al obtener la imagen' });
  }
});