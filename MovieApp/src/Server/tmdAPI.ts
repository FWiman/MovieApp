import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export default tmdbAPI;
