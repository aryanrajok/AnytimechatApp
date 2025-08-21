const messageModel = require("../Models/messageModel");
const mongoose = require("mongoose");
// createMessage
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // ✅ Fix
  }
};

// getMessage
const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const message = await messageModel.find({ chatId });
    res.status(200).json(message); // ✅ Fix
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // ✅ Fix
  }
};

module.exports = { createMessage, getMessages };
