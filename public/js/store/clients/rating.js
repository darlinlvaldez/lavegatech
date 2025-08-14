import { showToast } from './toastify.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviews");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);

    const stars = document.querySelectorAll('input[name="calificacion"]');
    const hiddenInput = document.getElementById("calificacionInput");

    stars.forEach((star) => {
      star.addEventListener("change", () => {
        hiddenInput.value = star.value;
      });
    });
  }

  if (reviewsContainer) {
    const productId = reviewsContainer.dataset.productId;
    loadReviews(1, 3, productId);

    reviewsContainer.addEventListener("click", (e) => {
      const link = e.target.closest(".reviews-pagination a");
      if (link) {e.preventDefault();
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

  const reviewId = formData.get("review_id");
  const data = {comentario: formData.get("comentario"),
    calificacion: parseInt(formData.get("calificacion")),
  };

  try {
    const method = reviewId ? "PUT" : "POST";
    const url = reviewId ? `/api/ratings/${reviewId}` : "/api/ratings";

    if (!data.comentario || data.calificacion < 1 || data.calificacion > 5) {
      showToast("Datos inválidos", "#e74c3c", "alert-circle");
      return;
    }

    if (!reviewId) data.producto_id = formData.get("producto_id");

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      showToast(reviewId ? "Reseña actualizada con éxito" : "Reseña enviada con éxito.",
        "#27ae60", "check-circle");
      setTimeout(() => location.reload(), 1500);
    } else {
      showToast(result.error || "Error al enviar", "#e74c3c", "alert-circle");
    }
  } catch (error) {
    console.error("Error:", error);
    showToast("Error al enviar la reseña", "#e74c3c", "alert-circle");
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
            ? renderPagination(page, data.totalPages) : '';

        document.getElementById('reviews').innerHTML = reviewsHTML + paginationHTML;

        document.querySelectorAll('.edit-review-btn').forEach(button => {
            button.addEventListener('click', () => {
                const reviewId = button.dataset.id;
                handleEditReview(reviewId);
            });
        });

    } catch (error) {
        console.error('Error al cargar reseñas:', error);
        document.getElementById('reviews').innerHTML = `
            <p>Error al cargar las reseñas. Por favor, intenta nuevamente.</p>
        `;
    }
}

function handleEditReview(reviewId) {
  const reviewElement = document.querySelector(`.edit-review-btn[data-id="${reviewId}"]`).closest("li");
  const comentario = reviewElement.querySelector(".review-body p")?.innerText || "";
  const calificacion = reviewElement.querySelectorAll(".fa-star").length;

  document.getElementById("review_id").value = reviewId;
  document.getElementById("comentarioInput").value = comentario.trim();
  document.getElementById("calificacionInput").value = calificacion;

  showToast("Editando reseña...", "#f39c12", "edit");

  document.getElementById("reviewForm").scrollIntoView({ behavior: "smooth" });
}

function renderReviewsList(reviews) {
  const listItems = reviews.map(({ username, fecha_creacion, fecha_actualizacion, calificacion, comentario, esAutor, id }) => {
    const creada = new Date(fecha_creacion);
    const actualizada = new Date(fecha_actualizacion);
    const esEditada = creada.getTime() !== actualizada.getTime();

    const fechaMostrar = esEditada ? actualizada : creada;

    return `
      <li>
        <div class="review-heading">
          <h5 class="name">${username.toUpperCase()}</h5>
          <p class="date">
            ${fechaMostrar.toLocaleDateString()} 
            ${esEditada ? `<span class="edited">(Editada)</span>` : ''}
          </p>
          <div class="review-rating">${renderStars(calificacion)}</div>
          ${esAutor ? `<button class="edit-review-btn" data-id="${id}"><i class="fa-solid fa-pen"></i> Editar</button>` : ''}
        </div>
        <div class="review-body">
          <p>${comentario || 'El usuario no dejó comentario'}</p>
        </div>
      </li>
    `;
  }).join('');

  return `<ul class="reviews">${listItems}</ul>`;
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rating)) {
      return `<i class="fa-solid fa-star"></i>`;
    } else if (i < rating) {
      return `<i class="fa-regular fa-star-half-stroke"></i>`; 
    } else {
      return `<i class="fa-regular fa-star"></i>`;
    }
  }).join('');
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