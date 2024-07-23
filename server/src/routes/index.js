import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import authRouters from "./auth.routes.js";
import BarbersRouter from "./barbers.routes.js";
import ServicesRouter from "./services.routes.js";
import ClientesRouter from "./clientes.routes.js";
import AppointmentRouter from "./appoinment.routes.js";
import ProductosRouter from "./products.routes.js";
import InvoiceRouter from "./sales.routes.js";
import CashMovementsRoutes from "./cash-movements.routes.js";

import { client } from "../ClienteElasticSearch.js";
import UsuariosRouter from "./usuarios.routes.js";
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/auth", authRouters);
router.use("/barbers", BarbersRouter);
router.use("/services", ServicesRouter);
router.use("/clientes", ClientesRouter);
router.use("/citas", AppointmentRouter);
router.use("/productos", ProductosRouter);
router.use("/invoice", InvoiceRouter);
router.use("/cash-movement", CashMovementsRoutes);
router.use("/usuarios", UsuariosRouter);


router.get("/test", async (req, res) => {
  try {
    const result = await client;
    console.log(result);
    res.json({ result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
