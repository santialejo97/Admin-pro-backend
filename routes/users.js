// /api/users
const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUser,
} = require("../controllers/users_controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/valida_campos");
const { validarJwt } = require("../middlewares/validar_token");

const router = Router();

router.get("/", [validarJwt], getUsers);

router.post(
  "/create",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El Email es obligatorio").not().isEmpty(),
    check("email", "No es un Email valido").isEmail(),
    check("password", "El Password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postUsers
);
router.put(
  "/update:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El Email es obligatorio").not().isEmpty(),
    check("role", "El role es obligatorio").not().isEmpty(),
    check("email", "No es un Email valido").isEmail(),
    validarCampos,
    validarJwt,
  ],
  putUsers
);
router.delete("/delete:id", [validarJwt], deleteUser);

module.exports = {
  router,
};
