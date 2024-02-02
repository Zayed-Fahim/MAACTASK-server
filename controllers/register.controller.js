const User = require("../models/User");
const { postUserService } = require("../services/register.service");

exports.postUser = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const alreadyExists = await User.exists({
      $or: [{ id: id }, { email: email }],
    });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Account already exists!" });
    }
    const result = await postUserService(req.body);
    res
      .status(200)
      .json({ status: "Success", message: "Account created successfully!" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};
