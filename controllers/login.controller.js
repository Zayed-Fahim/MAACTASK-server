const { createJSONWebToken } = require("../hooks/jsonWebToken");
const User = require("../models/User");
const {
  getUsersService,
  getUserByEmailService,
} = require("../services/login.service");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await getUsersService();
    res.status(200).json({
      status: "Success",
      message: "Here are all registered user!",
      payload: result,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};
exports.getUserByEmail = async (req, res, next) => {
  try {
    const result = await getUserByEmailService(req.body);
    const newUserData = {
      _id: result._id,
      email: result.email,
      phone: result.phone,
      id: result.id,
      name: result.name,
      role: result.role,
      terms: result.terms,
    };
    if (!result) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Invalid credentials! Please check your email or password.",
      });
    } else {
      const token = await createJSONWebToken(
        { email: req.body.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        status: "Success",
        message: "Successfully Logged in!",
        payload: { newUserData, token: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
      error: error.message,
    });
    next(error);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const newUserData = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      id: user.id,
      name: user.name,
      role: user.role,
      terms: user.terms,
    };
    res.status(200).json({
      status: "Success",
      message: "You have access to this protected route.",
      payload: { newUserData },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "You don't have access.",
      error: error.message,
    });
  }
};
