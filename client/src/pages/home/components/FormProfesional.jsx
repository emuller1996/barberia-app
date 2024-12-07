import { useEffect, useState } from "react";
import { useBarbers } from "../../../hooks/useBarbers";
import { ViewDollar } from "../../../utils";
import PropTypes from "prop-types";
export default function FormProfesional({
  datosCliente,
  setPasoActual,
  setdatosServiciosProfesional,
}) {
  FormProfesional.propTypes = {
    datosCliente: PropTypes.object,
    setPasoActual: PropTypes.func,
    setdatosServiciosProfesional: PropTypes.func,
  };
  const {
    getAllBarbers,
    data: Profesionales,
    getAllServicesByBarber,
    ServicesBarber,
  } = useBarbers();

  const [ProfesionalSelecionado, setProfesionalSelecionado] = useState(null);
  const [ServiciosSelecionados, setServiciosSelecionados] = useState([]);
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    getAllBarbers();
  }, []);

  useEffect(() => {
    if (ProfesionalSelecionado) {
      getAllServicesByBarber(ProfesionalSelecionado?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ProfesionalSelecionado]);
  console.log(ServiciosSelecionados);
  return (
    <div className="mx-3">
      <p className="text-center text-gray-500 mb-2 mt-4">
        {`Hola ${datosCliente?.name}, un Gusto poder ayudarte a agendar tu cita. `}{" "}
      </p>
      <p className="text-center text-gray-500 mb-1">Elegir Profesional.</p>

      <div className="grid grid-cols-1  gap-2  md:grid-cols-2">
        {Profesionales.map((c) => (
          <div
            key={c._id}
            className={`flex items-center gap-4 border ${
              ProfesionalSelecionado?._id === c._id
                ? "border-purple-600 bg-purple-100 ring-indigo-300 ring-2"
                : "border-gray-300"
            } rounded-lg p-1 cursor-pointer`}
            onClick={() => {
              //delete c.base64Image;
              setProfesionalSelecionado({ _id: c._id, name: c.name });
              setErrores((status) => {
                delete status.barber;
                return status;
              });
            }}
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={c.base64Image}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div>{c.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {c.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      {Errores?.barber?.message && (
        <div
          className="flex items-center p-4 mb-4 mt-4 text-sm text-yellow-800 border border-yellow-200  rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{Errores?.barber?.message}</span>
          </div>
        </div>
      )}
      <hr className="my-4 border-purple-300" />

      <p className="text-center text-gray-500 mb-1">Elige los Servicios.</p>

      <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-3">
        {ServicesBarber &&
          ServicesBarber.map((s) => (
            <li key={s._id}>
              <input
                type="checkbox"
                id={s._id}
                value={s._id}
                className="hidden peer"
                /* {...register("services")} */
                onClick={(e) => {
                  console.log(e);
                  if (e.currentTarget.checked) {
                    setServiciosSelecionados((status) => {
                      return [...status, { _id: s._id, name: s.name , price:s.price, duration:s.duration}];
                    });
                    setErrores((status) => {
                      delete status.services;
                      return status;
                    });
                  } else {
                    setServiciosSelecionados((status) => {
                      return status.filter((c) => c._id !== s._id);
                    });
                  }
                }}
              />
              <label
                htmlFor={s._id}
                className="inline-flex items-center justify-between overflow-hidden w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-purple-400  hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-purple-800 peer-checked:ring-2 peer-checked:ring-purple-200 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block truncate ">
                  <div className="w-full   font-semibold ">{s.name}</div>
                  <div className="   ">{ViewDollar(s.price)}</div>
                </div>
              </label>
            </li>
          ))}
      </ul>
      {Errores?.services?.message && (
        <div
          className="flex items-center p-4 mb-4 mt-4 text-sm text-yellow-800 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{Errores?.services?.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between border-t-2 pt-4 mt-4">
        <span>
          Duracion Cita :
          {ServiciosSelecionados &&
            ServiciosSelecionados?.reduce(
              (acumulador, actual) => acumulador + actual?.duration,
              0
            )}{" "}
          Mins
        </span>
        <span></span>
        <span>
          Total a Pagar:{" "}
          {ServiciosSelecionados &&
            ViewDollar(
              ServiciosSelecionados?.reduce(
                (acumulador, actual) => acumulador + actual?.price,
                0
              )
            )}
        </span>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => {
            setPasoActual(1);
          }}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Atras
        </button>
        <button
          type="button"
          onClick={() => {
            //Validacion de Profesional
            if (!ProfesionalSelecionado) {
              setErrores((status) => {
                return {
                  ...status,
                  barber: { message: " Selecionar un Profesional" },
                };
              });
              return false;
            }

            //Validacion de Servicios
            if (ServiciosSelecionados.length === 0) {
              setErrores((status) => {
                return {
                  ...status,
                  services: { message: "Selecionar al menos un Servicio." },
                };
              });
              return false;
            }
            setPasoActual(3);
            setdatosServiciosProfesional({
              profesional: ProfesionalSelecionado,
              servicios: ServiciosSelecionados,
            });
          }}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Siguente
        </button>
      </div>
    </div>
  );
}
