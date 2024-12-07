import React, { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Controller, useForm } from "react-hook-form";
import { postCreateClienteService } from "../../../services/cliente.services";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function FormCliente({ setPasoActual, setdatosCliente }) {
  FormCliente.propTypes = {
    setPasoActual: PropTypes.func,
    setdatosCliente: PropTypes.func,
  };
  const [numberPhone, setNumberPhoneLocal] = useLocalStorage("numberPhone", "");
  const [NumberPhone, setNumberPhone] = React.useState(numberPhone);
  const [isLoading, setisLoading] = React.useState(false);
  const [ErroResponse, setErroResponse] = React.useState(null);
  const [isRegister, setisRegister] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const { validateCliente } = useClientes();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = async (data) => {
    setisSubmitting(true);
    console.log(data);

    try {
      const r = await postCreateClienteService(data);
      toast.success(r.data.message);
      const dataC = await validateCliente(data.number_phone);
      setisLoading(false);
      if (dataC !== false) {
        console.log(dataC.data.data[0]);
        setdatosCliente(dataC.data.data[0]);
        setPasoActual(2);
      } else {
        setdatosCliente(null);
        setErroResponse(
          `Cliente  con el numero telefonico ${NumberPhone} no esta registrado, te invitamos a registrate en el boton de abajo. `
        );
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <div className="mx-3">
      {!isRegister ? (
        <>
          <div>
            <p className="text-center px-5 text-gray-500  italic my-8">
              Hola, Que bueno desear agendar con nosotros, todo nuestros
              clientes estan identificados con su numero telefonico. registrate
              o ingresa tu numero para agendar tu cita.
            </p>
            <label
              htmlFor="phone-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Numero Telefonico:
            </label>
            <div className="relative">
              <PhoneInput
                value={NumberPhone}
                onChange={(e) => {
                  console.log(e);
                  setNumberPhone(e);
                  setNumberPhoneLocal(e)
                }}
                defaultCountry="CO"
                type="text"
                id="phone-input"
                aria-describedby="helper-text-explanation"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={async () => {
                  setisLoading(true);
                  setErroResponse(null);

                  const data = await validateCliente(NumberPhone);
                  setisLoading(false);
                  if (data !== false) {
                    console.log(data.data.data[0]);
                    setdatosCliente(data.data.data[0]);
                    setPasoActual(2);
                  } else {
                    setdatosCliente(null);
                    setErroResponse(
                      `Cliente  con el numero telefonico ${NumberPhone} no esta registrado, te invitamos a registrate en el boton de abajo. `
                    );
                    console.log(data);
                  }
                }}
                disabled={isLoading ? true : false}
                className="text-white bg-gradient-to-r from-purple-500 disabled:opacity-40 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
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
                Ingresar
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="md:w-3/4 mx-auto mt-4"
          >
            <div className="mb-3">
              <label
                htmlFor="phone-input"
                className="block mb-2  font-medium text-gray-400"
              >
                Numero Telefonico{" "}
                <span className="text-indigo-700 font-semibold">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="number_phone"
                  control={control}
                  defaultValue={NumberPhone}
                  rules={{ required: true }}
                  render={({ field: { onChange, name } }) => (
                    <PhoneInput
                      value={NumberPhone}
                      onChange={(e) => {
                        console.log(e);
                        setNumberPhone(e);
                        onChange(e);
                      }}
                      name={name}
                      defaultCountry="CO"
                      type="text"
                      id={name}
                      aria-describedby="helper-text-explanation"
                      //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="123-456-7890"
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-2   text-gray-400 dark:text-white"
              >
                Nombre y Apellido{" "}
                <span className="text-indigo-700 font-semibold">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: true,
                  pattern: { value: /^(?!\s)/, message: "nombre invalido" },
                })}
                className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
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
                {...register("address")}
                className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:indigo-blue-500"
              />
              <small className="text-red-400 capitalize">
                {errors?.name?.message}
              </small>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setisRegister(false);
                }}
                className="text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-sm shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2 text-center me-2 mb-2"
              >
                <i className="me-4 fa-solid fa-ban"></i>
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting ? true : false}
                className="text-white  disabled:opacity-70 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-blue-800 shadow-sm shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg  px-5 py-2 text-center me-2 mb-2"
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
        </>
      )}

      <div>
        {ErroResponse && (
          <>
            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>{ErroResponse}</div>
            </div>
            <p className="text-gray-700 text-balance text-center capitalize"></p>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setisRegister(true);
                  setErroResponse(null);
                }}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
              >
                Registrame{" "}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
