import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreateService } from "../validators/services.validator.js";

const ServicesRouter = Router();

ServicesRouter.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany();

    console.log(services);
    res.json(services);
  } catch (error) {
    console.log(error);
  }
});

ServicesRouter.post("/", validateCreateService, async (req, res) => {
  try {
    const r = await prisma.service.create({
      data: req.body,
    });

    return res.status(201).json({ message: "Servicio Creado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

ServicesRouter.patch("/:id", validateCreateService, async (req, res) => {
  try {
    const r = await prisma.service.update({
      where:{id:req.params.id},      
      data: req.body,
    });

    return res.status(202).json({ message: "Servicio Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

export default ServicesRouter;
