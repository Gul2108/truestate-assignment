import axios from "axios";

const API_BASE_URL = "https://truestate-assignment-822j.onrender.com/api";

export const fetchSales = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/sales`, { params });
  console.log("API Response:", response.data); // Debugging line
  return response.data;
};
