import { Router } from "express";
import { validateCreateAppointment } from "../validators/appointment.validator.js";
import { crearElasticByType, getDocumentById, updateElasticByType } from "../utils/index.js";
import { client } from "../ClienteElasticSearch.js";

const AppointmentRouter = Router();

AppointmentRouter.get("/", async (req, res) => {
  try {
    const result = await client.search({
      index: "sistemabarberia", // Reemplaza con el nombre de tu índice
      body: {
        query: {
          bool: {
            must: [{ match: { type: "cita" } }],
          },
        },
      },
    });
    var citas = result.body.hits.hits;
    citas = citas.map(async (c) => {
      return {
        ...c._source,
        _id: c._id,
        /*  serviciosData: c._source.services.map( async s => {
              return await getDocumentById(s);
            })  */
      };
    });
    citas = await Promise.all(citas);
    res.json(citas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

AppointmentRouter.post("/", validateCreateAppointment, async (req, res) => {
  try {
    console.log(req.body);
    await crearElasticByType(req.body, "cita");

    return res.status(201).json({ message: "Cita o Turno Creado." });
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

      const r = await updateElasticByType(req.params.id,{ date_start:date_start, date_end:date_end })
      
      return res
        .status(202)
        .json({ message: "Cita Actualizado.", cita: r });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);
export default AppointmentRouter;
