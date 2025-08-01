const output = document.getElementById("output");
const apiUrl = "https://localhost:7154/Events";

function fetchData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener datos");
      }
      return response.json();
    })
    .then((data) => {
      showEvents(data);
      console.log("Datos obtenidos:", data);
    })
    .catch((error) => {
      console.error("Error con fetch", error);
    });
}

function showEvents(events) {
  output.style.display = "flex";

  output.innerHTML = "";

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
      day: "numeric"
    });

    eventDiv.innerHTML = `
            <div class='event-info'>
                <h3 class='event-title'>${event.title}</h3>
                <p class='event-date'>Fecha: ${formattedDate}</p>
                <p class='event-capacity'>Capacidad máxima: ${event.capacity} personas</p>
                ${
                  event.reservationDeadLine
                    ? `<p class='event-deadline'>Fecha límite reservas: ${new Date(
                        event.reservationDeadLine
                      ).toLocaleDateString("es-ES")}</p>`
                    : '<p class="event-deadline">Sin límite de reservas</p>'
                }
            </div>
        `;

    output.appendChild(eventDiv);
  });
}

document.addEventListener("DOMContentLoaded", fetchData);
