import { useEffect, useState } from "react";
import { ViewDollar } from "../../utils";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { getAllInvoiceByDateService } from "../../services/ventas.services";
import TicketFactura from "./components/TicketFactura";

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
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="bg-gray-50    border-indigo-400 border-opacity-45 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
            />
          </div>
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
