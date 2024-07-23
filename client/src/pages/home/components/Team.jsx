import { useEffect } from "react";
import { useBarbers } from "../../../hooks/useBarbers";
/* import Carousel from "react-multi-carousel"; */
import "react-multi-carousel/lib/styles.css";
export default function TeamComponent() {
  const { data, getAllBarbers } = useBarbers();

  useEffect(() => {
    getAllBarbers();
  }, []);

  console.log(data);
  return (
    <section id="equipo" className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Profesionales
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Este es el equipo de trabajo que tenemos a tu servicio, que esperas?
            saca tu cita con uno de ellos!
          </p>
        </div>

       
       
        

        

        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {data.map((profesional) => (
            <div
              key={profesional._id}
              className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <div className="flex justify-center">
                <img src={profesional.base64Image} className="" alt="" />
              </div>
              <h3 className="mb-0 text-2xl font-semibold">
                {profesional.name}
              </h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {profesional.title}
              </p>
             
              <hr className="my-4" />
              <ul role="list" className="mb-8 space-y-4 text-left">
                {profesional.servicesInfo.map((service, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{service.name}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="text-white  uppercase font-semibold bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200  rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900"
              >
                Agendar Cita
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
