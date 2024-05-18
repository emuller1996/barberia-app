import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateService = [
  checkSchema({
    name: {
      exists: { errorMessage: "el nombre del barbero el obligatorio " },
      notEmpty: { errorMessage: "no puedo ir vacio" },
    },

    price: {
      exists: { errorMessage: "el precio del servicio el obligatorio " },
      notEmpty: { errorMessage: "el precio no puede ir vacio" },
      isNumeric: { errorMessage: "el precio debe ser un numero " },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreateService };
