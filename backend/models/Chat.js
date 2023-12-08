const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    patient:  {type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"},
    pharmacist:  {type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacist"},
    doctor:  {type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"},    
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;