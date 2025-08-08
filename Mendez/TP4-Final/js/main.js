import { validateEventForm } from './validations.js';
import { eventService } from './axios.js';
import { 
  renderConnectionError, 
  renderToast, 
  renderEventsCards,
  renderEventsPlaceholders,
  renderErrors
} from './renders.js';
import { populateEditForm, openInfoModal } from './modals.js';
import SELECTORS from './common.js';

// FUNCIONES REUTILIZABLES
async function handleFormSubmit(form, apiAction, successMessage) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (form.id.includes('Edit')) {
    Object.keys(data).forEach(key => {
      if (data[key].trim() === '') delete data[key];
    });
  }

  const validationMode = form.id.includes('Create') ? 'create' : 'edit';
  const errors = validateEventForm(data, validationMode);

  if (Object.keys(errors).length > 0) {
    renderErrors(errors, form);
    return;
  }

  try {
    await apiAction(data);
    renderToast(successMessage, 'success');
    setTimeout(() => location.reload(), 1500);
  } catch (err) {
    console.error(`Error en la acción del formulario:`, err);
    renderToast(`Error: No se pudo completar la acción. Inténtalo de nuevo.`);
  }
}

async function loadInitialEvents() {
  const container = document.querySelector(SELECTORS.eventList);
  if (!container) return;
  
  renderEventsPlaceholders(container);
  try {
    const events = await eventService.getEvents();
    renderEventsCards(container, events);
  } catch (err) {
    console.error('Error cargando eventos:', err);
    renderConnectionError(container);
  }
}

// EVENT LISTENERS 
document.addEventListener('DOMContentLoaded', loadInitialEvents);

document.querySelector(SELECTORS.createForm)?.addEventListener('submit', async (e) => {
  e.preventDefault();
  await handleFormSubmit(e.target, data => eventService.createEvent(data), 'Evento creado con éxito.');
});

document.querySelector(SELECTORS.editForm)?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const modal = e.target.closest(SELECTORS.editModal);
  const id = modal.dataset.id;

  const updateAction = (data) => eventService.updateEvent(id, data);
  await handleFormSubmit(e.target, updateAction, 'Evento actualizado con éxito.');
});

document.addEventListener('click', async (e) => {
  const target = e.target;

  const deleteBtn = target.closest(`[data-bs-target="${SELECTORS.deleteModal}"]`);
  if (deleteBtn) {
    const modal = document.querySelector(SELECTORS.deleteModal);
    if (modal) modal.dataset.id = deleteBtn.dataset.id;
    return;
  }

  if (target.matches(SELECTORS.confirmDeleteBtn)) {
    const modal = target.closest(SELECTORS.deleteModal);
    const id = modal.dataset.id;
    try {
      await eventService.deleteEvent(id);
      renderToast('Evento eliminado correctamente.', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      console.error('Error al eliminar evento', err);
      renderToast('No se pudo eliminar el evento. Inténtalo de nuevo.');
    }
    return;
  }

  const editBtn = target.closest(SELECTORS.editBtn);
  if (editBtn) {
    populateEditForm(editBtn, SELECTORS.editModal);
    return;
  }


});

const infoModal = document.querySelector('#infoEventModal');

infoModal?.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  const eventData = {
    title: button.getAttribute('data-title'),
    description: button.getAttribute('data-description')
  };

  openInfoModal(infoModal, eventData);
});
