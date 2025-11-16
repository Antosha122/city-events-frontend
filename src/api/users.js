import axios from "axios";
import { getToken } from "../auth/storage";

const API_URL = import.meta.env.VITE_API_URL

export const getMe = async () => {
  const token = getToken();
  if (!token) throw new Error("No auth token");

  const res = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};




