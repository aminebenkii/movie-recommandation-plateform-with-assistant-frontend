import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";

  if (!config.headers) config.headers = {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Accept-Language"] = lang; // ✅ force override no matter what

  console.log("📤 Final Axios headers:", config.headers); // Debug

  return config;
});

export default axiosInstance;
