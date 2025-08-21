const chatModel = require("../Models/chatModel");

// Create chat between two users
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId.toString(), secondId.toString()], // 👈 Make sure these are string
    });

    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};


// Get all chats where user is a member
const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] }, // ✅ $in operator sahi
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

// Get chat between two specific users
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId.toString(), secondId.toString()] }, // 👈 convert to string
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log("Error in findChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { createChat, findUserChats, findChat };
