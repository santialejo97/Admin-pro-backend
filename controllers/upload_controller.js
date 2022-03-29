const { request, response } = require("express");

const fs = require("fs");
const Usuario = require("../models/user");
const Medico = require("../models/doctor");
const Hospital = require("../models/hospital");
const { v4: uuidv4 } = require("uuid");
const { updateImg } = require("../helpers/update_img");
const path = require("path");
const { dirname } = require("path");

const putUploadColeccion = async (req = request, res = response) => {
  const id = req.params.id;
  const model = req.params.model;

  try {
    const tiposValidos = ["hospitales", "usuarios", "medicos"];
    if (!tiposValidos.includes(model)) {
      return res.status(400).json({
        ok: false,
        msg: "No coinciden el parametro del servidor Ejemplo:(usuarios/medicos/hospitales)",
      });
    }
    //   Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: " no existe ningun archivo",
      });
    }
    //   Procesar una imagen

    const file = req.files.imagen;
    const cutName = file.name.split(".");
    const extension = cutName[cutName.length - 1];

    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extension)) {
      return res.status(400).json({
        ok: false,
        msg: "No es una extension valida Ejemplo:(png/jpg/jpeg/gif)",
      });
    }

    //   Generar el nombre del archivo
    const nameFile = `${uuidv4()}.${extension}`;
    const uploadPath = `./uploads/${model}/${nameFile}`;

    //   Mover Archivo
    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ ok: false, msg: "Error al mover la imagen" });
      }

      // Actualizar la BD
      updateImg(id, nameFile, model);

      res.status(200).json({
        ok: true,
        nameFile,
        msg: "Archivo subido",
      });
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Surgio un error inesperado... revisar logs",
    });
    throw Error(error);
  }
};

const getUploadColeccion = async (req = request, res = response) => {
  const img = req.params.img;
  const model = req.params.model;
  const pathImg = path.join(__dirname, `../uploads/${model}/${img}`);

  try {
    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg, (err) => {
        console.log(err);
      });
    } else {
      const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathImg, (err) => {
        console.log(err);
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Surgio un error inesperado... revisar logs",
    });
    throw Error(error);
  }
};
module.exports = {
  getUploadColeccion,
  putUploadColeccion,
};
