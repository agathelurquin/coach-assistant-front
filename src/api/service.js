import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

myApi.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  return request;
});

myApi.verifyUser = function () {
  return myApi.get("/auth/verify");
};

export default myApi;
