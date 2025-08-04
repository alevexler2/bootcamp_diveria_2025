const apiUrl = "https://localhost:7154/Events";

function axiosGetEvents() {
  const output = document.getElementById("output");
  axios
    .get(apiUrl)
    .then((res) => showEvents(res.data))
    .catch((err) => (output.textContent = `Error con Axios: ${err.message}`));
}

function axiosPostEvent() {
  const form = document.getElementById("addEventForm");

  axios
    .post(apiUrl, {
      createdBy: 1, // no puede ser null
      title: form.eventName.value,
      date: form.eventDate.value,
      capacity: form.eventCapacity.value,
      reservationDeadline: form.reservationDeadline.value,
    })
    .then(function (response) {
      console.log(response);
      axiosGetEvents();

      const modal = document.getElementById("addEventModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      form.reset();
    })
    .catch(function (error) {
      console.log(error);
      alert("Error al crear el evento. Por favor intenta de nuevo.");
    });
}

function axiosDeleteEvent(eventId) {
  axios
    .delete(`${apiUrl}/${eventId}`)
    .then(() => {
      console.log(`Evento ${eventId} eliminado`);
      axiosGetEvents();
    })
    .catch((err) =>
      console.error(`Error al eliminar el evento: ${err.message}`)
    );
}

function axiosGetDetailsEvent(eventId) {
  axios
    .get(`${apiUrl}/${eventId}`)
    .then((res) => showEventDetails(res.data))
    .catch((err) =>
      console.error(`Error al obtener detalles del evento: ${err.message}`)
    );
}

function axiosPostReservation(eventId) {
  const form = document.getElementById("addReservationForm");

  axios
    .post(`${apiUrl}/Reservations`, {
      eventId: eventId,
      attendeeName: form.attendeeName.value,
      attendeeEmail: form.attendeeEmail.value,
    })
    .then(function (response) {
      console.log(response);
      axiosGetDetailsEvent(eventId);

      const modal = document.getElementById("addReservationModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      form.reset();
    })
    .catch(function (error) {
      console.log(error);
      alert("Error al crear la reserva. Por favor intenta de nuevo.");
    });
}

document.addEventListener("DOMContentLoaded", axiosGetEvents);

function showEvents(events) {
  const output = document.getElementById("output");


  if (!events || events.length === 0) {
    output.innerHTML = '<p class="no-events">No hay eventos disponibles</p>';
    return;
  }

  events.forEach((event) => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event-card";

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    eventDiv.innerHTML = `
            <div class='event-info'>
                <h3 class='event-title'>${event.title}</h3>
                <p class='event-date'>Fecha: ${formattedDate}</p>
                <p class='event-capacity'>Capacidad máxima: ${
                  event.capacity
                } personas</p>
                ${
                  event.reservationDeadLine
                    ? `<p class='event-deadline'>Fecha límite reservas: ${new Date(
                        event.reservationDeadLine
                      ).toLocaleDateString("es-ES")}</p>`
                    : '<p class="event-deadline">Sin límite de reservas</p>'
                }
                <button class="btn btn-outline-secondary btn-sm" onclick="axiosGetDetailsEvent(${
                  event.id
                })" data-bs-toggle="modal" data-bs-target="#detailsModal">Detalles</button>
                <button class="btn btn-outline-danger btn-sm" onclick="axiosDeleteEvent(${
                  event.id
                })">Eliminar</button>
            </div>
        `;

    output.appendChild(eventDiv);
  });
}

function showEventDetails(event) {
  const modalBody = document.querySelector("#eventDetails");
  const modalFooter = document.querySelector("#eventAddReservationModalFooter");
  console.log(event);
  modalBody.innerHTML = `
    <h3 class="modal-title">${event.title}</h3>
    <div class="event-info">
    <p><strong>Fecha:</strong> ${new Date(event.date).toLocaleDateString(
      "es-ES"
    )}</p>
    <p><strong>Capacidad máxima:</strong> ${event.capacity} personas</p>
    <p><strong>Fecha límite de reservas:</strong> ${
      event.reservationDeadline
        ? new Date(event.reservationDeadline).toLocaleDateString("es-ES")
        : "Sin límite de reservas"
    }</p>
        <h4>Reservas:</h4>
        <ul class="list-group text-start">
          ${
            event.reservations.length > 0
              ? event.reservations
              .map(
                (reservation) => `
        <li class="list-group-item">
          <p>Usuario: ${reservation.attendeeName}</p>
          <p>Email: ${reservation.attendeeEmail}</p>
        </li>
      `
              )
              .join("")
          : '<li class="list-group-item">No hay reservas para este evento</li>'
      }
    </ul>
    </div>
  `;

  modalFooter.innerHTML = `
  <button type="button" class="btn btn-outline-secondary" data-bs-target="#detailsModal" data-bs-toggle="modal">
      Cancelar
  </button>
  <button type="submit" class="btn btn-primary" onclick="axiosPostReservation(${event.id})" data-bs-target="#detailsModal" data-bs-toggle="modal">
    Guardar reserva
  </button>
  `;
}
