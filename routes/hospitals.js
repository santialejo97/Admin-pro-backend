// /api/hospitals
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida_campos");
const { validarJwt } = require("../middlewares/validar_token");
const {
  getHospital,
  postHospital,
  putHospital,
  deleteHospital,
} = require("../controllers/hospital_controller");

const routerHospitals = Router();

// Rutas
routerHospitals.get("/", [], getHospital);
routerHospitals.post(
  "/create",
  [
    validarJwt,
    check("name", "El nombre el obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postHospital
);
routerHospitals.put(
  "/update:id",
  [
    validarJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  putHospital
);
routerHospitals.delete("/delete:id", [validarJwt], deleteHospital);

module.exports = {
  routerHospitals,
};
