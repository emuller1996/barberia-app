import { useForm } from "react-hook-form";
import {
  patchUpdateBarberService,
  postCreateBarberService,
} from "../../../services/barbers.services";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useServicios } from "../../../hooks/useServicios";
import { useEffect } from "react";

export default function FormBarber({
  getAllBarbers,
  barber,
  setbarberSelected,
  setOpen,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, getAllServicios } = useServicios();

  useEffect(() => {
    getAllServicios();
  }, [barber]);

  const onSubmit = async (data) => {
    console.log(data);

    if (barber) {
      try {
        data.id = barber.id;
        const r = await patchUpdateBarberService(data);
        toast.success(r.data.message);
        await getAllBarbers();
        reset();
        setOpen(false);
        setbarberSelected(null);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        const r = await postCreateBarberService(data);
        toast.success(r.data.message);
        await getAllBarbers();
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
      <div className="border-x border-y  border-orange-200 rounded-lg  ">
        <p className="text-center mt-3 text-orange-600 border-b-2 border-orange-200 w-1/2 mx-auto">
          Crear Nuevo Barbero
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
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              defaultValue={barber?.name}
              {...register("name", {
                required: true,
                pattern: { value: /^(?!\s)/, message: "nombre invalido" },
              })}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500"
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
              Numero Telefonico
            </label>
            <input
              id="number_phone"
              type="number"
              defaultValue={barber?.number_phone}
              {...register("number_phone")}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Cargo
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              defaultValue={barber?.title}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              Correo Electronico
            </label>
            <input
              id="email"
              type="text"
              {...register("email")}
              defaultValue={barber?.email}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="img_url"
              className="block mb-2 text-2xl text-gray-400 dark:text-white"
            >
              URL image
            </label>
            <input
              {...register("img_url", { required: true })}
              id="img_url"
              type="url"
              defaultValue={barber?.img_url}
              className="bg-gray-50 border text-2xl border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:orange-blue-500"
            />
          </div>

          <h3 className="mb-3  font-medium text-gray-500 dark:text-white">
            Selecione los Servicios:
          </h3>
          <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-3">
            {data.map((s) => (
              <li key={s.id}>
                <input
                  type="checkbox"
                  id={s.id}
                  value={s.id}
                  className="hidden peer"
                  {...register("services")}
                  defaultValue={barber?.services}
                  defaultChecked={
                    barber && barber?.services.map((c) => c?.id).includes(s.id)
                  }
                />
                <label
                  htmlFor={s.id}
                  className="inline-flex items-center justify-between max-h-[50px] overflow-hidden w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-orange-400  hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-orange-800 peer-checked:ring-2 peer-checked:ring-orange-200 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block truncate ">
                    <div className="w-full text-lg font-semibold ">
                      {s.name}
                    </div>
                    <div className=" text-sm ">{s.description}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setbarberSelected(null);
                reset();
                setOpen(false);
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
            >
              <i className="me-4 fa-solid fa-ban"></i>
              Cancelar
            </button>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
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

FormBarber.propTypes = {
  getAllBarbers: PropTypes.func.isRequired,
  setbarberSelected: PropTypes.func,
  setOpen: PropTypes.func,
  barber: PropTypes.object,
};
