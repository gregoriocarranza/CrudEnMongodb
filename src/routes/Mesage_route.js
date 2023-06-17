const express = require("express");
require("dotenv").config();
const MesageServices = require("../services/Message_services");

class Mesage_route {
  constructor(app) {
    this.app = app;
    this.Router = express.Router();
    this.app.use("/api/messages", this.Router);
    this.container = new MesageServices();
    this.Router.get("/", this.Get_all_messages);
    this.Router.post("/", this.Post_messages);
    this.Router.get("/:uuid", this.Get_By_Uuid);
    this.Router.put("/", this.UpdateByUuid);
    this.Router.delete("/:uuid", this.Delete_By_Uuid);
  }

  Get_all_messages = async (req, res) => {
    console.log("Trayendo todos los mensajes");
    let resp = await this.container.getall();
    res.status(202).send(resp);
  };

  Post_messages = async (req, res) => {
    console.log("posteado el mensaje");
    let resp = await this.container.save(req.body);
    res.status(202).send(resp);
  };

  Get_By_Uuid = async (req, res) => {
    const params = req.params.uuid;
    let resp = await this.container.getByUuid(params);
    res.status(202).send(resp);
  };
  Delete_By_Uuid = async (req, res) => {
    const params = req.params.uuid;
    let resp = await this.container.deleteByUuid(params);
    res.status(202).send(resp);
  };

  UpdateByUuid = async (req, res) => {
    let resp = await this.container.updateByUuid(req.body);
    res.status(202).send(resp);
  };
}

module.exports = Mesage_route;
