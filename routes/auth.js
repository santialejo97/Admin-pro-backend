// /api/login
const { Router } = require("express");
const {
  authUser,
  authUserGoogle,
  renewToken,
} = require("../controllers/auth_controller");
const { validarCampos } = require("../middlewares/valida_campos");
const { check } = require("express-validator");
const { validarJwt } = require("../middlewares/validar_token");

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

routerAuth.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  authUserGoogle
);

routerAuth.get("/renew", [validarJwt], renewToken);

module.exports = {
  routerAuth,
};
