const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../Controllers/chatControllers");

const router = express.Router();

router.post("/", createChat);

router.get("/find/:firstId/:secondId", findChat);

router.get("/:userId", findUserChats);

module.exports = router;
