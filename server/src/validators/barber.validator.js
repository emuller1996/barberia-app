import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreate = [
  checkSchema({
    name: {
      exists: { errorMessage: "el nombre del barbero el obligatorio " },
      notEmpty: { errorMessage: "no puedo ir vacio" },
    },
    name: {
      errorMessage: "el nombre del barbero el obligatorio",
      notEmpty: true,
    },
    services: {
      exists: { errorMessage: "los servicios del barbero el obligatorio " },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreate };
