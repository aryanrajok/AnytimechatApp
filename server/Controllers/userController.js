const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Please provide all the required fields",
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: true,
        message: "User already exists with given email",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Invalid email address",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error: true,
        message: "Password must be strong (min 8 chars, 1 upper, 1 symbol, etc.)",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id);

    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong. Please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong. Please try again.",
    });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Failed to fetch users" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
};
