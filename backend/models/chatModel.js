const mongoose = require("mongoose");
const userModel = require("./user")
const messageModel = require("./messageModel")

const chatModel = mongoose.Schema(
  {
    chatName: { type: String },
    // isGroupChat: { type: Boolean },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: messageModel,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
  },
  {
    timeStamp: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
