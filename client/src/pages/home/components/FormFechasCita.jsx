import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { getAllHoursAvailableByBarberService } from "../../../services/appointment.services";
export default function FormFechasCita({ setPasoActual, setdatosFechaHora,datosServiciosProfesional }) {
  const [FechaSelecioada, setFechaSelecioada] = useState(null);
  const [HoraSelec, setHoraSelec] = useState(null);
  const [Errores, setErrores] = useState({});
  const [HorasDisponibles, setHorasDisponibles] = useState(null);

  const HorasD = [
    { label: "08:00 AM", value: "08:00" },
    { label: "08:30 AM", value: "08:30" },
    { label: "09:00 AM", value: "09:00" },
    { label: "09:30 AM", value: "09:30" },
    { label: "10:00 AM", value: "10:00" },
    { label: "10:30 AM", value: "10:30" },
    { label: "11:00 AM", value: "11:00" },
    { label: "11:30 AM", value: "11:30" },
    { label: "02:00 PM", value: "14:00" },
    { label: "02:30 PM", value: "14:30" },
    { label: "03:00 PM", value: "15:00" },
    { label: "03:30 PM", value: "15:30" },
    { label: "04:00 PM", value: "16:00" },
    { label: "04:30 PM", value: "16:30" },
    { label: "05:00 PM", value: "17:00" },
    { label: "05:30 PM", value: "17:30" },

  ];


  const getHoursAvailable = async ()=>{

    try {
      const r =await getAllHoursAvailableByBarberService(FechaSelecioada,datosServiciosProfesional?.profesional?._id)
    
    console.log(r.data);
    setHorasDisponibles(r.data)
    
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    console.log(datosServiciosProfesional);
    
    if(FechaSelecioada){
      getHoursAvailable()
    }
  
   
  }, [FechaSelecioada])
  

  return (
    <div className="mt-7 mx-7">
      <div className="mb-4">
        <Datepicker
          minDate={new Date()}
          language="CO"
          labelTodayButton="Hoy"
          autoHide
          value={FechaSelecioada}
          autoSave=""
          placeholder="Selecione la fecha aqui"
          color={"purple"}
          theme={{
            root: {
              base: "relative",
            },

            popup: {
              root: {
                base: "absolute top-10 z-50 block pt-2",
                inline: "relative top-0 z-auto",
                inner:
                  "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
              },
              header: {
                base: "",
                title:
                  "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                selectors: {
                  base: "mb-2 flex justify-between",
                  button: {
                    base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                    prev: "",
                    next: "",
                    view: "",
                  },
                },
              },
              view: {
                base: "p-1",
              },
              footer: {
                base: "mt-2 flex space-x-2",
                button: {
                  base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-purple-300",
                  today:
                    "bg-purple-700 text-white hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
                  clear:
                    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                },
              },
            },
            views: {
              days: {
                header: {
                  base: "mb-1 grid grid-cols-7",
                  title:
                    "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
                },
                items: {
                  base: "grid w-64 grid-cols-7",
                  item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    selected: "bg-purple-700 text-white hover:bg-purple-600",
                    disabled: "text-gray-500",
                  },
                },
              },
              months: {
                items: {
                  base: "grid w-64 grid-cols-4",
                  item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    selected: "bg-purple-700 text-white hover:bg-purple-600",
                    disabled: "text-gray-500",
                  },
                },
              },
              years: {
                items: {
                  base: "grid w-64 grid-cols-4",
                  item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    selected: "bg-purple-700 text-white hover:bg-purple-600",
                    disabled: "text-gray-500",
                  },
                },
              },
              decades: {
                items: {
                  base: "grid w-64 grid-cols-4",
                  item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    selected: "bg-purple-700 text-white hover:bg-purple-600",
                    disabled: "text-gray-500",
                  },
                },
              },
            },
          }}
          className=" m-0 p-0"
          onSelectedDateChanged={(e) => {
            console.log(e.toISOString().substring(0, 10));
            console.log(e.toISOString().split("T")[0]);
            setFechaSelecioada(e.toISOString().split("T")[0]);
            //setDate(e.toISOString().split("T")[0]);
            setErrores((status) => {
              delete status.fecha;
              return status;
            });
          }}
          labelClearButton="Limpar"
        />

        {Errores?.fecha?.message && (
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
              <span className="font-medium">{Errores?.fecha?.message}</span>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4  md:grid-cols-6 lg:grid-cols-7 gap-2">
        {HorasDisponibles && HorasDisponibles.map((ho) => (
          <div key={ho.value}>
            <input
              type="radio"
              id={ho.value}
              value={ho.value}
              name="hora"
              className="hidden peer"
              /* {...register("services")} */
              onClick={(e) => {
                console.log(e.target.value);
                setHoraSelec(e.target.value);
                setErrores((status) => {
                  delete status.hora;
                  return status;
                });
              }}
            />
            <label
              htmlFor={ho.value}
              className="inline-flex items-center justify-between overflow-hidden w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-purple-400  hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-purple-800 peer-checked:ring-2 peer-checked:ring-purple-200 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block truncate ">
                <div className="w-full   font-semibold ">{ho.label}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
      {Errores?.hora?.message && (
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
            <span className="font-medium">{Errores?.hora?.message}</span>
          </div>
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setPasoActual(2);
          }}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Atras
        </button>
        <button
          type="button"
          onClick={() => {
            //Validacion de Fecha
            if (!FechaSelecioada) {
              setErrores((status) => {
                return {
                  ...status,
                  fecha: { message: " Selecionar una Fecha" },
                };
              });
              return false;
            }

            if (!HoraSelec) {
              setErrores((status) => {
                return {
                  ...status,
                  hora: { message: " Selecionar una Hora" },
                };
              });
              return false;
            }

            setdatosFechaHora({
              fecha: FechaSelecioada,
              hora: HoraSelec,
            });
            setPasoActual(4);
          }}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Siguente
        </button>
      </div>
    </div>
  );
}
