import {api} from './api.js';
import { getToken } from './auth.js';


export async function fetchEvents() {
  try {
    const response = await api.get('/api/events');
    return response.data; 
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error;
  }
}


export async function createEvent(tittle, date, capacity) {
  const response = await api.post('/api/events', {
    tittle,
    capacity,
    date
  });

  return response.data;
}



export async function deleteEvent(eventId) {
  const token = getToken();

  if (!eventId) {
    console.error('ID de evento no proporcionado');
    return;
  }

  const response = await api.delete(`api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
