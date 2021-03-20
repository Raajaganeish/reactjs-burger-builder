import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-builder-d7b4d-default-rtdb.firebaseio.com/",
});

export default axiosInstance;
