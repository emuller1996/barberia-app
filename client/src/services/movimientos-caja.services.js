import axios from "axios";

export const getAllCashMovenmetsByDateService = (date) => {
  return axios.get(`/cash-movement/per_day/${date}`);
};
