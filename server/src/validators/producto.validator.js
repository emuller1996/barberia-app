import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateProductos = [
  checkSchema({
    description: {
      exists: { errorMessage: "el nombre del barbero el obligatorio " },
      notEmpty: { errorMessage: "no puedo ir vacio" },
    },

    price: {
      exists: { errorMessage: "el precio del servicio el obligatorio " },
      notEmpty: { errorMessage: "el precio no puede ir vacio" },
      isNumeric: { errorMessage: "el precio debe ser un numero " },
    },
    quantity: {
      exists: { errorMessage: "el cantidad del producto es obligatorio " },
      notEmpty: { errorMessage: "el cantidad del producto no puede ir vacio" },
      isInt: {
        errorMessage: "el cantidad del producto debe ser un numero ",
      },
    },
    cost: {
      exists: { errorMessage: "el costo del producto el obligatorio " },
      notEmpty: { errorMessage: "el  costo del producto no puede ir vacio" },
      isNumeric: { errorMessage: "el  costo del producto debe ser un numero " },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreateProductos };
