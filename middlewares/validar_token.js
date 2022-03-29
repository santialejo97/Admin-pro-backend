const { request, response } = require("express");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

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
      msg: "Sucedio un error inesperado",
    });
  }

  next();
};

module.exports = {
  validarJwt,
};
