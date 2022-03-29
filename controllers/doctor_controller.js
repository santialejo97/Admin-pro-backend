const { request, response } = require("express");
const Medico = require("../models/doctor");

const getDoctor = async (req = request, res = response) => {
  try {
    const medicos = await Medico.find()
      .populate("user", "name img")
      .populate("hospital", "name img");

    res.status(200).json({
      ok: true,
      medicos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Surgio un error inesperado ... revisar logs",
    });
  }
};
const postDoctor = async (req = request, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ user: uid, ...req.body });

  try {
    const doctorDB = await medico.save();

    res.status(200).json({
      ok: true,
      msg: "Medico creado correctamente ",
      doctorDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
  }
};
const putDoctor = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "putDoctor",
  });
};
const deleteDoctor = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "deleteDoctor",
  });
};

module.exports = {
  getDoctor,
  postDoctor,
  putDoctor,
  deleteDoctor,
};
