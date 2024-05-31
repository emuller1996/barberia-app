import DataTable from "react-data-table-component";
import MenuProductoServices from "../../components/_AppMenuProductoServices";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import FormProductos from "./components/FormProductos";
import { useProductos } from "../../hooks/useProductos";
import { ViewDollar } from "../../utils";
import { Button } from "flowbite-react";

export default function ProductosPage() {
  const { data, getAllProductos } = useProductos();
  const [ProductoSelected, setProductoSelected] = useState(null);

  useEffect(() => {
    getAllProductos();
  }, []);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
    },
    {
      name: "Descripcion",
      selector: (row) => row.description,
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
      name: "#",
      button: true,
      cell: (row) => (
        <button
          onClick={() => {
            setProductoSelected(row);
            setOpen(true);
          }}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
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

      <div className="border-x border-y border-fuchsia-200 rounded-2xl shadow-md">
        <DataTable columns={columns} data={data} />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <FormProductos
          producto={ProductoSelected}
          getAllProducto={getAllProductos}
          setOpen={setOpen}
        />
      </Drawer>
    </div>
  );
}
