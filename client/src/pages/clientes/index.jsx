import { useEffect, useState } from "react";
import { useClientes } from "../../hooks/useClientes";
import { Drawer } from "@mui/material";
import FormCliente from "./components/FormCliente";

export default function ClientesPage() {
  const { data, getAllClientes, loading } = useClientes();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getAllClientes();
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className="text-white text-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
        >
          Crear Cliente
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xl text-white uppercase bg-sky-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
              Numero Telefonico
              </th>
              <th scope="col" className="px-6 py-3">
                Barrio / Dirrecion
              </th>
              <th scope="col" className="px-6 py-3">
                #
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr
                key={i}
                className="bg-sky-100 text-lg border-b last:border-none border-sky-300 text-sky-950 "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap dark:text-blue-100"
                >
                  {i.id}
                </th>
                <td className="px-6 py-4">{i.name}</td>
                <td className="px-6 py-4">{i.number_phone}</td>
                <td className="px-6 py-4">{i.address}</td>
                <td className="px-6 py-4">#</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <FormCliente setOpen={setOpen} getAllCliente={getAllClientes} />
      </Drawer>
    </div>
  );
}
