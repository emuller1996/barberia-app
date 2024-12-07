import PropTypes from "prop-types";
import { ViewDollar } from "../../../utils";

export default function CardService({ service, handleEditService }) {
  return (
    <div className="border border-purple-300 p-3 rounded-xl hover:bg-purple-50 hover:shadow">
      <div className="flex justify-between h-full flex-col gap-0 text-gray-500 w-full ">
        <span className="font-semibold uppercase text-xl text-center border-b-2 border-dashed pb-2 mb-3 border-purple-200">
          {service?.name}
        </span>
        <div className="flex  justify-between border-b pb-2 mb-2 items-start">
          <div className="font-semibold">Precio</div>
          <div className="font-semibold text-green-500">{ViewDollar(service?.price)}</div>
        </div>
        <div className="">
          <div className="font-semibold">Descripcion</div>
          <p className="text-pretty text-justify">{service?.description}</p>
        </div>
        <div className="">
            
          <p className="text-pretty text-justify"><i className="fa-regular fa-clock me-2"></i>{service?.duration && `${service?.duration} Minutos` }</p>
        </div>

        <div className="text-center   mt-2 pt-2 border-t-2   border-dashed border-purple-200">
          <button
            type="button"
            onClick={() => {
              handleEditService(service);
            }}
          className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"

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
        </div>
      </div>
    </div>
  );
}
CardService.propTypes = {
  service: PropTypes.object.isRequired,
  handleEditService: PropTypes.func,
};
