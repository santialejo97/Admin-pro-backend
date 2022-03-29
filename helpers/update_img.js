const fs = require("fs");
const Usuario = require("../models/user");
const Medico = require("../models/doctor");
const Hospital = require("../models/hospital");

const deleteImg = (model, img) => {
  const imgOld = `./uploads/${model}/${img}`;
  if (fs.existsSync(imgOld)) {
    //   borrar la imagen
    fs.unlinkSync(imgOld);
  }
};

const updateImg = async (id, nameFile, model) => {
  switch (model) {
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      const imgH = hospital.img;
      deleteImg(model, imgH);
      hospital.img = nameFile;
      await hospital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }
      const imgU = usuario.img;
      deleteImg(model, imgU);
      usuario.img = nameFile;
      await usuario.save();
      return true;

      break;
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }
      const imgM = medico.img;
      deleteImg(model, imgM);
      medico.img = nameFile;
      await medico.save();
      return true;

      break;

    default:
      return false;
      break;
  }
};

module.exports = {
  updateImg,
};
