import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const getCategories = () => axios.get(`${API_URL}/categories`).then(r => r.data);
export const getLocations = () => axios.get(`${API_URL}/locations`).then(r => r.data);