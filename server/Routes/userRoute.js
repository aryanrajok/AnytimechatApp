const express = require('express');
const router = express.Router();
const { registerUser , loginUser, findUser, getUsers} = require("../Controllers/userController");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUser);
router.get('/', getUsers);

router.get("/test", (req, res) => {
  res.send("Login route working!");
});




module.exports = router;
