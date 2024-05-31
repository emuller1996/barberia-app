import axios from "axios";

export const postCreateProductosService = (data) => {
  return axios.post("/productos", data);
};

export const pachtUpdateProductosService = (data) => {
  return axios.patch(`/productos/${data.id}`, data);
};

export const getAllProductosService = (data) => {
  return axios.get("/productos", data);
};
