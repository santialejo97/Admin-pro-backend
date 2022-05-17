const Usuario = require("../models/user");
const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google_verify");
const { getMenuFrontend } = require("../helpers/menu_frontend");

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
      menu: getMenuFrontend(userDB.role),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado validar logs ",
    });
    throw Error(error);
  }
};

const authUserGoogle = async (req = request, res = response) => {
  const { token } = req.body;

  try {
    const { name, email, picture } = await googleVerify(token);
    const userDB = await Usuario.findOne({ email });
    let user;
    if (!userDB) {
      user = new Usuario({
        name,
        email,
        password: "shdasjdhja",
        img: picture,
        google: true,
      });
    } else {
      // Existe el usuario
      user = userDB;
      user.google = true;
    }

    await user.save();

    // TODO: Generar Token
    const tokenBack = await generarJwt(user._id, name);

    res.status(200).json({
      ok: true,
      msg: "Usuario valido Ingresando...",
      tokenBack,
      menu: getMenuFrontend(userDB.role),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado validar logs ",
    });
    throw Error(error);
  }
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;

  console.log(uid);

  try {
    const userDB = await Usuario.findById(uid);

    if (!userDB) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no existe ",
      });
    }

    // TODO: Generar Token
    const token = await generarJwt(uid, userDB.name);

    res.status(200).json({
      ok: true,
      token,
      user: userDB,
      menu: getMenuFrontend(userDB.role),
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
  authUserGoogle,
  renewToken,
};
