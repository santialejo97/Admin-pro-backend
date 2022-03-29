const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/db");
const { router } = require("./routes/users");
const { routerAuth } = require("./routes/auth");

// Crear el servidor de express
const app = express();

// Credenciales DB y connect
// angulaH_user , cPDkPyeNpuBN7O1Z
dbConnection();

// Cors
app.use(cors());

// Lectura y Parceo del Body
app.use(express.json());

// Rutas
app.use("/api/users", router);
app.use("/api/auth", routerAuth);

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto:" + process.env.PORT);
});
