import { useEffect, useState } from "react";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { ViewDollar } from "../../utils";
import { useClientes } from "../../hooks/useClientes";
import { useProductos } from "../../hooks/useProductos";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { postCreateInvoiceService } from "../../services/ventas.services";
import { useNavigate } from "react-router-dom";

export default function RegistarVentaPage() {
  const [conCliente, setConCliente] = useState(false);
  const { data: clienteAll, getAllClientes } = useClientes();
  const navigate = useNavigate();
  const { data: productoAll, getAllProductos } = useProductos();
  const [ProductosVenta, setProductosVenta] = useState([]);
  const [idCliente, setidCliente] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    getAllClientes();
    getAllProductos();
  }, []);

  const { register, handleSubmit } = useForm();
  const columns = [
    {
      name: "#",
      selector: (row,i) => i+1,
      width: "70px",
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
    },
    {
      name: "Precio U.",
      selector: (row) => ViewDollar(row.price),
    },
    {
      name: "Precio T.",
      selector: (row) => ViewDollar(row.price * row.quantity),
    },
    {
      name: "#",
      button: true,
      cell: (row) => (
        <button
          onClick={() => {
            setProductosVenta((status) => {
              return status.filter((c) => c._id !== row._id);
            });
          }}
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

  const addProduct = (prod) => {
    if (!prod.quantity) {
      return toast.error("Agrega la Cantidad");
    }

    setProductosVenta((status) => {
      return [...status, prod];
    });
  };
  const onSubmit = async (data) => {
    if (ProductosVenta.length === 0) {
      toast.error(
        "NO SE PUEDE GENERAR UNA FACTURA SIN PRODUCTOS, POR FAVOR AGREGA ALMENOS UN PRODUCTO"
      );
      return false;
    }
    data.productos = ProductosVenta;
    data.total = parseFloat(
      ProductosVenta.reduce(
        (acumulador, actual) => acumulador + actual?.price * actual?.quantity,
        0
      )
    );

    data.client_id = idCliente;

    try {
      setisLoading(true);

      const r = await postCreateInvoiceService(data);
      toast.success(r.data.message);
      navigate("/dashboard/ventas");
    } catch (error) {
      console.log(error.message);
      toast(error.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="container">
      <p className="text-center my-2 text-uppercase font-medium text-indigo-500">
        Registar Nueva Venta
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="grid gap-6 grid-cols-1 md:grid-cols-3"
      >
        <div className=" md:col-span-2  ">
          <div className="border-indigo-300 border-x border-y p-3 rounded-2xl min-h-[560px] flex flex-col gap-4 justify-between">
            <div className="text-center">
              <label className="inline-flex items-center cursor-pointer ">
                <input
                  type="checkbox"
                  checked={conCliente}
                  onChange={(e) => {
                    setConCliente(e.target.checked);
                    if (e.target.checked === false) {
                      setidCliente(null);
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="relative w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">
                  Con Cliente ?
                </span>
              </label>

              {conCliente && (
                <div className="text-start  rounded-lg p-3 border-emerald-200">
                  <Select
                    classNamePrefix="react-select"
                    onChange={(e) => {
                      console.log(e);
                      setidCliente(e.value);
                    }}
                    styles={{
                      input: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "red" : "red",
                        border: state.isFocused ? "none" : "algo",
                        boxShadow: "none",
                      }),
                    }}
                    options={clienteAll.map((c) => {
                      return {
                        value: c._id,
                        label: `${c?.name} - ${c?.number_phone}`,
                      };
                    })}
                    placeholder="Buscar cliente por numero o nombre"
                  />
                </div>
              )}
            </div>

            <div className="border rounded-lg min-h-[360px]">
              <DataTable
                noDataComponent="No hay Productos Agregados a la Factura."
                columns={columns}
                data={ProductosVenta}
              />
            </div>

            <div className="flex justify-between mx-8">
              <p>Total</p>

              <p>
                {ViewDollar(
                  ProductosVenta.reduce(
                    (acumulador, actual) =>
                      acumulador + actual?.price * actual?.quantity,
                    0
                  )
                )}
              </p>
            </div>

            <div className="border-y py-4">
              <h3 className="mb-5 font-medium text-gray-900 dark:text-white">
                Metodo de Pago
              </h3>
              <ul className="grid w-full gap-6 md:grid-cols-3">
                <li>
                  <input
                    type="radio"
                    id="Efectivo"
                    name="payment_method"
                    value="Efectivo"
                    className="hidden peer"
                    {...register("payment_method", {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor="Efectivo"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-x border-y border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full">Efectivo</div>
                    </div>
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    id="Transferencia"
                    name="payment_method"
                    value="Transferencia"
                    className="hidden peer"
                    {...register("payment_method", {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor="Transferencia"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-x border-y border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full">Transferencia</div>
                    </div>
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    id="Tarjeta"
                    name="payment_method"
                    value="Tarjeta"
                    className="hidden peer"
                    {...register("payment_method", {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor="Tarjeta"
                    className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-x border-y border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full">Tarjeta</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              onClick={() => {}}
              disabled={isLoading ? true : false}
              className="text-white  disabled:opacity-60 bg-gradient-to-r from-indigo-400  disabled:cursor-not-allowed via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-3 py-1.5 text-center me-2 mb-2"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <i className="me-4 fa-solid fa-floppy-disk"></i>
              )}
              Guardar
            </button>
          </div>
        </div>

        <div className=" border-x border-y border-indigo-300 rounded-2xl overflow-hidden p-3">
          <div className="mb-3 ">
            <input
              type="text"
              placeholder="Buscar Producto por Nombre Aqui ..."
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-indigo-500"
            />
          </div>

          <div className="h-[495px] overflow-auto ">
            <div className="">
              <div className="grid grid-cols-1 gap-2">
                {productoAll.map((s) => (
                  <div
                    key={s?._id}
                    className="border-x border-y border-indigo-300 shadow-md rounded-lg p-2 bg-indigo-50 text-indigo-800"
                  >
                    <p className="text-indigo-800 font-semibold border-b-2 border-indigo-200">
                      {s?.name}
                    </p>

                    <div className="flex gap-16 mt-3">
                      <div>
                        <input
                          id="description"
                          placeholder="Cantidad"
                          type="number"
                          onChange={(e) => {
                            s.quantity = e.target.value;
                          }}
                          className=" border  border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
                        />
                      </div>
                      <div>
                        <CurrencyInput
                          decimalSeparator=","
                          groupSeparator="."
                          placeholder="Precio"
                          defaultValue={s.price}
                          className=" border  border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
                          prefix="$"
                          decimalsLimit={2}
                          onValueChange={(value) => {
                            s.price = value;
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          addProduct(s);
                        }}
                        disabled={ProductosVenta.map((c) => c._id).includes(
                          s._id
                        )}
                        className="text-white  text-lg bg-gradient-to-r from-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-3 py-1.5 text-center me-2 mb-2"
                      >
                        <i className="me-4 fa-solid fa-floppy-disk"></i>
                        Guardar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
