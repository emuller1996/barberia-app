import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormularioCita from "./FormularioCita";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #cecece",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};
export default function HomeReserva() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section id="home" className="bg-white dark:bg-gray-900 ">
      <div className="grid max-w-screen-xl px-4 pt-36 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-gray-700  dark:text-white">
            Bienvenidos a <a href=""></a> <br />
            [Nombre del Salón]
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            ¡Tu belleza es nuestra pasión! Descubre nuestros servicios de
            primera clase y déjanos resaltar tu mejor versión. ¡Reserva tu cita
            hoy y déjanos consentirte!
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={handleOpen}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Reserva Aqui!
            </button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://media.gq.com.mx/photos/64ed306e4de4b2e0e2b24729/master/pass/OPEN_STUDIO_SCALPER.jpg"
            alt="hero image"
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormularioCita />
        </Box>
      </Modal>
    </section>
  );
}
