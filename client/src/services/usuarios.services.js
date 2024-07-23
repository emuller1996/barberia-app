import axios from "axios";

export const postCreateUsuariosService = (data) => {
  return axios.post("/usuarios", data);
};

export const pachtUpdateUsuariosService = (data) => {
  return axios.patch(`/usuarios/${data.id}`, data);
};

export const getAllUsuariosService = (data) => {
  return axios.get("/usuarios", data);
};
