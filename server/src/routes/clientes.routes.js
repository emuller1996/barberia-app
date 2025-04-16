import { Router } from "express";
import { validateCreateCliente } from "../validators/client.validator.js";
import {
  buscarElasticByType,
  buscarElasticByTypePagination,
  crearElasticByType,
  createInMasaDocumentByType,
} from "../utils/index.js";
import fileUpload from "express-fileupload";
import xlsx from "xlsx";
import { client } from "../ClienteElasticSearch.js";

const ClientesRouter = Router();
const INDEX_ES = "sistemabarberia";

ClientesRouter.get("/", async (req, res) => {
  try {
    const clientes = await buscarElasticByType("clientes");
    res.json(clientes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ClientesRouter.get("/validate/:number_phone", async (req, res) => {
  try {
    const searchResult = await client.search({
      index: INDEX_ES,
      size: 1000,
      body: {
        query: {
          bool: {
            must: [
              { match: { type: "clientes" } },
              { match: { number_phone: req.params.number_phone } },
            ],
          },
        },
        sort: [
          { createdTime: { order: "asc" } }, // Reemplaza con el campo por el que quieres ordenar
        ],
      },
    });
    console.log();
    if (searchResult.body.hits.hits.length !== 0) {
      const clienteEs = searchResult.body.hits.hits.map((c) => {
        return {
          ...c._source,
          _id: c._id,
        };
      });
 
      
      return res
        .status(200)
        .json({ message: "Cliente Encontrado.", data: clienteEs });
    } else {
      return res.status(404).json({ message: "Cliente no Encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

ClientesRouter.get("/pagination", async (req, res) => {
  console.log(req.query);
  try {
    const clientes = await buscarElasticByTypePagination(
      "clientes",
      req.query.per_page,
      req.query.page,
      req.query.search
    );
    res.json(clientes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ClientesRouter.post("/", validateCreateCliente, async (req, res) => {
  try {
    const r = await crearElasticByType(req.body, "clientes");
    return res.status(201).json({ message: "Cliente Creado.", cliente_id: r.body._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ClientesRouter.post(
  "/import-excel",
  async (req, res) => {
    try {
      const { file } = req.files;
      console.log(file);
      if (!file) {
        return res.status(400).send("No se ha seleccionado ningún archivo");
      }
      const workbook = xlsx.readFile(file.tempFilePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      /* console.log(data); */
      const r = await createInMasaDocumentByType(data, "clientes");
      console.log(r);

      return res.status(200).json({ message: "Importada Realizada" });
    } catch (error) {
      res.status(500).send("Error al procesar el archivo: " + error.message);
    }
  }
);
export default ClientesRouter;
