import { login, isAuthenticated, logOut } from './auth.js';
import { fetchEvents , createEvent } from './events.js';
import { showElement, renderEvents } from './ui.js';

document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    await login(username, password);
    alert('Login exitoso');
    document.getElementById("loginForm").style.display = 'none';
    showElement('adminPanel');
    const eventos = await fetchEvents();
    renderEvents(eventos);
  } catch (err) {
    alert('Error al iniciar sesión');
    console.error(err);
  }
});

document.getElementById('getEventsBtn').addEventListener('click', async () => {
  try {
    const eventos = await fetchEvents();
    renderEvents(eventos);
  } catch (err) {
    alert('Error al obtener eventos');
    console.error(err);
  }
});

document.getElementById('createEventBtn').addEventListener('click', () => {
  document.getElementById('createEventForm').style.display = 'block';
});

document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const capacity = parseInt(document.getElementById('capacity').value);

  try {
    await createEvent(title, date, capacity);
    alert('Evento creado correctamente');
    document.getElementById('eventForm').reset();
    document.getElementById('createEventForm').style.display = 'none';
    const eventos = await fetchEvents();
    renderEvents(eventos);
  } catch (err) {
    console.error('Error al crear evento:', err);
    alert('Error al crear evento');
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  logOut();
  location.reload();
});

if (isAuthenticated()) {
  document.getElementById("loginForm").style.display = 'none';
  showElement('adminPanel');
  fetchEvents().then(renderEvents);
} else {
  document.getElementById("loginForm").style.display = 'block';
}


