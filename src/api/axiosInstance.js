import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // replace with your base URL
});

export default axiosInstance;
