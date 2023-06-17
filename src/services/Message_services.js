const config = require("../../database/sql/dbconfi");
const knex = require("knex")(config);

const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const mesageModel = require("../../database/mognodb/MessageModel");

class Message_services {
  constructor(DirFile) {}

  async getall() {
    try {
      return new Promise(async (resolve, reject) => {
        resolve(await mesageModel.find({}));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getByUuid(uuid) {
    try {
      return new Promise(async (resolve, reject) => {
        resolve(await mesageModel.find({ messageUUID: uuid }));
      });
    } catch (error) {
      console.log(error);
    }
  }
  async save(obj) {
    try {
      return new Promise((resolve, reject) => {
        console.log(obj);
        const messagetopost = new mesageModel({
          messageUUID: uuidv4(),
          userUUID: obj.userUUID,
          message: obj.message,
          date: new Date().toDateString(),
        });
        messagetopost.save().then((doc) => {
          console.log(
            "Dato insertado correctamente ",
            doc._id.toString().split(" ")
          );
          resolve(doc);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteByUuid(uuid) {
    try {
      return new Promise(async (resolve, reject) => {
        resolve(await mesageModel.findOneAndDelete({ messageUUID: uuid }));
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updateByUuid(obj) {
    try {
      return new Promise(async (resolve, reject) => {
        resolve(await mesageModel.findOneAndUpdate({ messageUUID: obj.uuid },{message:obj.message}));
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Message_services;
