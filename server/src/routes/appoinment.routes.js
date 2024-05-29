import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreateAppointment } from "../validators/appointment.validator.js";

const AppointmentRouter = Router();

AppointmentRouter.get("/", async (req, res) => {
  try {
    const services = await prisma.appointment.findMany({
      include: { services: true, barber: true, client: true },
    });

    console.log(services);
    res.json(services);
  } catch (error) {
    console.log(error);
  }
});

AppointmentRouter.post("/", validateCreateAppointment, async (req, res) => {
  try {
    console.log(req.body);
    const services = req.body.services.map((c) => {
      return { id: c };
    });
    var ClientData = {};
    const idBarber = req.body.barber_id;
    if (req.body.client_id) {
      ClientData.client = { connect: { id: req.body.client_id } };
    }
    delete req.body.barber_id;
    delete req.body.client_id;

    console.log(req.body.services.map((c) => c));
    const r = await prisma.appointment.create({
      data: {
        ...req.body,
        status: "AGENDADA",
        barber: { connect: { id: idBarber } },
        services: { connect: services },
        ...ClientData,
      },
    });

    return res.status(201).json({ message: "Servicio Creado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

AppointmentRouter.patch("/:id", validateCreateAppointment, async (req, res) => {
  //RESERT SERVICES, BARBER AND CLIENTE

  const ReqServices = req.body.services.map((c) => {
    return {
      id: c,
    };
  });

  const idBarber = { id: req.body.barber_id };
  var ClientData = {};

  if (req.body.client_id) {
    ClientData.client = { connect: { id: req.body.client_id } };
  }
  delete req.body.barber_id;
  delete req.body.client_id;
  try {
    const result = await prisma.appointment.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        services: {
          set: ReqServices,
        },
        barber: { connect: idBarber },
        ...ClientData,
      },
    });
    console.log(result);
    return res.status(202).json({ message: "Cita Actualizado.", cita: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

AppointmentRouter.patch(
  "/:id/date",

  async (req, res) => {
    try {
      const { date_start, date_end } = req.body;

      const result = await prisma.appointment.update({
        where: {
          id: req.params.id,
        },
        data: {
          date_start,
          date_end,
        },
      });
      console.log(result);
      return res
        .status(202)
        .json({ message: "Cita Actualizado.", cita: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);
export default AppointmentRouter;
