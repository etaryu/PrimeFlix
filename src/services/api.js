import axios from "axios";

//URL da API: /movie/now_playing?api_key=daf6254b45484c980420774824307a34&language=pt-BR
// base da URL:https://api.themoviedb.org/3

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;