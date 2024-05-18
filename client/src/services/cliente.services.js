import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const postCreateClienteService = (data) => {
  return axios.post("/clientes", data);
};

export const pachtUpdateClienteService = (data) => {
  return axios.patch(`/clientes/${data.id}`, data);
};

export const getAllClienteService = (data) => {
  return axios.get("/clientes", data);
};
