const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messageUUID: String,
  userUUID: String,
  message: String,
  date: String,
});

const MessageModel = mongoose.model("Mensaje", MessageSchema);

module.exports = MessageModel;
