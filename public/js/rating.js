document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviews');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    if (reviewsContainer) {
        const productId = reviewsContainer.dataset.productId;
        loadReviews(1, 3, productId);

        reviewsContainer.addEventListener('click', e => {
            const link = e.target.closest('.reviews-pagination a');
            if (link) {
                e.preventDefault();
                const page = Number(link.dataset.page);
                if (page && productId) { 
                    loadReviews(page, 3, productId);
                }
            }
        });
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
        producto_id: formData.get('producto_id'),
        calificacion: formData.get('calificacion'),
        comentario: formData.get('comentario')
    };

    try {
        const response = await fetch('/api/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const result = await response.json();

                if (response.ok) {
            showToast("Reseña enviada con éxito.", "#27ae60", "check-circle");
            setTimeout(() => location.reload(), 1500);
        } else {
            showToast(result.error || 'Error al enviar la reseña', "#e74c3c", "alert-circle");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al enviar la reseña', "#e74c3c", "alert-circle");
    }
}

async function loadReviews(page, limit, productId) {
    try {
        const response = await fetch(`/api/ratings/product/${productId}?pagina=${page}&limite=${limit}`);
        const data = await response.json();

        if (!data.reviews || !Array.isArray(data.reviews)) {
            throw new Error('Datos de reseñas no válidos');
        }

        const reviewsHTML = data.reviews.length
            ? renderReviewsList(data.reviews)
            : '<p>No hay reseñas para este producto todavía.</p>';

        const paginationHTML = data.totalPages > 1
            ? renderPagination(page, data.totalPages)
            : '';

        document.getElementById('reviews').innerHTML = reviewsHTML + paginationHTML;

        if (data.averageRating !== undefined && data.ratingDistribution) {
            updateRatingStats(data.averageRating, data.ratingDistribution);
        }
    } catch (error) {
        console.error('Error al cargar reseñas:', error);
        document.getElementById('reviews').innerHTML = `
            <p>Error al cargar las reseñas. Por favor, intenta nuevamente.</p>
        `;
    }
}

function renderReviewsList(reviews) {
    return `
        <ul class="reviews">
            ${reviews.map(({ username, fecha_creacion, calificacion, comentario }) => `
                <li>
                    <div class="review-heading">
                        <h5 class="name">${username}</h5>
                        <p class="date">${new Date(fecha_creacion).toLocaleDateString()}</p>
                        <div class="review-rating">${renderStars(calificacion)}</div>
                    </div>
                    <div class="review-body">
                        <p>${comentario || 'El usuario no dejó comentario'}</p>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}

function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
        `<i class="fa fa-star${i < rating ? '' : '-o empty'}"></i>`
    ).join('');
}

function renderPagination(currentPage, totalPages) {
    const pages = [];
    const createPageLink = (page) => `<a href="#" data-page="${page}">${page}</a>`;

    const addEllipsis = () => '<li><span>...</span></li>';

    let html = '<ul class="reviews-pagination">';

    if (currentPage > 1) {
        html += `<li><a href="#" data-page="${currentPage - 1}"><i class="fa fa-angle-left"></i></a></li>`;
    }

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
        html += `<li>${createPageLink(1)}</li>`;
        if (start > 2) html += addEllipsis();
    }

    for (let i = start; i <= end; i++) {
        html += `<li class="${i === currentPage ? 'active' : ''}">${createPageLink(i)}</li>`;
    }

    if (end < totalPages) {
        if (end < totalPages - 1) html += addEllipsis();
        html += `<li>${createPageLink(totalPages)}</li>`;
    }

    if (currentPage < totalPages) {
        html += `<li><a href="#" data-page="${currentPage + 1}"><i class="fa fa-angle-right"></i></a></li>`;
    }

    html += '</ul>';
    return html;
}

function updateRatingStats(averageRating, ratingDistribution) {
    const avgSpan = document.querySelector('.rating-avg span');
    const avgStarsContainer = document.querySelector('.rating-avg .rating-stars');
    const distributionList = document.querySelectorAll('.rating li');

    if (!avgSpan || !avgStarsContainer || distributionList.length === 0) return;

    avgSpan.textContent = averageRating.toFixed(1);

    avgStarsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= Math.floor(averageRating)) {
            star.className = 'fa fa-star';
        } else if (i === Math.ceil(averageRating) && averageRating % 1 > 0.3) {
            star.className = 'fa fa-star-half-o';
        } else {
            star.className = 'fa fa-star-o';
        }
        avgStarsContainer.appendChild(star);
    }

    const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);

    for (let stars = 5; stars >= 1; stars--) {
        const item = ratingDistribution.find(item => item.calificacion === stars) || { count: 0 };
        const li = distributionList[5 - stars];

        if (!li) continue;

        const progressDiv = li.querySelector('.rating-progress div');
        if (progressDiv) {
            progressDiv.style.width = totalReviews > 0 ? (item.count / totalReviews * 100) + '%' : '0%';
        }

        const sumElem = li.querySelector('.sum');
        if (sumElem) {
            sumElem.textContent = item.count;
        }
    }
}

function showToast(message, color = "#27ae60", icon = "check-circle") {
  Toastify({
    text: `<i data-feather="${icon}" style="vertical-align: middle; margin-right: 8px;"></i> ${message}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: color },
    close: true,
    escapeMarkup: false,
    className: "toast-notification",
  }).showToast();

  setTimeout(() => {
    feather.replace();
  }, 100);
}