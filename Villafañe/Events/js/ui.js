
import { deleteEvent } from "./events.js";
export function showElement(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}
export function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

export function renderEvents(events) {
  const output = document.getElementById('output');
  output.innerHTML = ''; 

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('p');
    title.className = 'card-title';
    title.textContent = event.title;

    const para = document.createElement('p');
    para.className = 'card-para';
    const eventDate = new Date(event.date).toLocaleString();
    para.textContent = `Fecha: ${eventDate} - Capacidad: ${event.capacity}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.dataset.id = event.id;

    deleteBtn.addEventListener('click', async () => {
      try {
        await deleteEvent(event.id);
        const nuevosEventos = await fetchEvents();
        renderEvents(nuevosEventos);
      } catch (err) {
    console.error('Error al eliminar evento:', err);

    const backendMsg = err?.response?.data;
    if (backendMsg) {
      alert(backendMsg);
    } else {
      alert('Error al eliminar evento');
    }
  }
    });

    content.appendChild(title);
    content.appendChild(para);
    content.appendChild(deleteBtn);
    card.appendChild(content);
    output.appendChild(card);
  });
}





