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
  res.status(200).json({
    ok: true,
    msg: "putHospital",
  });
};

const deleteHospital = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "deleteHospital",
  });
};

module.exports = {
  getHospital,
  postHospital,
  putHospital,
  deleteHospital,
};
