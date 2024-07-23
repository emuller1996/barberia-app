import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useServicios } from "../../../hooks/useServicios";
import {
  pachtUpdateAppointmentService,
  postCreateAppointmentService,
} from "../../../services/appointment.services";
import { ViewDollar } from "../../../utils";
import { useBarbers } from "../../../hooks/useBarbers";
import Select from "react-select";
import { useClientes } from "../../../hooks/useClientes";
import FormCitaMoviminetoCaja from "./FormCitaMoviminetoCaja";

export default function FormCita({ cita, onClose, getAllCitas }) {
  const { data, getAllServicios } = useServicios();
  const { data: listBarbers, getAllBarbers } = useBarbers();
  const [ServicesSelected, setServicesSelected] = useState(
    cita ? cita.services : []
  );
  const { data: clienteAll, loading, getAllClientes } = useClientes();
  const [conCliente, setConCliente] = useState(cita?.client ? true : false);
  const [idCliente, setidCliente] = useState(null);

  useEffect(() => {
    getAllServicios();
    getAllBarbers();
    getAllClientes();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.total = ServicesSelected.reduce(
      (acumulador, actual) => acumulador + actual?.price,
      0
    );
    data.date_start = parseDateISO(data.date_start);
    data.date_end = parseDateISO(data.date_end);
    if (conCliente) {
      data.client_id = idCliente;
    }

    data.date = data.date_start;
    console.log(data);

    if (cita) {
      data._id = cita._id;
      const r = await pachtUpdateAppointmentService(data);
      toast.success(r.data.message);
      onClose();
      await getAllCitas();
    } else {
      try {
        const r = await postCreateAppointmentService(data);
        toast.success(r.data.message);
        reset();
        setConCliente(false);
        await getAllCitas();
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const parseDateISO = (sty) => {
    const dateString = sty;
    const completeDateString = dateString + ":00.000Z"; // Completando la cadena de tiempo
    const isoDate = new Date(completeDateString);

    console.log(isoDate.toISOString());

    return isoDate.toISOString();
  };

  return (
    <>
      <div className="border-x border-y  border-green-200 rounded-lg  ">
        <p className="text-center mt-3 text-green-600 border-b-2 border-green-200 w-1/2 mx-auto">
          {cita ? "Editar Servcio " : " Crear Nuevo Servicio "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="px-6 md:px-16 mx-auto my-4"
        >
          <label className="inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              checked={conCliente}
              onChange={(e) => {
                setConCliente(e.target.checked);
              }}
              className="sr-only peer"
            />
            <div className="relative w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">
              Con Cliente ?
            </span>
          </label>

          {conCliente && !loading && (
            <div className="  rounded-lg p-3 border-emerald-200">
              <label htmlFor=""> Cliente</label>
              <Select
                classNamePrefix="react-select"
                onChange={(e) => {
                  console.log(e);
                  setidCliente(e.value);
                }}
                defaultValue={
                  cita &&
                  clienteAll
                    .map((c) => {
                      return {
                        value: c._id,
                        label: `${c?.name} - ${c?.number_phone}`,
                      };
                    })
                    .find((c) => c?.value === cita?.client?._id)
                }
                styles={{
                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "red" : "red",
                    border: state.isFocused ? "none" : "algo",
                    boxShadow: "none",
                  }),
                }}
                options={clienteAll.map((c) => {
                  return {
                    value: c._id,
                    label: `${c?.name} - ${c?.number_phone}`,
                  };
                })}
                placeholder="Buscar cliente por numero o nombre"
              />
            </div>
          )}

          <hr className="my-2" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                htmlFor="date_start"
                className="block mb-2   text-gray-400 dark:text-white"
              >
                Fecha y Hora Inicio
              </label>
              <input
                id="date_start"
                type="datetime-local"
                {...register("date_start", {
                  required: true,
                })}
                defaultValue={
                  cita &&
                  `${cita?.date_start?.substring(
                    0,
                    10
                  )} ${cita?.date_start?.substring(11, 16)}`
                }
                className="bg-gray-50 border    border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:green-green-500"
              />
              <small className="text-red-400 capitalize">
                {errors?.name?.message}
              </small>
            </div>

            <div className="mb-4">
              <label
                htmlFor="date_end"
                className="block mb-2    text-gray-400 dark:text-white"
              >
                Fecha y Hora Fin
              </label>
              <input
                id="date_end"
                type="datetime-local"
                {...register("date_end", {
                  required: true,
                })}
                defaultValue={
                  cita &&
                  `${cita?.date_end.substring(
                    0,
                    10
                  )} ${cita?.date_end.substring(11, 16)}`
                }
                className="bg-gray-50 border    border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:green-green-500"
              />
              <small className="text-red-400 capitalize">
                {errors?.name?.message}
              </small>
            </div>
          </div>

          <div>
            <h3 className="mb-3  font-medium text-gray-500 dark:text-white">
              Selecione el barbero:
            </h3>
            <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-3">
              {listBarbers.map((s) => (
                <li key={s._id}>
                  <input
                    type="radio"
                    id={s._id}
                    value={s._id}
                    className="hidden peer"
                    {...register("barber_id")}
                    defaultValue={cita?.barberId}
                    defaultChecked={
                      cita && cita?.barberId === s._id ? true : false
                    }
                  />
                  <label
                    htmlFor={s._id}
                    className="inline-flex items-center justify-between overflow-hidden w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-400  hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-green-800 peer-checked:ring-2 peer-checked:ring-green-200 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block truncate ">
                      <div className="w-full   font-semibold ">
                        {s.name}
                      </div>
                      <div className=" text-sm ">{s.title}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3  font-medium text-gray-500 dark:text-white">
              Selecione los Servicios:
            </h3>
            <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-3">
              {data.map((s) => (
                <li key={s._id}>
                  <input
                    type="checkbox"
                    id={s._id}
                    value={s._id}
                    className="hidden peer"
                    {...register("services")}
                    defaultValue={cita?.services}
                    defaultChecked={
                      cita && cita?.services.map((c) => c?._id).includes(s._id)
                    }
                    onClick={(e) => {
                      if (e.currentTarget.checked) {
                        setServicesSelected((status) => {
                          return [...status, s];
                        });
                      } else {
                        setServicesSelected((status) => {
                          return status.filter((c) => c._id !== s._id);
                        });
                      }
                    }}
                  />
                  <label
                    htmlFor={s._id}
                    className="inline-flex items-center justify-between overflow-hidden w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-400  hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-green-800 peer-checked:ring-2 peer-checked:ring-green-200 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block truncate ">
                      <div className="w-full   font-semibold ">
                        {s.name}
                      </div>
                      <div className=" text-sm ">{s.description}</div>
                      <div className="   ">{ViewDollar(s.price)}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between border-t-2 pt-4 mt-4">
            <span>Total</span>
            <span>
              {ViewDollar(
                ServicesSelected.reduce(
                  (acumulador, actual) => acumulador + actual?.price,
                  0
                )
              )}
            </span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-ban"></i>
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-floppy-disk"></i>
              Guardar
            </button>
          </div>
        </form>
      </div>

      <FormCitaMoviminetoCaja/>
    </>
  );
}

FormCita.propTypes = {
  cita: PropTypes.object,
  onClose: PropTypes.func,
  getAllCitas: PropTypes.func,
};
