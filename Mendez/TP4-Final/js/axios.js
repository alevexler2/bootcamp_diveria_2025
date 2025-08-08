import axiosInstance from './axiosInstance.js';

class EventService {
  constructor(apiClient = axiosInstance) {
    this.api = apiClient;
  }

  async getEvents() {
    const response = await this.api.get('/event');
    return response.data;
  }

  async createEvent(data) {
    const response = await this.api.post('/event', data);
    return response.data;
  }

  async deleteEvent(id) {
    const response = await this.api.delete(`/event/${id}`);
    return response.data;
  }

  async updateEvent(id, event) {
    const response = await this.api.patch(`/event/${id}`, event);
    return response.data;
  }
}

export const eventService = new EventService();