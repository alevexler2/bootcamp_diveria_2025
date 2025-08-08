console.log('Usando baseURL:', api.defaults.baseURL);
import { api } from './api.js';
export async function login(username, password) {
    try {
        const response = await api.post('/api/auth/login', {
            username,
            password
        })

        const token = response.data.token;
        localStorage.setItem("token", token);
        return token;
    }
    catch (err) {
        throw new Error("Credenciales Incorrectas.");
    }
}
export function getToken() {
    return localStorage.getItem("token");
}
export function isAuthenticated() {
    return !!getToken();
}
export function logOut(){
    localStorage.removeItem("token");
}