import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const postCreateBarberService = (data) => {
  return axios.post("/barbers", data);
};

export const patchUpdateBarberService = (data) => {
  return axios.patch(`/barbers/${data.id}`, data);
};
export const getAllBarberService = (data) => {
  return axios.get("/barbers", data);
};
