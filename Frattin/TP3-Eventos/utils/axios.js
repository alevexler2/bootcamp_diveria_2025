// Instancia base
const api = axios.create({
  baseURL: "http://localhost:5033",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper para construir query string desde objeto
export function buildQueryParams(filters) {
  const params = new URLSearchParams();
  for (const key in filters) {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  }
  return params.toString();
}

// Función genérica GET con filtros opcionales
export async function getEvents(filters = {}) {
  const query = buildQueryParams(filters);
  const url = `/events${query ? "?" + query : ""}`;
  const response = await api.get(url);
  return response.data;
}

// Obtener evento por ID
export async function getEventById(id) {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

// Obtener eventos más reservados
export async function getMostReservedEvents() {
  const response = await api.get(`/events/most-reserved`);
  return response.data;
}

// Obtener eventos disponibles
export async function getAvailableEvents() {
  const response = await api.get(`/events/available`);
  return response.data;
}

// Crear un nuevo evento
export async function createEvent(eventData) {
  const response = await api.post(`/events`, eventData);
  return response.data;
}

// Actualizar un evento existente
export async function updateEvent(id, eventData) {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
}

// Eliminar un evento
export async function deleteEvent(id) {
  const response = await api.delete(`/events/${id}`);
  return response.data;
}


// Exportar la instancia para usos específicos si querés
export default api;
