import { useEffect } from "react";
import { useServicios } from "../../../hooks/useServicios";
import { ViewDollar } from "../../../utils";

export default function ServicesComponent() {
  const { data, getAllServicios, loading } = useServicios();

  useEffect(() => {
    getAllServicios();
  }, []);
  console.log(data);

  return (
    <>
      <section id="servicios" className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Servicios
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Este es el equipo de trabajo que tenemos a tu servicio, que
              esperas? saca tu cita con uno de ellos!
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((service) => (
              <div
                key={service._id}
                className="flex flex-col  bg-white border shadow-sm shadow-blue-200 rounded-xl"
              >
                <div className="flex flex-col h-full justify-between px-6 py-4 ">
                  <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-2xl">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {service.description}
                  </p>
                  <div className=" ">
                    <p className="text-3xl font-light tracking-tight text-green-700">
                      {ViewDollar(service.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
