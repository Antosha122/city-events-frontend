import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (payload) => {
  const response = await axios.post(`${API_URL}/auth/register`, payload);
  return response.data;
};


