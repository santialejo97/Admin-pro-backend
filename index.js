const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/db");

// Crear el servidor de express
const app = express();

// Credenciales DB y connect
// angulaH_user , cPDkPyeNpuBN7O1Z
dbConnection();

// Cors
app.use(cors());

// Rutas
app.get("/", (req, res) => {
  res.status(400).json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto:" + process.env.PORT);
});
