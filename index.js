const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const { dbConnection } = require("./database/db");
const { router } = require("./routes/users");
const { routerAuth } = require("./routes/auth");
const { routerHospitals } = require("./routes/hospitals");
const { routerDoctor } = require("./routes/doctors");
const { routerSearch } = require("./routes/search");
const { routerUpload } = require("./routes/upload");

// Crear el servidor de express
const app = express();

// Credenciales DB y connect
// angulaH_user , cPDkPyeNpuBN7O1Z
dbConnection();

// Directorio publico
app.use(express.static("public"));

// Cors
app.use(cors());

// Lectura y Parceo del Body
app.use(express.json());

// Rutas
app.use("/api/users", router);
app.use("/api/auth", routerAuth);
app.use("/api/hospitals", routerHospitals);
app.use("/api/doctor", routerDoctor);
app.use("/api/search", routerSearch);
app.use("/api/upload", routerUpload);

// ultimo
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto:" + process.env.PORT);
});
