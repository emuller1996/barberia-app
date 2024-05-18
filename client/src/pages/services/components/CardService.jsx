import PropTypes from "prop-types";

export default function CardService({ service, handleEditService }) {
  return (
    <div className="border-x-4 border-y border-purple-300 p-3 rounded-xl hover:bg-purple-50 hover:shadow">
      <div className="flex gap-5 items-center">
        <div className="flex  flex-col gap-0 text-gray-500 w-full ">
          <span className="font-medium uppercase text-3xl text-center border-b-2 border-dashed pb-2 mb-3 border-purple-200">
            {service?.name}
          </span>
          <div className="d-flex flex-col lg:flex-row items-start">
            <div className="col-6 text-lg text-nowrap">Precio</div>
            <div className="col-6 md:text-end">{service?.price}</div>
          </div>
          <div className="d-flex flex-col lg:flex-row items-start">
            <div className="col-6 text-lg text-nowrap">Descripcion</div>
            <div className="col-6 md:text-end">{service?.description}</div>
          </div>

          <div className="text-center   mt-2 pt-2 border-t  border-dashed border-purple-200">
            <button
              type="button"
              onClick={() => {
                handleEditService(service);
              }}
              className="px-3 py-2 text-lg font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
CardService.propTypes = {
  service: PropTypes.object.isRequired,
  handleEditService: PropTypes.func,
};
