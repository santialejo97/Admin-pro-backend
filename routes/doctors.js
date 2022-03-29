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
} = require("../controllers/doctor_controller");

const routerDoctor = Router();

routerDoctor.get("/", [], getDoctor);
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
routerDoctor.put("/update:id", [], putDoctor);
routerDoctor.delete("/delete:id", [], deleteDoctor);

module.exports = {
  routerDoctor,
};
