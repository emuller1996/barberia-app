import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateCliente = [
  checkSchema({
    name: {
      exists: { errorMessage: "el nombre del cliente el obligatorio " },
      notEmpty: { errorMessage: "nombre del cliente no puede ir vacio" },
    },
    number_phone: {
      exists: { errorMessage: "el numero del cliente el obligatorio " },
      notEmpty: {
        errorMessage: "numero telefonico del cliente no puede ir vacio",
      },
    },
    address: {
      exists: { errorMessage: "el numero del cliente el obligatorio " },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreateCliente };
