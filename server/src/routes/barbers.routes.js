import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreate } from "../validators/barber.validator.js";

const BarbersRouter = Router();

BarbersRouter.get("/", async (req, res) => {
  try {
    const barbers = await prisma.barber.findMany({
      include: { services: true },
    });

    console.log(barbers);
    res.json(barbers);
  } catch (error) {
    console.log(error);
  }
});

BarbersRouter.post("/", validateCreate, async (req, res) => {
  const services = req.body.services.map((c) => {
    return { id: c };
  });
  console.log(services);
  try {
    const r = await prisma.barber.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        number_phone: req.body.number_phone,
        img_url: req.body.img_url,
        title: req.body.title,
        services: {
          connect: services,
        },
      },
    });

    return res.status(201).json({ message: "Barbero Creado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

BarbersRouter.patch("/:id", validateCreate, async (req, res) => {
  const services = req.body.services.map((c) => {
    return { id: c };
  });
  //RESERT SERVICES
  try {
    const result = await prisma.barber.update({
      where: {
        id: req.params.id,
      },
      data: {
        services: {
          set: [],
        },
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  try {
    const result = await prisma.barber.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        services: {
          connect: services,
        },
      },
    });
    console.log(result);
    return res
      .status(200)
      .json({ message: "Barbero Actualizado.", barber: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default BarbersRouter;
