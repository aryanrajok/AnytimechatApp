const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
