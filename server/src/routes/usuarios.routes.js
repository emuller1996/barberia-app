import { Router } from "express";
import prisma from "../prismaClient.js";
import md5 from "md5";

import {
  buscarElasticByType,
  buscarElasticByTypePagination,
  crearElasticByType,
  createInMasaDocumentByType,
  updateElasticByType,
} from "../utils/index.js";

const UsuariosRouter = Router();

UsuariosRouter.get("/", async (req, res) => {
  try {
    const usuarios = await buscarElasticByType("usuario");

    console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

UsuariosRouter.post("/", async (req, res) => {
  try {
    let user = req.body;
    user.password = md5(req.body.password);
    const r = await crearElasticByType(user, "usuario");
    return res.status(201).json({ message: "Usuario Creado.", data: r });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default UsuariosRouter;
