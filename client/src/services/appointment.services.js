import axios from "axios";

export const postCreateAppointmentService = (data) => {
  return axios.post("/citas", data);
};

export const pachtUpdateAppointmentService = (data) => {
  return axios.patch(`/citas/${data.id}`, data);
};

export const pachtUpdateDateAppointmentService = (data) => {
  return axios.patch(`/citas/${data.id}/date`, data);
};

export const getAllAppointmentService = (data) => {
  return axios.get("/citas", data);
};

export const getAllHoursAvailableByBarberService = (date, idBarber) => {
  return axios.get(`/citas/get_hours_available/${date}/${idBarber}`);
};
