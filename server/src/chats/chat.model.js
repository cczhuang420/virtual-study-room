const { Schema, model } = require("mongoose");

/**
 * The chat schema is used to store the latest chat.
 */

const ChatSchema = new Schema({
  sender: {
    require: true,
    type: String,
  },
  receiver: {
    require: true,
    type: String,
  },
  timestamp: {
    require: true,
    type: Number,
  },
  message: {
    require: true,
    type: String,
  },
});

const ChatModel = model("chat", ChatSchema);

module.exports = ChatModel;
