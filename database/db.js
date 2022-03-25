const db = require("mongoose");

const dbConnection = async () => {
  try {
    await db.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la Base de datos");
  }
};

module.exports = {
  dbConnection,
};
