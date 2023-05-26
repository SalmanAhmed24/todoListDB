const userModel = require("../Models/userModel");
const addNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let findUserByEmail;
  try {
    findUserByEmail = await userModel.findOne({ email: email });
  } catch (error) {
    res.json({ message: "Error occured while searching user", error: true });
    return next(error);
  }
  if (findUserByEmail) {
    res.json({ message: "User with this email exists already", error: true });
  } else {
    const createdUser = new userModel({
      name,
      email,
      password,
      tasks: [],
    });
    try {
      await createdUser.save();
    } catch (error) {
      res.json({ message: "Error occured while creating user", error: true });
      return next(error);
    }
    res.json({ user: createdUser.toObject({ getters: true }), error: false });
  }
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let findUser;
  try {
    findUser = await userModel.findOne({ email: email, password: password });
  } catch (error) {
    res.json({
      message: "User not found please check your credentials",
      error: true,
    });
    return next(error);
  }
  if (findUser && findUser.email == email && findUser.password == password) {
    const userSpec = findUser.toObject({ getters: true });
    res.json({
      message: "Login successful",
      error: false,
      user: {
        email: userSpec.email,
        name: userSpec.name,
        id: userSpec.id,
      },
    });
  } else {
    res.json({
      message:
        "User not found please check your credentials or Signup if you have not made an account yet",
      error: true,
    });
  }
};
exports.addNewUser = addNewUser;
exports.loginUser = loginUser;
