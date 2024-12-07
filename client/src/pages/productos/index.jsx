import DataTable from "react-data-table-component";
import MenuProductoServices from "../../components/_AppMenuProductoServices";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import FormProductos from "./components/FormProductos";
import { useProductos } from "../../hooks/useProductos";
import { ViewDollar } from "../../utils";

export default function ProductosPage() {
  const { getProductosPagination, dataP, loading } = useProductos();
  const [ProductoSelected, setProductoSelected] = useState(null);
  const [nameSearch, setnameSearch] = useState("");
  const [Draw, setDraw] = useState(1);

  /*   const [loading, setLoading] = useState(false); */
  const [perPage, setPerPage] = useState(10);
  const [pageC, setpageC] = useState(1);

  useEffect(() => {
    getProductosPagination(pageC, perPage, nameSearch);
  }, [pageC, perPage, nameSearch, Draw]);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const columns = [
    {
      name: "Code",
      selector: (row) => row._id,
    },
    {
      name: "Descripcion",
      selector: (row) => row.name,
      width: "200px",
    },
    {
      name: "Precio",
      selector: (row) => ViewDollar(row.price),
    },
    {
      name: "Costo",
      selector: (row) => ViewDollar(row.cost),
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
    },
    {
      name: "F. Creacion",
      selector: (row) =>
        new Date(row.createdTime).toISOString().substring(0, 10),
    },
    {
      name: "F. Actualizacion",
      selector: (row) =>
        row.updatedTime
          ? new Date(row?.updatedTime)?.toISOString()?.substring(0, 10)
          : null,
    },
    {
      name: "#",
      button: true,
      cell: (row) => (
        <>
          <button
            onClick={() => {
              setProductoSelected(row);
              setOpen(true);
            }}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
          >
            <svg
              className="w-4 h-4 text-white"
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
          <button
            type="button"
            className="ms-1 px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <svg
              className="w-4 h-4 text-white dark:text-white"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <MenuProductoServices />

      <div className="mb-3">
        <button
          type="button"
          onClick={() => {
            setProductoSelected(null);
            setOpen(true);
          }}
          className="text-white bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
        >
          Crear Producto
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
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-fuchsia-300 rounded-lg bg-gray-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
            placeholder="Buscar Cliente por Nombre"
            required
            onChange={(e) => {
              console.log(e.target.value);
              setnameSearch(e.target.value);
            }}
          />
        </div>
      </form>

      <div className="border-x border-y border-fuchsia-200 rounded-lg shadow-md">
        <DataTable
          className="DataTableProducto"
          columns={columns}
          data={dataP.data}
          progressPending={loading}
          noDataComponent={
            <div className="text-center my-52 uppercase">No hay productos</div>
          }
          progressComponent={
            <div className="text-center my-52">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-fuchsia-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
          pagination
          paginationServer
          paginationTotalRows={dataP.total}
          onChangeRowsPerPage={(e) => {
            setPerPage(e);
          }}
          onChangePage={(e) => {
            setpageC(e);
          }}
        />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <FormProductos
          producto={ProductoSelected}
          getAllProducto={() => {
            setDraw((status) => ++status);
          }}
          setOpen={setOpen}
        />
      </Drawer>
    </div>
  );
}
