import { useEffect, useState } from "react";
import { useProductos } from "../../../hooks/useProductos";
import { ViewDollar } from "../../../utils";
import DataTable from "react-data-table-component";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

TableProductoSelecionar.propTypes = {
  addProduct: PropTypes.func,
  setOpen: PropTypes.func,
};
export default function TableProductoSelecionar({ addProduct,setOpen }) {
  const { getProductosPagination, dataP, loading } = useProductos();
  const [ProductoSelected, setProductoSelected] = useState(null);
  const [nameSearch, setnameSearch] = useState("");

  /*   const [loading, setLoading] = useState(false); */
  const [perPage, setPerPage] = useState(10);
  const [pageC, setpageC] = useState(1);

  useEffect(() => {
    getProductosPagination(pageC, perPage, nameSearch);
  }, [pageC, perPage, nameSearch]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const columns = [
    {
      name: "#",
      button: true,
      cell: (row) => (
        <>
          <button
            onClick={() => {
              setProductoSelected(row);
            }}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
          >
            <svg
              className="w-4 h-4 :text-white"
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
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </>
      ),
    },
    {
      name: "Descripcion",
      selector: (row) => row.name,
      width: "300px",
    },
    {
      name: "Precio",
      selector: (row) => ViewDollar(row.price),
    },
  ];

  const onSubmit = async (data) => {
    addProduct(Object.assign(ProductoSelected, data));
    toast.success("Producto Agregado a la Factura Correctamente.");
    setProductoSelected(null);
    reset();

  };

  return (
    <div className="container mx-auto   w-[400px] md:w-[700px] p-6">

      {ProductoSelected ? (
        <>
          <div className="text-center border-y border-fuchsia-300 mb-3">
            <span className="text-center">Producto Selecionado</span>
            <p className="text-start">Nombre : {ProductoSelected.name}</p>
            <p className="text-start">Precio : {ViewDollar(ProductoSelected.price)}</p>
            <p className="text-start">Existencias : {ProductoSelected?.quantity}</p>

          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block mb-2   text-gray-400 dark:text-white"
              >
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                defaultValue={1}
                {...register("quantity", { required: true })}
                className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block mb-2   text-gray-400 dark:text-white"
              >
                Precio
              </label>

              <Controller
                control={control}
                name="price"
                rules={{ required: "el Precio es requerido." }}
                render={({ field: { onChange, name, ref, value } }) => (
                  <CurrencyInput
                    id={name}
                    itemRef={ref}
                    name={name}
                    decimalSeparator=","
                    groupSeparator="."
                    value={value}
                    className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
                    prefix="$"
                    decimalsLimit={2}
                    onValueChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />

              <span className="capitalize  text-red-500">
                {errors?.price?.message}
              </span>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setProductoSelected(null);
                }}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg  dark:shadow-lg font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                <i className="me-4 fa-solid fa-ban"></i>
                Cancelar
              </button>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg  font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                <i className="me-4 fa-solid fa-floppy-disk"></i>
                Agregar
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
      <p className="text-center font-bold uppercase">Lista de Productos</p>

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
                <div className="text-center my-52 uppercase">
                  No hay productos
                </div>
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
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setOpen(false)
              }}
              className="flex items-center gap-1 uppercase px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
                  d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Cerrar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
