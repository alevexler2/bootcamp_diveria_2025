import {
  getEvents,
  getEventById,
  getMostReservedEvents,
  getAvailableEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "./utils/axios.js";
import { getMensajeError } from "./utils/errors.js";

// Obtener eventos con filtros opcionales
const formGetEvents = document.querySelector("#form-get-events");
const cardsContainer = document.querySelector("#cards-get-events");

formGetEvents.addEventListener("submit", async (e) => {
  e.preventDefault();

  const filters = Object.fromEntries(new FormData(formGetEvents).entries());

  cardsContainer.innerHTML = `<div class="skeleton-card"></div>`;

  try {
    const events = await getEvents(filters);

    if (events.length === 0) {
      cardsContainer.innerHTML = "<p>No se encontraron eventos.</p>";
      return;
    }

    cardsContainer.innerHTML = events
      .map(
        (ev) => `
      <div class="card">
        <h3>${ev.title}</h3>
        <p>Fecha: ${new Date(ev.date).toLocaleDateString()}</p>
        <p>Cupo total: ${ev.capacity}</p>
        <p>Reservas confirmadas: ${ev.confirmedReservations}</p>
      </div>`
      )
      .join("");
  } catch (error) {
    const mensaje = getMensajeError(error);
    cardsContainer.innerHTML = `<p class="error-card">${mensaje}</p>`;
  }
});

// Obtener evento por ID
const formGetEventById = document.querySelector("#form-get-event-by-id");
const containerById = document.querySelector("#cards-get-event-by-id");

formGetEventById.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = formGetEventById.querySelector("input[name='id']").value.trim();

  containerById.innerHTML = `<div class="skeleton-card"></div>`;

  try {
    const event = await getEventById(id);

    containerById.innerHTML = `
      <div class="card">
        <h3>${event.title}</h3>
        <p>Fecha: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Cupo total: ${event.capacity}</p>
        <p>Reservas confirmadas: ${event.confirmedReservations}</p>
      </div>
    `;
  } catch (error) {
    const mensaje = getMensajeError(error);
    containerById.innerHTML = `<p class="error-card">${mensaje}</p>`;
  }
});

// Obtener evento más reservado
const btnGetMostReservedEvents = document.querySelector(
  "#btn-get-most-reserved"
);
const containerMostReserved = document.querySelector(
  "#cards-get-most-reserved"
);

btnGetMostReservedEvents.addEventListener("click", async () => {
  containerMostReserved.innerHTML = `<div class="skeleton-card"></div>`;

  try {
    const event = await getMostReservedEvents();

    if (!event) {
      containerMostReserved.innerHTML = "<p>No se encontró el evento.</p>";
      return;
    }

    containerMostReserved.innerHTML = `
      <div class="card">
        <h3>${event.title}</h3>
        <p>Fecha: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Cupo total: ${event.capacity}</p>
        <p>Reservas confirmadas: ${event.confirmedReservations}</p>
      </div>
    `;
  } catch (error) {
    const mensaje = getMensajeError(error);
    containerMostReserved.innerHTML = `<p class="error-card">${mensaje}</p>`;
  }
});

// Obtener eventos disponibles
const btnGetAvailableEvents = document.querySelector("#btn-get-available");
const containerAvailable = document.querySelector("#cards-get-available");

btnGetAvailableEvents.addEventListener("click", async () => {
  containerAvailable.innerHTML = `
  <div class="skeleton-card"></div>
`;

  try {
    const events = await getAvailableEvents();

    if (events.length === 0) {
      containerAvailable.innerHTML = "<p>No se encontraron eventos.</p>";
      return;
    }

    containerAvailable.innerHTML = events
      .map(
        (ev) => `
      <div class="card">
        <h3>${ev.title}</h3>
        <p>Fecha: ${new Date(ev.date).toLocaleDateString()}</p>
        <p>Cupo total: ${ev.capacity}</p>
        <p>Reservas confirmadas: ${ev.confirmedReservations}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    const mensaje = getMensajeError(error);
    containerAvailable.innerHTML = `<p class="error-card">${mensaje}</p>`;
  }
});

// Crear un nuevo evento
const formPostEvent = document.querySelector("#form-post-event");
const containerPostEvent = document.querySelector("#cards-post-event");

formPostEvent.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(formPostEvent).entries());
  containerPostEvent.innerHTML = `
  <div class="skeleton-card"></div>
`;

  try {
    const event = await createEvent({
      title: data.title,
      date: data.date,
      capacity: parseInt(data.capacity, 10),
    });

    containerPostEvent.innerHTML = `
      <div class="card">
        <h3>${event.title}</h3>
        <p>Fecha: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Cupo: ${event.capacity}</p>
      </div>
    `;
  } catch (error) {
    const mensaje = getMensajeError(error);
    containerPostEvent.innerHTML = `<p class="error-card">${mensaje}</p>`;
  }
});

const containerManageEvents = document.querySelector("#cards-manage-events");
const btnRefreshEvents = document.querySelector("#btn-refresh-events");


// Función para mostrar la lista de eventos
function renderManageEvents(events) {
  if (events.length === 0) {
    containerManageEvents.innerHTML = "<p>No hay eventos para mostrar.</p>";
    return;
  }

  containerManageEvents.innerHTML = events
    .map(
      (ev) => `
  <div class="card manage-event" data-id="${ev.id}">
    <div class="form-group">
      <label for="title-${ev.id}">Título</label>
      <input id="title-${ev.id}" type="text" class="edit-title" value="${
        ev.title
      }" />
    </div>
    <div class="form-group">
      <label for="date-${ev.id}">Fecha</label>
      <input id="date-${
        ev.id
      }" type="date" class="edit-date" value="${ev.date.slice(0, 10)}" />
    </div>
    <div class="form-group">
      <label for="capacity-${ev.id}">Capacidad</label>
      <input id="capacity-${
        ev.id
      }" type="number" class="edit-capacity" min="1" value="${ev.capacity}" />
    </div>
    <button class="btn-update">PUT</button>
    <button class="btn-delete">DELETE</button>
  </div>
`
    )
    .join("");
}

// Carga los eventos al hac3ere click
btnRefreshEvents.addEventListener("click", async () => {
  containerManageEvents.innerHTML = `
  <div class="skeleton-card manage-card"></div>
`;
  try {
    const events = await getEvents({});
    renderManageEvents(events);
  } catch (error) {
    containerManageEvents.innerHTML = `<p class="error-card">${getMensajeError(
      error
    )}</p>`;
  }
});

// Eventos para actualizar o eliminar en la lista
containerManageEvents.addEventListener("click", async (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;

  if (e.target.classList.contains("btn-update")) {

    const updatedData = {
      title: card.querySelector(".edit-title").value.trim(),
      date: card.querySelector(".edit-date").value,
      capacity: parseInt(card.querySelector(".edit-capacity").value, 10),
    };

    if (
      !updatedData.title ||
      !updatedData.date ||
      !updatedData.capacity ||
      updatedData.capacity < 1
    ) {
      alert("Por favor complete todos los campos correctamente.");
      return;
    }

    try {
      await updateEvent(id, updatedData); 
      alert("Evento actualizado correctamente.");
      btnRefreshEvents.click(); 
    } catch (error) {
      alert(getMensajeError(error));
    }
  }

  if (e.target.classList.contains("btn-delete")) {
    if (!confirm("¿Seguro querés eliminar este evento?")) return;

    try {
      await deleteEvent(id); 
      alert("Evento eliminado correctamente.");
      btnRefreshEvents.click();
    } catch (error) {
      alert(getMensajeError(error));
    }
  }
});
