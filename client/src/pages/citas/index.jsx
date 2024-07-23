import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import FormCita from "./components/FormCita";
import "./index.css";
import { useCitas } from "../../hooks/useCitas";
import { ViewDollar } from "../../utils";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Dropdown, Tooltip } from "flowbite-react";
import { pachtUpdateDateAppointmentService } from "../../services/appointment.services";
import toast from "react-hot-toast";
export default function CitasPage() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataCitaEdit, setdataCitaEdit] = useState(null);

  const { data, getAllCitas } = useCitas();

  useEffect(() => {
    getAllCitas();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const toggleDrawer2 = (newOpen) => () => {
    setOpenEdit(newOpen);
  };

  function renderEventContent(eventInfo) {
    console.log(eventInfo.event);
    return (
      <div className=" bg-green-300">
        <div className="flex justify-between ">
          <span>{eventInfo.timeText}</span>
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                onClick={() => {
                  console.log(eventInfo.event._def.extendedProps?.citaData);
                  setdataCitaEdit(eventInfo.event._def.extendedProps?.citaData);
                  setOpenEdit(true);
                }}
                className="px-2 py-1 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <svg
                  className="w-6 h-6 text-white dark:text-white"
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

            <Tooltip
              className="w-full z-auto"
              content={
                <>
                  <div className="border-b border-green-500 w-full">
                    <span className="text-sm block"> Barbero </span>
                    <span>
                      {eventInfo.event._def.extendedProps?.barber?.name}
                    </span>
                  </div>
                  <div className="border-b border-green-500 w-full">
                    <span className="text-sm block"> Cliente </span>
                    <span>
                      {eventInfo.event._def.extendedProps?.client
                        ? eventInfo.event._def.extendedProps?.client.name
                        : " NO CLIENTE"}
                    </span>
                  </div>
                  <div className="border-b border-green-500 w-full">
                    <span className="text-sm block"> Total </span>
                    <span className="">
                      {ViewDollar(eventInfo.event._def.extendedProps?.total)}
                    </span>
                  </div>

                  <div className="border-b border-green-500 w-full text-center pb-2">
                    <span className="text-sm block text-start"> Estado </span>
                    <span className="bg-emerald-100 rounded-md  text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 dark:bg-gray-700 dark:text-gray-300">
                      {eventInfo.event._def.extendedProps?.status}
                    </span>
                  </div>

                  <div className="self-center mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        console.log(
                          eventInfo.event._def.extendedProps?.citaData
                        );
                        setdataCitaEdit(
                          eventInfo.event._def.extendedProps?.citaData
                        );
                        setOpenEdit(true);
                      }}
                      className="px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Editar
                    </button>
                  </div>
                </>
              }
            >
              <button
                type="button"
                className="px-2 py-1 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <svg
                  className="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
        <span className="text-sm block"> Cliente </span>
        <span>
          {eventInfo.event._def.extendedProps?.client
            ? eventInfo.event._def.extendedProps?.client.name
            : " NO CLIENTE"}
        </span>
      </div>
    );
  }

  const parseIsoNose = (date) => {
    const utcDate = new Date(date);

    // Convertir a fecha local
    const localDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "America/Bogota" })
    );
    return localDate.toISOString();
  };

  return (
    <div className="container mx-auto">
      <div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Agendar Cita
        </button>
      </div>
      <div className="min-h-[800px]">
        <FullCalendar
          timeZone="UTC"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={esLocale}
          headerToolbar={{
            start: "title",
            center: "timeGridDay,timeGridWeek",
          }}
          editable={true}
          eventChange={async (e) => {
            try {
              const r = await pachtUpdateDateAppointmentService({
                id: e.event._def.extendedProps.citaData._id,
                date_start: parseIsoNose(e.event._instance.range.start),
                date_end: parseIsoNose(e.event._instance.range.end),
              });
              toast.success(r.data.message);
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          }}
          events={data.map((c) => {
            return {
              ...c,
              title: "ss",
              start: c.date_start,
              end: c?.date_end,
              citaData: c,
            };
          })}
          slotMinTime={"07:00:00"}
          slotMaxTime={"23:00:00"}
          allDaySlot={false}
          eventContent={renderEventContent}
        />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <FormCita getAllCitas={getAllCitas} onClose={toggleDrawer(false)} />
      </Drawer>
      <Drawer open={openEdit} onClose={toggleDrawer2(false)}>
        <FormCita
          getAllCitas={getAllCitas}
          cita={dataCitaEdit}
          onClose={toggleDrawer2(false)}
        />
      </Drawer>
    </div>
  );
}
