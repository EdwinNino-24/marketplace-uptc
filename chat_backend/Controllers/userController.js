const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await userModel.findOne({ email });

    user = new userModel({ name, email });

    await user.save();

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await userModel.findOne({ email });


    const token = await createToken(user._id);
    const jsonData = { _id: user._id, name: user.name, email, token }; 
    const jsonParam = await encodeURIComponent(JSON.stringify(jsonData)); 
    res.json({ jsonParam:  jsonParam});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
