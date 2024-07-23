import PropTypes from "prop-types";

export default function CardBarber({
  barber,
  handleEditBarber,
  barberSelected,
}) {
  return (
    <div
      className="border border-orange-300 p-3 rounded-xl hover:bg-orange-50 hover:shadow"
      key={barber.id}
    >
      <div className="flex gap-2 items-center">
        <img
          className="h-32 w-32 rounded-xl  object-cover"
          src={barber.base64Image}
          alt="Rounded avatar"
          
        />
        <div className="mx-5 flex  flex-col gap-0 text-gray-500 w-full ">
          <span className="font-medium uppercase text-xl text-center border-b-2 border-dashed pb-2 border-orange-200">
            {barber?.name}
          </span>
          <div className="flex flex-row  justify-between items-start">
            <div className="col-6  text-nowrap">Numero Telefonico</div>
            <div className="col-6 md:text-end">{barber?.number_phone}</div>
          </div>
          <div className="flex flex-row  justify-between items-start">
            <div className="col-6 text-nowrap">Cargo</div>
            <div className="col-6 md:text-end">
              {barber.title ? barber.title : "-"}
            </div>
          </div>
          <div className="flex flex-row  justify-between items-start">
            <div className="col-6 text-nowrap">Correo</div>
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
              className="px-3 disabled:opacity-40 py-2  text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
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
