import { getToken } from './auth.js';
export const api = axios.create({
    baseURL: 'https://localhost:7222',
    headers:{
        'Content-Type': 'application/json'
    }
})
api.interceptors.request.use(config =>{
    const token= getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})