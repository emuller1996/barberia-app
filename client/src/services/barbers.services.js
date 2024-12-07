import axios from "axios";


export const postCreateBarberService = (data) => {
  return axios.post("/barbers", data);
};

export const patchUpdateBarberService = (data) => {
  return axios.patch(`/barbers/${data.id}`, data);
};
export const getAllBarberService = (data) => {
  return axios.get("/barbers", data);
};

export const getAllServicesBarberService = (id) => {
  return axios.get(`/barbers/${id}/services`);
};
