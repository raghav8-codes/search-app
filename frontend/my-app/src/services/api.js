import axios from "axios";

const API_URL = "http://127.0.0.1:8000";  // FastAPI backend

// 🔍 search and store results in DB
export const searchAndStore = async (keyword) => {
  const res = await axios.post(`${API_URL}/search`, { keyword });
  return res.data;
};

// 📦 fetch stored results
export const fetchStoredResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};