import { Router } from "express";
import prisma from "../prismaClient.js";
import { client } from "../ClienteElasticSearch.js";
import { getDocumentById } from "../utils/index.js";

const CashMovementsRoutes = Router();

CashMovementsRoutes.get("/per_day/:date", async (req, res) => {
  try {
    const specificDate = new Date(req.params.date);

    // Calculate the start and end of the day
    const startOfDay = new Date(specificDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(specificDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    console.log(new Date(req.params.date));

    const result = await client.search({
      index: "sistemabarberia", // Reemplaza con el nombre de tu índice
      body: {
        query: {
          bool: {
            must: [
              { match: { type: "movimiento" } },
              { match: { sale_date_day: specificDate } },
              /* {
                range: {
                  sale_date: {
                    gte: new Date(startOfDay).getTime(),
                    lte: new Date(endOfDay).getTime()
                  }
                }
              } */
            ],
          },
        },
      },
    });
    var invoices = result.body.hits.hits;
    invoices = invoices.map(async (c) => {
      return {
        ...c._source,
        _id: c._id,
      };
    });
    invoices = await Promise.all(invoices);

    res.json(invoices);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
export default CashMovementsRoutes;
