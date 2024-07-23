import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import {
  pachtUpdateClienteService,
  postCreateClienteService,
} from "../../../services/cliente.services";
import { useState } from "react";

export default function FormCliente({ getAllCliente, cliente, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const [isSubmitting, setisSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setisSubmitting(true);
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
      } finally {
        setisSubmitting(false);
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
      } finally {
        setisSubmitting(false);
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
              className="block mb-2   text-gray-400 dark:text-white"
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
              className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="number_phone"
              className="block mb-2   text-gray-400 dark:text-white"
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
              className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
            />
            <small className="text-red-400 capitalize">
              {errors?.name?.message}
            </small>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2   text-gray-400 dark:text-white"
            >
              Dirrecion / Barrio
            </label>
            <input
              id="address"
              type="text"
              defaultValue={cliente && cliente.address}
              {...register("address")}
              className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:sky-blue-500"
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
              className="text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-sm shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-ban"></i>
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting ? true : false}
              className="text-white  disabled:opacity-70 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-blue-800 shadow-sm shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              {isSubmitting ? (
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
