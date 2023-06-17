const express = require("express");
// const config = require("../database/sql/config.js");
const mongoose = require("mongoose");
const { Server: HttpServer } = require("http");

const MessegeRoute = require("./routes/Mesage_route.js");
require("dotenv").config();

const app = express();
const server = new HttpServer(app);

const PORT = process.env.PORT || 3005;
const MongoUrl = process.env.MONGO;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req,res) => {
  console.log("inicio");
  res.send("HOLA")
});

const messegeRoute = new MessegeRoute(app);

mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Conexion exitosa a mongodb");
  server.listen(PORT, () => {
    console.log("Escuchando al puerto numero " + PORT);
  });
});

connection.on("Error", (err) => {
  console.log("Error al conectar a mongodb :", err.message);
});
