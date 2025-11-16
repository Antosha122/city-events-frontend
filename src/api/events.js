import axios from "axios";
import { getToken } from "../auth/storage";

const API_URL = import.meta.env.VITE_API_URL

export const getEvents = async () => {
  const res = await axios.get(`${API_URL}/events/`);
  return res.data;
};

export const getEvent = async (id) => {
  const res = await axios.get(`${API_URL}/events/${id}`);
  return res.data;
};

export const createEvent = async (event) => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const res = await axios.post(`${API_URL}/events/new`, event, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMyEvents = async () => {
  const token = getToken();
  // assumes backend provides /events/mine for authenticated user
  const res = await axios.get(`${API_URL}/events/mine`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }); 
  return res.data;
};
