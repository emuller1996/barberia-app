import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import CurrencyInput from "react-currency-input-field";
import { useEffect } from "react";
import {
  pachtUpdateProductosService,
  postCreateProductosService,
} from "../../../services/productos.services";

export default function FormProductos({
  getAllProducto,
  producto,
  setOpen,
  /* setServiceSelected, */
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (producto) {
      setValue("price", producto.price);
      setValue("name", producto.name);
      setValue("description", producto.description);
    }
  }, [producto]);

  const onSubmit = async (data) => {
    data.price = parseInt(data.price);
    data.cost = parseInt(data.cost);

    data.quantity = parseInt(data.quantity);
    if (producto) {
      data.id = producto.id;
      try {
        const r = await pachtUpdateProductosService(data);
        toast.success(r.data.message);
        await getAllProducto();
        setOpen(false);
        reset();
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const r = await postCreateProductosService(data);
        toast.success(r.data.message);
        await getAllProducto();
        reset();
        setOpen(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="border-x border-y  border-fuchsia-200 rounded-lg min-w-[380px] md:min-w-[580px] ">
        <p className="text-center mt-3 text-fuchsia-600 border-b-2 border-fuchsia-200 w-1/2 mx-auto">
          {producto ? "Editar Producto " : " Crear Nuevo Producto "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="px-6 md:px-16 mx-auto my-4"
        >
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Descripcion
            </label>
            <input
              id="description"
              type="text"
              defaultValue={producto?.description}
              {...register("description", { required: true })}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Precio
            </label>

            <Controller
              control={control}
              name="price"
              defaultValue={producto?.price}
              rules={{ required: "el Precio es Requerido" }}
              render={({ field: { onChange, name, ref } }) => (
                <CurrencyInput
                  id={name}
                  itemRef={ref}
                  name={name}
                  value={producto?.price}
                  decimalSeparator=","
                  groupSeparator="."
                  className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
                  prefix="$"
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    console.log(value, name, values);
                    if (producto) {
                      producto.price = value;
                    }
                    onChange(value);
                  }}
                />
              )}
            />

            <span className="capitalize text-xl text-red-500">
              {errors?.price?.message}
            </span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Costo
            </label>

            <Controller
              control={control}
              name="cost"
              defaultValue={producto?.cost}
              rules={{ required: "el Costo es Requerido" }}
              render={({ field: { onChange, name, ref } }) => (
                <CurrencyInput
                  id={name}
                  itemRef={ref}
                  name={name}
                  value={producto?.cost}
                  decimalSeparator=","
                  groupSeparator="."
                  className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
                  prefix="$"
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    console.log(value, name, values);
                    if (producto) {
                      producto.cost = value;
                    }
                    onChange(value);
                  }}
                />
              )}
            />

            <span className="capitalize text-xl text-red-500">
              {errors?.cost?.message}
            </span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              defaultValue={producto?.quantity}
              {...register("quantity", { required: true })}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:fuchsia-blue-500"
            />
          </div>

          <div className="text-center">
            {producto && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                <i className="me-4 fa-solid fa-ban"></i>
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-floppy-disk"></i>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

FormProductos.propTypes = {
  getAllProducto: PropTypes.func.isRequired,
  producto: PropTypes.object,
  setOpen: PropTypes.func,
  /* setServiceSelected: PropTypes.func, */
};
