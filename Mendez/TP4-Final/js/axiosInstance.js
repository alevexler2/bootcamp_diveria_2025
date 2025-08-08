const axiosInstance = axios.create({
  baseURL: 'http://localhost:5206',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;