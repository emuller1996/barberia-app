import { Router } from "express";
import prisma from "../prismaClient.js";
import { validateCreateProductos } from "../validators/producto.validator.js";

const ProductosRouter = Router();

ProductosRouter.get("/", async (req, res) => {
  try {
    const services = await prisma.product.findMany();

    console.log(services);
    res.json(services);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

ProductosRouter.post("/", validateCreateProductos, async (req, res) => {
  try {
    const r = await prisma.product.create({
      data: req.body,
    });

    return res.status(201).json({ message: "Producto Creado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

ProductosRouter.patch("/:id", validateCreateProductos, async (req, res) => {
  try {
    const r = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    return res
      .status(202)
      .json({ message: "Producto Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

export default ProductosRouter;
