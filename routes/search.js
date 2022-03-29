const { Router } = require("express");
const {
  getSearch,
  getSearchColeccion,
} = require("../controllers/search_controller");
const { validarJwt } = require("../middlewares/validar_token");

const routerSearch = Router();

routerSearch.get("/:search", [validarJwt], getSearch);
routerSearch.get("/collecion/:model/:search", [validarJwt], getSearchColeccion);

module.exports = {
  routerSearch,
};
