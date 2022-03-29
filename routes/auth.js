// /api/login
const { Router } = require("express");
const { authUser } = require("../controllers/auth_controller");
const { validarCampos } = require("../middlewares/valida_campos");
const { check } = require("express-validator");

const routerAuth = Router();

routerAuth.post(
  "/",
  [
    check("email", "El Email es obligatorio").not().isEmpty(),
    check("password", "El Password es obligatorio").not().isEmpty(),
    check("email", "No es un Email valido").isEmail(),
    validarCampos,
  ],
  authUser
);

module.exports = {
  routerAuth,
};
