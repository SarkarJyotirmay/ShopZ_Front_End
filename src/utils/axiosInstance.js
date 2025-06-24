// src/api/axiosInstance.js
import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // if you're using cookies
});

axiosInstance.interceptors.request.use(
  (config)=>{
    const token = JSON.parse(localStorage.getItem("token"))
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
   (error) => {
    return Promise.reject(error);
  }

)

export default axiosInstance;
