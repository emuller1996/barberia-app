import { useState } from "react";
import FormCliente from "./FormCliente";
import FormProfesional from "./FormProfesional";
import FormFechasCita from "./FormFechasCita";
import { ViewDollar } from "../../../utils";
import { postCreateAppointmentService } from "../../../services/appointment.services";
import toast from "react-hot-toast";

export default function FormularioCita() {
  const [PasoActual, setPasoActual] = useState(1);
  const [datosCliente, setdatosCliente] = useState(null);

  const [datosServiciosProfesional, setdatosServiciosProfesional] =
    useState(null);
  const [datosFechaHora, setdatosFechaHora] = useState(null);

  function getTimeIntervals(startDate, endDate, intervalMinutes = 30) {
    const times = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      times.push(new Date(currentDate).toISOString().substring(11, 16));
      currentDate.setMinutes(currentDate.getMinutes() + intervalMinutes);
    }

    return times;
  }

  return (
    <div className="w-[378px] sm:w-[550px] h-[600px] md:w-[700px] md:h-[600px] lg:w-[800px] overflow-y-scroll md:overflow-y-auto">
      <ol className="overflow-x-auto flex items-center  justify-center flex-col  gap-4 md:gap-0 md:flex-row w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li className="flex items-center text-purple-600 dark:text-purple-500">
          {PasoActual > 1 ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </>
          ) : (
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-purple-600 rounded-full shrink-0 dark:border-purple-500">
              1
            </span>
          )}
          Cliente
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            PasoActual >= 2 && "text-purple-600"
          } `}
        >
          {PasoActual > 2 ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </>
          ) : (
            <span
              className={`flex items-center  justify-center  w-5 h-5 me-2 text-xs border ${
                PasoActual >= 2 ? "border-purple-600" : "border-gray-500"
              }  rounded-full shrink-0 dark:border-gray-400`}
            >
              2
            </span>
          )}
          <span className="text-nowrap">Profesional y Servicios</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>

        <li
          className={`flex items-center ${
            PasoActual >= 3 && "text-purple-600"
          } `}
        >
          {PasoActual > 3 ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </>
          ) : (
            <span
              className={`flex items-center  justify-center  w-5 h-5 me-2 text-xs border ${
                PasoActual >= 3 ? "border-purple-600" : "border-gray-500"
              }  rounded-full shrink-0 dark:border-gray-400`}
            >
              2
            </span>
          )}
          Fecha y Hora
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
            4
          </span>
          Confirmar
        </li>
      </ol>

      {PasoActual === 1 && (
        <FormCliente
          setPasoActual={setPasoActual}
          setdatosCliente={setdatosCliente}
        />
      )}

      {PasoActual === 2 && (
        <div className="text-center">
          <FormProfesional
            datosCliente={datosCliente}
            setdatosServiciosProfesional={setdatosServiciosProfesional}
            setPasoActual={setPasoActual}
          />
        </div>
      )}

      {PasoActual === 3 && (
        <>
          <FormFechasCita
          datosServiciosProfesional={datosServiciosProfesional}
            setPasoActual={setPasoActual}
            setdatosFechaHora={setdatosFechaHora}
          />
        </>
      )}
      {PasoActual === 4 && (
        <div className="mx-7">
          <p className="text-center text-gray-400">Datos del Cliente</p>
          <div className="flex justify-between">
            <span className="text-gray-500">Nombre </span>
            <span className="text-purple-800 font-semibold">
              {datosCliente?.name}{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Telefono </span>
            <span>{datosCliente?.number_phone} </span>
          </div>
          <div className="flex justify-between">
            <span>Dirreccion </span>
            <span>{datosCliente?.address} </span>
          </div>
          <hr className="border border-purple-200 my-2" />
          <p className="text-center text-gray-400">Datos del Profesional</p>
          <div className="flex justify-between">
            <span>Nombre </span>
            <span>{datosServiciosProfesional?.profesional?.name} </span>
          </div>
          <div className="flex justify-between">
            <span>Tipo Profesional </span>
            <span>{datosServiciosProfesional?.profesional?.title} </span>
          </div>
          <hr className="border border-purple-200 my-2" />
          <p className="text-center text-gray-400">Fecha y Hora</p>
          <div className="flex justify-between">
            <span>Fecha </span>
            <span>{datosFechaHora?.fecha} </span>
          </div>
          <div className="flex justify-between">
            <span>Hora </span>
            <span>{datosFechaHora?.hora} </span>
          </div>
          <hr className="border border-purple-200 my-2" />
          <p className="text-center text-gray-400">Servicios</p>
          {datosServiciosProfesional.servicios.map((c, i) => (
            <div key={i} className="flex justify-between">
              <span>{c.name} </span>
              <span>{ViewDollar(c.price)} </span>
            </div>
          ))}
          <hr className="border border-purple-200 my-2" />

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setPasoActual(3);
              }}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Atras
            </button>
            <button
              type="button"
              onClick={async () => {
                console.log(datosCliente);
                console.log(datosFechaHora);
                console.log(datosServiciosProfesional);
                console.log(
                  `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`
                );
                console.log(
                  new Date(
                    `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`
                  )
                );
                console.log(
                  datosServiciosProfesional?.servicios?.reduce(
                    (acumulador, actual) => acumulador + actual?.duration,
                    0
                  )
                );

                const date = new Date(
                  `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`
                ); // Fecha y hora actual

                // Minutos que quieres sumar
                const minutesToAdd =
                  datosServiciosProfesional?.servicios?.reduce(
                    (acumulador, actual) => acumulador + actual?.duration,
                    0
                  );

                // Sumar minutos
                date.setMinutes(date.getMinutes() + minutesToAdd);

                console.log(date.toISOString());

                console.log(
                  getTimeIntervals(
                    new Date(
                      `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`
                    ),
                    date
                  )
                );
                const HoraOcuparads = getTimeIntervals(
                  new Date(
                    `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`
                  ),
                  date
                );

                const data = {
                  date_start: `${datosFechaHora.fecha}T${datosFechaHora.hora}:00.000Z`,
                  date_end: date.toISOString(),
                  services_appointment: datosServiciosProfesional?.servicios,
                  barber: datosServiciosProfesional?.profesional,
                  hours_bussy: HoraOcuparads,
                  total: datosServiciosProfesional?.servicios?.reduce(
                    (acumulador, actual) => acumulador + actual?.price,
                    0
                  ),
                  totalDuration: minutesToAdd,
                  date: `${datosFechaHora.fecha}`,
                  client: {
                    name:datosCliente.name,
                    _id:datosCliente._id,
                    number_phone:datosCliente.number_phone,
                  }
                };
                console.log(data);
                try {
                  const r = await postCreateAppointmentService(data);
                  toast.success(r.data.message);
                  setPasoActual(1)

                } catch (error) {
                  console.log(error);
                  toast.error(error.message);
                }
              }}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
