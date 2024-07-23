import axios from "axios";

export const postCreateInvoiceService = (data) => {
  return axios.post("/invoice", data);
};

export const pachtUpdateInvoiceService = (data) => {
  return axios.patch(`/invoice/${data.id}`, data);
};

export const getAllInvoiceService = (data) => {
  return axios.get("/invoice", data);
};

export const getAllInvoiceByDateService = (date) => {
  return axios.get(`/invoice/per_day/${date}`);
};
