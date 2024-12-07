import { Router } from "express";
import { validateCreateAppointment } from "../validators/appointment.validator.js";
import {
  crearElasticByType,
  getDocumentById,
  updateElasticByType,
} from "../utils/index.js";
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
      size:10000
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

const HorasD = [
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "09:00 AM", value: "09:00" },
  { label: "09:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
];
AppointmentRouter.get(
  "/get_hours_available/:date/:idProfesional",
  async (req, res) => {
    try {
      const result = await client.search({
        index: "sistemabarberia", // Reemplaza con el nombre de tu índice
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    "type.keyword": "cita",
                  },
                },
                {
                  match: {
                    date: req.params.date,
                  },
                },
                {
                  match: {
                    "barber._id.keyword": req.params.idProfesional,
                  },
                },
              ],
            },
          },
        },
      });
      var citas = result.body.hits.hits;
      citas = citas.map((c) => {
        return {
          ...c._source,
          _id: c._id,
        };
      });
      var horasOcupadas = [];
      citas.forEach((element) => {
        element.hours_bussy.forEach((element2) => {
          console.log(element2);
          horasOcupadas.push(element2);
        });
      });

      const filteredTimeSlots = HorasD.filter(slot => !horasOcupadas.includes(slot.value));

      console.log(filteredTimeSlots);
      res.json(filteredTimeSlots);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

AppointmentRouter.patch(
  "/:id/date",

  async (req, res) => {
    try {
      const { date_start, date_end } = req.body;

      const r = await updateElasticByType(req.params.id, {
        date_start: date_start,
        date_end: date_end,
      });

      return res.status(202).json({ message: "Cita Actualizado.", cita: r });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);
export default AppointmentRouter;
