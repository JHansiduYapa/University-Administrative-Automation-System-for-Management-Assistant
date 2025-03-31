// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9080", // Change this to your backend URL and port if needed
});

export default api;
