import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api', // url onde o backend está rodando
});

export default api;