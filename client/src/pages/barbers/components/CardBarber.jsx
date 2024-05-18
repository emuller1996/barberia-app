import PropTypes from "prop-types";

export default function CardBarber({
  barber,
  handleEditBarber,
  barberSelected,
}) {
  return (
    <div
      className="border-x-4 border-y border-orange-300 p-3 rounded-xl hover:bg-orange-50 hover:shadow"
      key={barber.id}
    >
      <div className="flex gap-5 items-center">
        <img
          className="w-36 h-36 rounded-full  object-cover"
          src={barber.img_url}
          alt="Rounded avatar"
        />
        <div className="flex  flex-col gap-0 text-gray-500 w-full ">
          <span className="font-medium uppercase text-3xl text-center border-b-2 border-dashed pb-2 mb-3 border-orange-200">
            {barber?.name}
          </span>
          <div className="d-flex flex-col lg:flex-row items-start">
            <div className="col-6 text-lg text-nowrap">Numero Telefonico</div>
            <div className="col-6 md:text-end">{barber?.number_phone}</div>
          </div>
          <div className="d-flex flex-col lg:flex-row items-start">
            <div className="col-6 text-lg text-nowrap">Cargo</div>
            <div className="col-6 md:text-end">
              {barber.title ? barber.title : "-"}
            </div>
          </div>
          <div className="d-flex flex-col lg:flex-row items-start">
            <div className="col-6 text-lg text-nowrap">Correo</div>
            <div className="col-6 md:text-end">
              {barber.email ? barber.email : "-"}
            </div>
          </div>

          <div className="text-center   mt-2 pt-2 border-t  border-dashed border-orange-200">
            <button
              disabled={barberSelected ? true : false}
              type="button"
              onClick={() => {
                handleEditBarber(barber);
              }}
              className="px-3 disabled:opacity-40 py-2 text-lg font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
CardBarber.propTypes = {
  barber: PropTypes.object.isRequired,
  handleEditBarber: PropTypes.func,
  barberSelected: PropTypes.object,
};
