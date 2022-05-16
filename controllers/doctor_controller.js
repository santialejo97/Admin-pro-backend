const { request, response } = require("express");
const Medico = require("../models/doctor");
const Hospital = require("../models/hospital");

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
  const uid = req.uid;
  const id = req.params.id;
  const idh = req.body.hospital;

  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(401).json({
        ok: false,
        msg: "Este medico no existe",
      });
    }

    const hospitalDB = await Hospital.findById(idh);
    if (!hospitalDB) {
      return res.status(401).json({
        ok: false,
        msg: "Este hospital no existe",
      });
    }

    const camposMedico = {
      ...req.body,
      user: uid,
    };

    const medico = await Medico.findByIdAndUpdate(id, camposMedico, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente ",
      medico,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
    throw Error(error);
  }
};
const deleteDoctor = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(401).json({
        ok: false,
        msg: "Este medico no existe",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Eliminacion correcta",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
  }
};

const getMedico = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id)
      .populate("user", "name img")
      .populate("hospital", "name img");

    if (!medico) {
      return res.status(401).json({
        ok: false,
        msg: "NO se encontro un medico con ese id",
      });
    }

    res.status(200).json({
      ok: true,
      medico,
      msg: "Medico encontrado",
    });
  } catch (error) {
    throw Error(error);
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
  }
};

module.exports = {
  getDoctor,
  postDoctor,
  putDoctor,
  deleteDoctor,
  getMedico,
};
