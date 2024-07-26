import axios from "axios";

export const getUserService = async (token) => {
  return await axios.get(`/auth/get-user/`, {
    headers: {
      "access-token": token,
    },
  });
};

export const postLoginService = async (data) => {
  return await axios.post(`/auth/login/`, data);
};
export const postRegisterService = async (data) => {
  return await axios.post(`/auth/register/`, data);
};
