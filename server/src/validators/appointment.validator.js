import { check, checkSchema } from "express-validator"; //TODO <---
import { validateResult } from "../helpers/validateHelper.js";

const validateCreateAppointment = [
  checkSchema({
    date_start: {
      exists: { errorMessage: "el date_start del barbero el obligatorio " },
      notEmpty: { errorMessage: "no date_start ir vacio" },
    },
    date_end: {
      exists: { errorMessage: "el date_end del servicio el obligatorio " },
      notEmpty: { errorMessage: "el date_end no puede ir vacio" },
    },
    total: {
      exists: { errorMessage: "el total del servicio el obligatorio " },
      notEmpty: { errorMessage: "el total no puede ir vacio" },
    },
    services: {
      exists: { errorMessage: "el precio del servicio el obligatorio " },
      notEmpty: { errorMessage: "services no puede ir vacio" },
    },
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { validateCreateAppointment };
