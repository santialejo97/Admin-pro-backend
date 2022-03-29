const Usuario = require("../models/user");
const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const getUsers = async (req = request, res = response) => {
  const users = await Usuario.find({}, "name email role google");
  res.status(200).json({
    ok: true,
    users,
    uid: req.uid,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, password, email } = req.body;

  try {
    const duplicado = await Usuario.findOne({ email });

    if (duplicado) {
      return res.status(406).json({
        ok: false,
        msg: "Usuario ya existe",
      });
    }

    const user = new Usuario(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    const userDB = await user.save();

    // Generacion de token
    const token = await generarJwt(userDB._id, name);

    res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado... revisar logs",
    });
  }
};

const putUsers = async (req = request, res = response) => {
  // TODO: Validar Token y infromacion de registro
  const uid = req.params.id;
  const { name, email, role } = req.body;

  try {
    const userDB = await Usuario.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "no existe este usuario",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (userDB.email != email) {
      if (await Usuario.findOne({ email })) {
        return res.status(401).json({
          ok: false,
          msg: "Este Correo ya se encuentra registrado",
        });
      }
    }

    campos.email = email;

    const userUpdate = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
      userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "El servidor no responde revisar logs",
    });
    throw Error(error);
  }
};

const deleteUser = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await Usuario.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    await Usuario.findOneAndDelete(uid);

    res.status(200).json({
      ok: true,
      uid,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revisar logs",
    });
    throw Error(error);
  }
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUser,
};
