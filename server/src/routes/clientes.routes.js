import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreateCliente } from "../validators/client.validator.js";

const ClientesRouter = Router();

ClientesRouter.get("/", async (req, res) => {
  try {
    const clientes = await prisma.client.findMany();

    res.json(clientes);
  } catch (error) {
    console.log(error);
  }
});

ClientesRouter.post("/", validateCreateCliente, async (req, res) => {
  try {
    const r = await prisma.client.create({
      data: req.body,
    });

    return res.status(201).json({ message: "Cliente Creado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

ClientesRouter.patch("/:id", validateCreateCliente, async (req, res) => {
  try {
    const r = await prisma.service.update({
      where: { id: req.params.id },
      data: req.body,
    });

    return res.status(202).json({ message: "Cliente Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

export default ClientesRouter;
