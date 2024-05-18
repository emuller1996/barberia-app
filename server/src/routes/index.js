import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import authRouters from "./auth.routes.js";
import BarbersRouter from "./barbers.routes.js";
import ServicesRouter from "./services.routes.js";
import ClientesRouter from "./clientes.routes.js";

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/auth", authRouters);
router.use("/barbers", BarbersRouter);
router.use("/services", ServicesRouter);
router.use("/clientes", ClientesRouter);

router.get("/test", async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
