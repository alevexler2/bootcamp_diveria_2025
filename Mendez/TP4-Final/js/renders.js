
export function renderConnectionError(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-danger d-flex flex-column align-items-center text-center p-4" role="alert">
      <i class="bi bi-wifi-off"></i>
      <h4 class="alert-heading">Error de Conexión</h4>
      <p>No pudimos cargar los eventos. Por favor, verifica tu conexión a internet e inténtalo de nuevo más tarde.</p>
    </div>
  `;
}

export function renderToast(message, type = 'danger') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  const toastId = 'toast-' + Date.now();
  toastEl.id = toastId;
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

export const renderEventsCards = (container, events) => {
  container.innerHTML = '';

  if (!events.length) {
    container.innerHTML = '<p class="text-center text-muted">No hay eventos programados por el momento.</p>';
    return;
  }

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('es-ES', {
      year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
    });

    const html = `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="event-card">
        <div>
          <h5 class="mb-2 fw-bold text-truncate">${event.title}</h5>
          <p class="mb-3 text-truncate">${event.description}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="event-date mb-0">${formattedDate}</p>
          <div class="event-actions d-flex ">
            <button 
              class="btn btn-outline-info btn-sm" data-bs-toggle="modal" data-bs-target="#infoEventModal"
              data-bs-placement="top"
              data-title="${event.title}"
              data-description="${event.description}"
              title="Ver mas"  
              data-id="${event.id}">
              <i class="bi bi-info-square"></i>
            </button>
            <button 
              class="btn btn-outline-secondary btn-sm btn-edit" 
              data-id="${event.id}"
              data-title="${event.title}"
              data-description="${event.description}"
              data-capacity="${event.capacity}"
              data-date="${event.date}"
              data-bs-toggle="modal" 
              data-bs-target="#editEventModal"  
              title="Editar evento"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <button 
              class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteEventModal" 
              title="Eliminar evento"
              data-id="${event.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>     
      </div>
    </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
  });
};

export const renderEventsPlaceholders = (container) => {
  container.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const placeholder = `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="event-card">
          <div>
            <h5 class="placeholder-glow mb-2 fw-bold">
              <span class="placeholder col-8"></span>
            </h5>
            <p class="placeholder-glow mb-3">
              <span class="placeholder col-12"></span>
              <span class="placeholder col-10"></span>
              <span class="placeholder col-6"></span>
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <p class="placeholder-glow mb-0 col-5">
              <span class="placeholder col-12"></span>
            </p>
            <div class="d-flex gap-2">
              <span class="placeholder btn btn-outline-secondary btn-sm disabled col-5"></span>
              <span class="placeholder btn btn-outline-danger btn-sm disabled col-5"></span>
            </div>
          </div>     
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', placeholder);
  }
};

export function renderErrors(errors, formElement) {
  formElement.querySelectorAll('.text-danger').forEach(el => el.remove());

  Object.entries(errors).forEach(([key, message]) => {
    const input = formElement.querySelector(`[name="${key}"]`);
    if (input) {
      const error = document.createElement('div');
      error.className = 'text-danger mt-1';
      error.textContent = message;
      input.closest('.mb-3').appendChild(error);
    }
  });
}
