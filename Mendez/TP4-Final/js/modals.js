export function populateEditForm(button, selector) {
  const id = button.dataset.id;
  const modal = document.querySelector(selector);
  if (!modal) return;
 
  modal.dataset.id = id;

  modal.querySelector('#editEventTitle').value = button.dataset.title || '';
  modal.querySelector('#editEventDescription').value = button.dataset.description || '';
  modal.querySelector('#editEventCapacity').value = button.dataset.capacity || '';
  modal.querySelector('#editEventDate').value = button.dataset.date || '';
}

export function openInfoModal(modal, eventData) {
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body p');

  modalTitle.textContent = eventData.title;
  modalBody.textContent = eventData.description;
}