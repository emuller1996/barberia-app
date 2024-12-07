import { Router } from "express";
import { validateCreateProductos } from "../validators/producto.validator.js";
import xlsx from "xlsx";

import pkg from "express-fileupload";
import { buscarElasticByType, buscarElasticByTypePagination, crearElasticByType, createInMasaDocumentByType, updateElasticByType } from "../utils/index.js";

const fileUpload = pkg;
const ProductosRouter = Router();

ProductosRouter.get("/", async (req, res) => {
  try {
    const productos = await buscarElasticByType("producto")

    console.log(productos);
    res.json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ProductosRouter.post("/", validateCreateProductos, async (req, res) => {
  try {
    const r = await crearElasticByType(req.body,"producto")
    return res.status(201).json({ message: "Producto Creado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ProductosRouter.patch("/:id", validateCreateProductos, async (req, res) => {
  try {
    const r = await updateElasticByType(req.params.id,req.body)
    return res
      .status(202)
      .json({ message: "Producto Actualizado.", barber: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

ProductosRouter.get("/pagination", async (req, res) => {

  console.log(req.query);
  try {
    const productos = await buscarElasticByTypePagination("producto",req.query.per_page,req.query.page, req.query.search,'name.keyword');
    res.json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });

  }

})

ProductosRouter.post(
  "/import-excel",

  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
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
      console.log(data);

      const r =await createInMasaDocumentByType(data,"producto")
      console.log(r);
      

      return res.status(200).json({ message: "Importada Realizada", data : r });
    } catch (error) {
      res.status(500).send("Error al procesar el archivo: " + error.message);
    }
  }
);

export default ProductosRouter;
