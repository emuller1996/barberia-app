import { useState } from "react";
import { getAllProductosService } from "../services/productos.services";
import axios from "axios";
export const useProductos = () => {
  const [data, setData] = useState([]);
  const [dataP, setdataP] = useState([])

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllProductos = async () => {
    setLoading(true);
    setData([]);
    try {
      const res = await getAllProductosService();
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


  const getProductosPagination = async (page,perPage, search = "") => {
    setLoading(true);

    const response = await axios.get(
      `/productos/pagination?page=${page}&per_page=${perPage}&delay=1&search=${search}`
    );
    setdataP({ data: response.data.data, total: response.data.total });
    setLoading(false);
  };
  return {
    data,
    error,
    loading,
    getAllProductos,
    getProductosPagination,
    dataP
  };
};
