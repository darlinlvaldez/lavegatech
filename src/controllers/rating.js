import rating from '../models/rating.js';

const ratingController = {};

ratingController.submitReview = async (req, res) => {
    try {
      const { producto_id, calificacion, comentario } = req.body;
      const usuario_id = req.session.user.id; 

      if (!producto_id || !calificacion || calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ error: 'Datos de reseña inválidos' });
      }

      const hasReviewed = await rating.userHasReviewed(producto_id, usuario_id);
      if (hasReviewed) {
        return res.status(400).json({ error: 'Ya has enviado una reseña para este producto' });
      }

      await rating.create({ producto_id, usuario_id, calificacion, comentario });

      const reviews = await rating.findByProductId(producto_id);
      const averageRating = await rating.getAverageRating(producto_id) || 0;
      const ratingDistribution = await rating.getRatingDistribution(producto_id) || [];

      res.json({success: true, reviews, averageRating, ratingDistribution});
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      res.status(500).json({ error: 'Error al procesar la reseña' });
    }
};

ratingController.getProductReviews = async (req, res) => {
    try {
      const { producto_id } = req.params;
      const { pagina = 1, limite = 3 } = req.query;

      const reviews = await rating.findByProductId(producto_id, pagina, limite);
      const totalReviews = await rating.countByProductId(producto_id);
      const avgRating = await rating.getAverageRating(producto_id);
      
      const averageRating = avgRating ? parseFloat(avgRating) : 0;
      const ratingDistribution = await rating.getRatingDistribution(producto_id) || [];
      const totalPages = Math.ceil(totalReviews / limite);

      res.json({ reviews, averageRating, ratingDistribution, totalPages,
        currentPage: parseInt(pagina), limit: parseInt(limite)
      });
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      res.status(500).json({ error: 'Error al obtener reseñas' });
    }
};

export default ratingController;