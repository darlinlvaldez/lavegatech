import ratingModel from '../../models/store/rating.js';

const ratingController = {};

ratingController.submitReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.session.user.id; 

    const hasPurchased = await ratingModel.userHasPurchased(userId, productId);

    if (!hasPurchased) {
      return res.status(403).json({
        error: 'Solo puedes reseñar productos que hayas comprado'
      });
    }

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Datos de reseña inválidos' });
    }

    const hasReviewed = await ratingModel.userHasReviewed(productId, userId);

    if (hasReviewed) {
      return res.status(400).json({ error: 'Ya has enviado una reseña' });
    }

    await ratingModel.create({ productId, userId, rating, review });

    const reviews = await ratingModel.findByProductId(productId);
    const averageRating = await ratingModel.getAverageRating(productId) || 0;
    const ratingDistribution = await ratingModel.getRatingDistribution(productId) || [];

    res.json({success: true, reviews, averageRating, ratingDistribution});
  } catch (error) {
    console.error('Error al enviar reseña:', error);
    res.status(500).json({ error: 'Error al procesar la reseña' });
  }
};

ratingController.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 3 } = req.query;
    const userId = req.session?.user?.id || null;

    const reviews = await ratingModel.findByProductId(productId, page, limit, userId);
    const totalReviews = await ratingModel.countByProductId(productId);
    const avgRating = await ratingModel.getAverageRating(productId);
    
    const averageRating = avgRating ? parseFloat(avgRating) : 0;
    const ratingDistribution = await ratingModel.getRatingDistribution(productId) || [];
    const totalPages = Math.ceil(totalReviews / limit);

    res.json({ reviews, averageRating, ratingDistribution, totalPages,
      currentPage: parseInt(page), limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

ratingController.updateReview = async (req, res) => {
  try {
      const { id } = req.params;
      const { review, rating } = req.body;
      const userId = req.session.user.id;

      if (!review || !rating || rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Datos inválidos' });
      }

      const result = await ratingModel.updateReview(id, userId, review, rating);

      if (result.affectedRows === 0) {
          return res.status(403).json({ error: 'No puedes editar esta reseña' });
      }

      res.json({ success: true });
  } catch (error) {
      console.error('Error al editar reseña:', error);
      res.status(500).json({ error: 'Error al editar reseña' });
  }
};

export default ratingController;