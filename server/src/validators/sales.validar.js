import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateSales = [
  checkSchema({
    total: {
      exists: { errorMessage: "el total del servicio el obligatorio " },
      notEmpty: { errorMessage: "el total no puede ir vacio" },
    },
    productos: {
      exists: { errorMessage: "los productos son obligatorios " },
      notEmpty: { errorMessage: "los productos  no puede ir vacio" },
      isArray: { errorMessage: "los productos  debe ser un Array" },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreateSales };
