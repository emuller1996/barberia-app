import { useState } from "react";
import {
  getAllClienteService,
  getValidateClienteService,
} from "../services/cliente.services";
import axios from "axios";
export const useClientes = () => {
  const [data, setData] = useState([]);
  const [dataP, setdataP] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllClientes = async () => {
    setLoading(true);
    setData([]);
    try {
      const res = await getAllClienteService();
      if (res.status !== 200) {
        let err = new Error("Error en la petición Fetch");
        err.status = res.status || "00";
        err.statusText = res.statusText || "Ocurrió un error";
        throw err;
      }
      console.log(res);

      if (!signal.aborted) {
        setData(res.data);
        setError(null);
      }
    } catch (error) {
      if (!signal.aborted) {
        setData(null);
        setError(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  const validateCliente = async (number) => {
    try {
      return await getValidateClienteService(number);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getUsersPagination = async (page, perPage, search = "") => {
    setLoading(true);

    const response = await axios.get(
      `/clientes/pagination?page=${page}&per_page=${perPage}&delay=1&search=${search}`
    );
    setdataP({ data: response.data.data, total: response.data.total });
    setLoading(false);
  };

  return {
    data,
    error,
    loading,
    getAllClientes,
    getUsersPagination,
    dataP,
    validateCliente,
  };
};
