import { useEffect, useState } from "react";
import { useClientes } from "../../hooks/useClientes";
import { Drawer } from "@mui/material";
import FormCliente from "./components/FormCliente";
import DataTable from "react-data-table-component";
import "./index.css";

export default function ClientesPage() {
  const { getAllClientes, getUsersPagination, dataP } = useClientes();

  const [open, setOpen] = useState(false);
  const [nameSearch, setnameSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [pageC, setpageC] = useState(1);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getAllClientes();
  }, []);

  useEffect(() => {
    getUsersPagination(pageC, perPage, nameSearch);
    // fetch page 1 of users
  }, [pageC, perPage, nameSearch]);

  const handlePageChange = (page) => {
    setpageC(page);
    /* fetchUsers(page, nameSearch); */
  };

  const handlePerRowsChange = async (newPerPage) => {
    setLoading(true);
    setPerPage(newPerPage);
    setLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className="text-white font-semibold uppercase bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Crear Cliente
        </button>
      </div>

      <form className="w-full my-2 ">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={nameSearch}
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar Cliente por Nombre"
            required
            onChange={(e) => {
              console.log(e.target.value);
              setnameSearch(e.target.value);
            }}
          />
        </div>
      </form>

      <div className="border-x border-y border-sky-200  rounded-lg shadow-md">
        <DataTable
          className="DataTableCliente"
          columns={[
            {
              name: "Nombre C.",
              selector: (row) => row.name,
            },
            {
              name: "Dirrecion",
              selector: (row) => row.address,
            },
            {
              name: "Numero Telefonico.",
              selector: (row) => row?.number_phone,
            },
            {
              name: "status.",
              selector: (row) => row?.status,
            },
            {
              name: "state.",
              selector: (row) => row?.state,
            },
            {
              name: "city.",
              selector: (row) => row?.City,
            },
          ]}
          data={dataP.data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={dataP.total}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
      </div> */}

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <FormCliente setOpen={setOpen} getAllCliente={getAllClientes} />
      </Drawer>
    </div>
  );
}
