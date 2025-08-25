import axios from "axios";

// Use the live Render backend URL
const API_URL = "https://search-app-2-9i0j.onrender.com";  

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
