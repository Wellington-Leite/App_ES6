import axios from 'axios';

//Criando uma conf. do axios com uma base url
const api = axios.create({
    baseURL: 'https://api.github.com/users',
});

export default api;