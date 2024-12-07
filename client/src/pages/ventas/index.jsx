import { useEffect, useState } from "react";
import { ViewDollar } from "../../utils";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { getAllInvoiceByDateService } from "../../services/ventas.services";
import TicketFactura from "./components/TicketFactura";
import { Datepicker } from "flowbite-react";
export default function VentasPage() {
  const columns = [
    {
      name: "#",
      selector: (row) => `FV - ${row.code}`,
      width: "80px",
    },
    {
      name: "Hora",
      selector: (row) => row?.hora,
      width: "80px",
    },

    {
      name: "Cliente",
      selector: (row) => row?.client?.name,
    },
    {
      name: "Total",
      selector: (row) => ViewDollar(row.total),
    },
    {
      name: "Estado",
      selector: (row) => row.status,
    },
    {
      name: "Metodo de Pago",
      selector: (row) => row?.payment_method,
    },
    {
      name: "Referencia",
      selector: (row) => row.quantity,
    },
    {
      name: "#",
      button: true,
      cell: (row) => (
        <>
          <TicketFactura data={row} />
        </>
      ),
    },
  ];

  const currentDate = moment.utc();
  const localDate = currentDate.tz("America/Bogota");
  const [VentasDay, setVentasDay] = useState([]);

  const [date, setDate] = useState(localDate.format().split("T")[0]);

  useEffect(() => {
    getAllFacturas();
  }, [date]);

  const getAllFacturas = async () => {
    try {
      const r = await getAllInvoiceByDateService(date);
      setVentasDay(r.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container  mx-auto">
      <p className="text-center my-2 text-uppercase font-medium text-indigo-500">
        Facturas del Dia
      </p>
      <div className="border-x border-y border-indigo-300 rounded-2xl shadow-md p-3 mb-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          {/* <div>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="bg-gray-50    border-indigo-400 border-opacity-45 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
            />
          </div> */}

          <Datepicker
            language="CO"
            labelTodayButton="Hoy"
            autoHide
            value={date}
            autoSave=""
            color={"indigo"}
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
                    base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-indigo-300",
                    today:
                      "bg-indigo-700 text-white hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700",
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
                      selected: "bg-indigo-700 text-white hover:bg-indigo-600",
                      disabled: "text-gray-500",
                    },
                  },
                },
                months: {
                  items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                      base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                      selected: "bg-indigo-700 text-white hover:bg-indigo-600",
                      disabled: "text-gray-500",
                    },
                  },
                },
                years: {
                  items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                      base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                      selected: "bg-indigo-700 text-white hover:bg-indigo-600",
                      disabled: "text-gray-500",
                    },
                  },
                },
                decades: {
                  items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                      base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                      selected: "bg-indigo-700 text-white hover:bg-indigo-600",
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
              setDate(e.toISOString().split("T")[0]);
            }}
            labelClearButton="Limpar"
          />
          <div>
            <Link className="" to={"/dashboard/ventas/registar"}>
              <button
                type="submit"
                className="text-white  bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                <i className="fa-solid fa-cash-register me-3  "></i>
                Registar Venta
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-x border-y border-indigo-300 rounded-2xl shadow-md">
        <DataTable columns={columns} data={VentasDay} />
      </div>
    </div>
  );
}
