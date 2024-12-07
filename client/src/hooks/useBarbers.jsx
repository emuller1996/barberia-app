import { useState } from "react";
import { getAllBarberService, getAllServicesBarberService } from "../services/barbers.services";
export const useBarbers = () => {
  const [data, setData] = useState([]);

  const [ServicesBarber, setServicesBarber] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllBarbers = async () => {
    setLoading(true);
    try {
      const res = await getAllBarberService();
      if (res.status !== 200) {
        let err = new Error("Error en la petición Fetch");
        err.status = res.status || "00";
        err.statusText = res.statusText || "Ocurrió un error";
        throw err;
      }

      if (!signal.aborted) {
        setData(res.data);
        setError(null);
      }
    } catch (error) {
      if (!signal.aborted) {
        setData([]);
        setError(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };
  const getAllServicesByBarber = async (id) => {
    try {
      const result = await getAllServicesBarberService(id);
      console.log(result);
      setServicesBarber(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    error,
    loading,
    getAllBarbers,
    getAllServicesByBarber,
    ServicesBarber
  };
};
