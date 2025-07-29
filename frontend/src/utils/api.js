import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.76:8000", 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const lang = localStorage.getItem("lang") || "en";

  if (!config.headers) config.headers = {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Accept-Language"] = lang; 
  return config;
  
});

export default axiosInstance;
