import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { postCreateUsuariosService } from "../../../services/usuarios.services";

export default function FormUsuario({ setOpen }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    toast.success("Melo");

    try {
      const r = await postCreateUsuariosService(data);
      toast.success(r.data.message);
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="border-x border-y  border-stone-200 rounded-lg min-w-[380px] md:min-w-[580px] ">
        <p className="text-center mt-3 text-stone-600 border-b-2 border-stone-200 w-1/2 mx-auto">
          Crear Usuario
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
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:stone-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-400 dark:text-white"
            >
              Correo Electronico
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:stone-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-400 dark:text-white"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:stone-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block mb-2 text-gray-400 dark:text-white"
            >
              Rol
            </label>
            <select
              {...register("role", { required: true })}
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Selecione un Rol</option>
              <option value="Admin">Admin</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                /*  setOpen(false); */
                /*   reset(); */
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg  dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-ban"></i>
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-stone-400 via-stone-500 to-stone-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
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

FormUsuario.propTypes = {
  setOpen: PropTypes.func,
};
