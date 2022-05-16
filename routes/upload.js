const { Router } = require("express");
const {
  getUploadColeccion,
  putUploadColeccion,
} = require("../controllers/upload_controller");
const fileUpload = require("express-fileupload");

const { validarJwt } = require("../middlewares/validar_token");

const routerUpload = Router();

routerUpload.use(fileUpload());

routerUpload.put("/:model/:id", [validarJwt], putUploadColeccion);
routerUpload.get("/:model/:img", getUploadColeccion);

module.exports = {
  routerUpload,
};
