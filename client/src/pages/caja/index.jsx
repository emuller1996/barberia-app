import DataTable from "react-data-table-component";
import { ViewDollar } from "../../utils";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { getAllCashMovenmetsByDateService } from "../../services/movimientos-caja.services";

export default function CajaPage() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => `${index + 1}`,
      width: "80px",
    },
    {
      name: "Hora",
      selector: (row) => row?.hora,
      width: "80px",
    },

    {
      name: "Concepto",
      selector: (row) => row?.concepto,
      width: "380px",
      className: "text-capitalize",
    },
    {
      name: "Entrada",
      selector: (row) => ViewDollar(row.entra),
    },
    {
      name: "Salida",
      selector: (row) => ViewDollar(row.sale),
    },

    {
      name: "#",
      button: true,
      cell: (/* row */) => (
        <button
          onClick={() => {}}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
      ),
    },
  ];

  const currentDate = moment.utc();
  const localDate = currentDate.tz("America/Bogota");
  console.log(localDate.format().split("T")[0]);
  const [CashMovements, setCashMovements] = useState([]);

  const [date, setDate] = useState(localDate.format().split("T")[0]);

  useEffect(() => {
    getAllMovimientosByDay();
  }, [date]);

  const getAllMovimientosByDay = async () => {
    try {
      const r = await getAllCashMovenmetsByDateService(date);
      console.log(r.data);
      setCashMovements(r.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <p className="text-center my-2 text-uppercase font-medium text-yellow-500">
        Movientos de Caja por Dia
      </p>
      <div className="border-x border-y border-yellow-300 rounded-2xl shadow-md p-3 mb-4">
        <div className="flex justify-between">
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="bg-gray-50  text-2xl border-yellow-400 border-opacity-45 text-gray-900 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:yellow-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            <i className="fa-regular fa-money-bill-1 me-3"></i>
            Crear Movimiento
          </button>
        </div>
      </div>

      <div className="border-x border-y border-yellow-300 rounded-2xl shadow-md">
        <DataTable
          noDataComponent="NO HAY MOVIMIENTOS DE CAJA"
          columns={columns}
          data={CashMovements}
        />
      </div>
      <div className="border-x border-y border-yellow-300 rounded-2xl shadow-md mt-3">
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col items-center font-medium p-4">
            <span className="text-gray-600 uppercase border-b w-full text-center">
              Total Entradas
            </span>
            <span className="text-green-500 font-bold">
              {ViewDollar(
                CashMovements.reduce(
                  (acumulador, actual) => acumulador +  parseFloat(actual?.entra),
                  0
                )
              )}
            </span>
          </div>
          <div className="flex flex-col items-center font-medium p-4">
            <span className="text-gray-600 uppercase border-b w-full text-center">
              Total Salidas
            </span>
            <span className="text-red-500 font-bold">
              {ViewDollar(
                CashMovements.reduce(
                  (acumulador, actual) => acumulador + parseFloat(actual?.sale),
                  0
                )
              )}
            </span>
          </div>

          <div className="flex flex-col items-center font-medium p-4">
            <span className="text-gray-600 uppercase border-b w-full text-center">
              Saldo
            </span>
            <span className="text-blue-500 font-bold">
              {ViewDollar(
                CashMovements.reduce(
                  (acumulador, actual) => acumulador + parseFloat(actual?.entra),
                  0
                ) -
                  CashMovements.reduce(
                    (acumulador, actual) => acumulador + parseFloat(actual?.sale),
                    0
                  )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
