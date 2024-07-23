import { Router } from "express";
import { validateCreateService } from "../validators/services.validator.js";
import { buscarElasticByType, crearElasticByType, updateElasticByType } from "../utils/index.js";

const ServicesRouter = Router();

ServicesRouter.get("/", async (req, res) => {
  try {
    const services = await buscarElasticByType("servicio");

    console.log(services);
    res.json(services);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

ServicesRouter.post("/", validateCreateService, async (req, res) => {
  try {
    const r = await crearElasticByType(req.body,"servicio");
    return res.status(201).json({ message: "Servicio Creado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

ServicesRouter.patch("/:id", validateCreateService, async (req, res) => {
  try {
    const r = await updateElasticByType(req.params.id,req.body)
    return res.status(202).json({ message: "Servicio Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }
});

export default ServicesRouter;
