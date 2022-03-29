const Usuario = require("../models/user");
const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const authUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await Usuario.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña o email incorrectos ",
      });
    }
    //   Verificar Contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña o email incorrecto ",
      });
    }

    // TODO: Generar Token
    const token = await generarJwt(userDB._id, userDB.name);

    res.status(200).json({
      ok: true,
      msg: "Usuario valido Ingresando...",
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado validar logs ",
    });
    throw Error(error);
  }
};

module.exports = {
  authUser,
};
