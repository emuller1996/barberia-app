import { Router } from "express";
import { validateCreate } from "../validators/barber.validator.js";
import {
  buscarElasticByType,
  crearElasticByType,
  getDocumentById,
  updateElasticByType,
} from "../utils/index.js";

const BarbersRouter = Router();

BarbersRouter.get("/", async (req, res) => {
  try {
    const barbersResquest = await buscarElasticByType("barbero");

    var barbers = barbersResquest;
    barbers = barbers.map(async (c) => {
      if (Array.isArray(c.services) && c.services !== null) {
        const servicesInfo = await Promise.all(
          await c.services.map(async (i) => await getDocumentById(i))
        );
        return {
          ...c,
          servicesInfo,
        };
      } else {
        return c;
      }
    });
    barbers = await Promise.all(barbers);
    res.json(barbers);
  } catch (error) {
    console.log(error);
  }
});

BarbersRouter.get("/:id/services", async (req, res) => {
  try {
    const barbersResquest = await getDocumentById(req.params.id);

    const idsServicesBarber = barbersResquest.services;
    console.log(idsServicesBarber);
    const ArrP = idsServicesBarber.map(async (i) => {
      return { ...(await getDocumentById(i)), _id: i };
    });
    console.log(ArrP);
    const resultArry = await Promise.all(ArrP);

    /* var barbers = barbersResquest;
    barbers = barbers.map(async (c) => {
      if (Array.isArray(c.services) && c.services !== null) {
        const servicesInfo = await Promise.all(
          await c.services.map(async (i) => await getDocumentById(i))
        );
        return {
          ...c,
          servicesInfo,
        };
      } else {
        return c;
      }
    });
    barbers = await Promise.all(barbers);
     */
    res.json(resultArry);
  } catch (error) {
    console.log(error);
  }
});

BarbersRouter.post("/", validateCreate, async (req, res) => {
  try {
    console.log(req.body);
    const r = await crearElasticByType(req.body, "barbero");
    return res.status(201).json({ message: "Barbero Creado.", barber: r });
  } catch (error) {
    console.log(error);
  }
});

BarbersRouter.patch("/:id", validateCreate, async (req, res) => {
  //RESERT SERVICES
  try {
    const r = await updateElasticByType(req.params.id, req.body);
    console.log(r);
    return res.status(200).json({ message: "Barbero Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default BarbersRouter;
