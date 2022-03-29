const { request, response } = require("express");
const Usuario = require("../models/user");
const Medico = require("../models/doctor");
const Hospital = require("../models/hospital");

const getSearch = async (req = request, res = response) => {
  const parametro = req.params.search;
  const pattern = new RegExp(parametro, "i");

  try {
    const [users, doctors, hospitals] = await Promise.all([
      Usuario.find({ name: pattern }),
      Medico.find({ name: pattern }),
      Hospital.find({ name: pattern }),
    ]);

    res.status(200).json({
      ok: true,
      search: { users, doctors, hospitals },
      parametro,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Surgio un error inesperado... revisar logs",
    });
    throw Error(error);
  }
};

const getSearchColeccion = async (req = request, res = response) => {
  const parametro = req.params.search;
  const model = req.params.model;
  const pattern = new RegExp(parametro, "i");
  let data = [];

  try {
    switch (model) {
      case "usuarios":
        data = await Usuario.find({ name: pattern });
        break;
      case "hospitales":
        data = await Hospital.find({ name: pattern }).populate(
          "user",
          "name img"
        );
        break;
      case "medicos":
        data = await Medico.find({ name: pattern })
          .populate("user", "name img")
          .populate("hospital", "name img");
        break;

      default:
        return res.status(400).json({
          ok: false,
          msg: "esta mal ingresado Ejem:(usuarios/medicos/hospitales) ",
        });
        break;
    }

    res.status(200).json({
      ok: true,
      resultados: data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Surgio un error inesperado... revisar logs",
    });
    throw Error(error);
  }
};

module.exports = {
  getSearch,
  getSearchColeccion,
};
