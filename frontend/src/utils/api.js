import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tpcmgjqr52.eu-west-3.awsapprunner.com", 
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
