export default function FormCitaMoviminetoCaja({ idCita }) {
  return (
    <div className="mx-12">
      <div className="border-y py-4">
        <h3 className="mb-5 font-medium text-gray-900 dark:text-white">
          Metodo de Pago
        </h3>
        <ul className="grid w-full gap-6 md:grid-cols-3">
            {
                ["Efectivo", "Tra"]
            }
          <li>
            <input
              type="radio"
              id="Efectivo"
              name="payment_method"
              value="Efectivo"
              className="hidden peer"
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
        </ul>
        <div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            <i className="me-4 fa-solid fa-floppy-disk"></i>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
