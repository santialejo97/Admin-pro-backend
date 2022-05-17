const { request, response } = require("express");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

const validarJwt = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido ",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);

    req.uid = uid;
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado token expirado",
    });
  }

  next();
};

const validarRole = async (req = request, res = response, next) => {
  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(404).json({
        ok: false,
        msg: "Este usuario no es valido para realizar cambios",
      });
    }

    next();
  } catch (error) {
    throw Error(error);
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado revisar logs",
    });
  }
};

const validarRole_o_ID = async (req = request, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE" && uid !== id) {
      return res.status(404).json({
        ok: false,
        msg: "Este usuario no es valido para realizar cambios",
      });
    }

    next();
  } catch (error) {
    throw Error(error);
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado revisar logs",
    });
  }
};

module.exports = {
  validarJwt,
  validarRole,
  validarRole_o_ID,
};
