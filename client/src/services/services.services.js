import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const postCreateServiceService = (data) => {
  return axios.post("/services", data);
};

export const pachtUpdateServiceService = (data) => {
  return axios.patch(`/services/${data.id}`, data);
};

export const getAllServiceService = (data) => {
  return axios.get("/services", data);
};
