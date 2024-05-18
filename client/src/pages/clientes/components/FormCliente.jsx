import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import {
  pachtUpdateClienteService,
  postCreateClienteService,
} from "../../../services/cliente.services";

export default function FormCliente({ getAllCliente, cliente, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (cliente) {
      data.id = cliente.id;
      try {
        const r = await pachtUpdateClienteService(data);
        toast.success(r.data.message);
        await getAllCliente();
        reset();
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const r = await postCreateClienteService(data);
        toast.success(r.data.message);
        await getAllCliente();
        reset();
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className=" border-sky-200 rounded-lg  min-w-[350px]  md:min-w-[550px] ">
        <p className="text-center mt-3 text-sky-600 border-b-2 border-sky-200 w-1/2 mx-auto">
          {cliente ? "Editar Cliente " : " Crear Nuevo Cliente "}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="px-6 md:px-16 mx-auto my-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Nombre del Cliente
            </label>
            <input
              id="name"
              type="text"
              defaultValue={cliente && cliente.name}
              {...register("name", {
                required: true,
                pattern: { value: /^(?!\s)/, message: "nombre invalido" },
              })}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="number_phone"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Numero Telefonico *
            </label>
            <input
              id="number_phone"
              type="text"
              defaultValue={cliente && cliente.number_phone}
              {...register("number_phone", {
                required: true,
              })}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Dirrecion / Barrio
            </label>
            <input
              id="address"
              type="text"
              defaultValue={cliente && cliente.address}
              {...register("address")}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              className="text-white text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-ban"></i>
              Cancelar
            </button>

            <button
              type="submit"
              className="text-white text-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
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

FormCliente.propTypes = {
  getAllCliente: PropTypes.func.isRequired,
  cliente: PropTypes.object,
  setOpen: PropTypes.func.isRequired,
};
