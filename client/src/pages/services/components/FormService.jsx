import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {
  pachtUpdateServiceService,
  postCreateServiceService,
} from "../../../services/services.services";
import CurrencyInput from "react-currency-input-field";
import { useEffect } from "react";

export default function FormService({
  getAllServices,
  service,
  setServiceSelected,
  setOpen
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
    if (service) {
      setValue("price", service.price);
      setValue("name", service.name);
      setValue("description", service.description);
    }
  }, [service]);

  const onSubmit = async (data) => {
    data.price = parseInt(data.price);
    data.duration = parseInt(data.duration);
    if (service) {
      data.id = service._id;
      try {
        const r = await pachtUpdateServiceService(data);
        toast.success(r.data.message);
        await getAllServices();
        setServiceSelected(null);
        reset();
        setOpen(false)

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const r = await postCreateServiceService(data);
        toast.success(r.data.message);
        await getAllServices();
        reset();
        setValue("price", "");
        setServiceSelected(null);
        setOpen(false)

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="border-x border-y  border-purple-200 rounded-lg  w-[400px] md:w-[600px]">
        <p className="text-center mt-3 text-purple-600 border-b-2 border-purple-200 w-1/2 mx-auto">
          {service ? "Editar Servcio " : " Crear Nuevo Servicio "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="px-6 md:px-16 mx-auto my-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-gray-400 dark:text-white"
            >
              Nombre del Servicio
            </label>
            <input
              id="name"
              type="text"
              defaultValue={service && service.name}
              {...register("name", {
                required: true,
                pattern: { value: /^(?!\s)/, message: "nombre invalido" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:purple-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2  text-gray-400 dark:text-white"
            >
              Precio
            </label>

            <Controller
              control={control}
              name="price"
              defaultValue={service?.price}
              rules={{ required: "el Precio es Requerido" }}
              render={({ field: { onChange, name, ref } }) => (
                <CurrencyInput
                  id={name}
                  itemRef={ref}
                  name={name}
                  value={service?.price}
                  decimalSeparator=","
                  groupSeparator="."
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:purple-blue-500"
                  prefix="$"
                  decimalsLimit={2}
                  onValueChange={(value, name, values) => {
                    console.log(value, name, values);
                    if (service) {
                      service.price = value;
                    }
                    onChange(value);
                  }}
                />
              )}
            />

            <span className="capitalize  text-red-500">
              {errors?.price?.message}
            </span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2  text-gray-400 dark:text-white"
            >
              Descripcion
            </label>
            <textarea
              id="description"
              type="text"
              defaultValue={service?.description}
              {...register("description")}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:purple-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-gray-400 dark:text-white"
            >
              Duraccion /en Minutos
            </label>
            <input
              id="name"
              type="number"
              defaultValue={service && service.duration}
              {...register("duration", {
                required: true,
                min:10
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:purple-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.duration?.message}
            </small>
          </div>

          

          <div className="text-center">
            {service && (
              <button
                type="button"
                onClick={() => {
                  setServiceSelected(null);
                  setOpen(false)
                  reset();
                }}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg darfont-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                <i className="me-4 fa-solid fa-ban"></i>
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
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

FormService.propTypes = {
  getAllServices: PropTypes.func.isRequired,
  service: PropTypes.object,
  setServiceSelected: PropTypes.func,
  setOpen: PropTypes.func,
};
