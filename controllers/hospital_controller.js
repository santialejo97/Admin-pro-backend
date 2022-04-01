const { request, response } = require("express");
const Hospital = require("../models/hospital");
const Usuario = require("../models/user");

const getHospital = async (req = request, res = response) => {
  try {
    const hospitales = await Hospital.find().populate("user", "name img");

    res.status(200).json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... Revisar logs",
    });
    throw Error(error);
  }
};

const postHospital = async (req = request, res = response) => {
  console.log(req.uid);
  const hospital = new Hospital({ user: req.uid, ...req.body });
  try {
    const hospitalDB = await hospital.save();

    res.status(200).json({
      ok: true,
      msg: "Creacion de hospital correcta",
      hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
    throw Error(error);
  }
};

const putHospital = async (req = request, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  console.log(id);
  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(401).json({
        ok: false,
        msg: "este hospital no esta registrado",
      });
    }
    const camposHospita = {
      ...req.body,
      user: uid,
    };
    const hospital = await Hospital.findByIdAndUpdate(id, camposHospita, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      msg: "Actualizacion Correcta",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Sucedio un error inesperado ... revisar logs",
    });
    throw Error(error);
  }
};

const deleteHospital = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(401).json({
        ok: false,
        msg: "No existe este hospital...",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Eliminado...",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Salio un error ",
    });
    throw new Error(error);
  }
};

module.exports = {
  getHospital,
  postHospital,
  putHospital,
  deleteHospital,
};
