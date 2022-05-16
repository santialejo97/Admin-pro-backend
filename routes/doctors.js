// /api/doctor
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida_campos");
const { validarJwt } = require("../middlewares/validar_token");
const {
  getDoctor,
  postDoctor,
  putDoctor,
  deleteDoctor,
  getMedico,
} = require("../controllers/doctor_controller");

const routerDoctor = Router();

routerDoctor.get("/", [validarJwt], getDoctor);
routerDoctor.post(
  "/create",
  [
    validarJwt,
    check("name", "El nombre es obligaorio").not().isEmpty(),
    check("hospital", "El id del hospital es obligatorio").not().isEmpty(),
    check("hospital", "El id del hospital tiene que ser valido").isMongoId(),
    validarCampos,
  ],
  postDoctor
);
routerDoctor.put(
  "/update:id",
  [
    validarJwt,
    check("name", "El nombre es obligatorio del Medico").not().isEmpty(),
    check("hospital", "El hospital es obligatorio").isMongoId(),
    validarCampos,
  ],
  putDoctor
);
routerDoctor.delete("/delete:id", [validarJwt], deleteDoctor);
routerDoctor.get("/medico:id", [validarJwt], getMedico);

module.exports = {
  routerDoctor,
};
