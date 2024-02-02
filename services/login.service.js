const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUsersService = async () => {
  const result = await User.find({});
  return result;
};

exports.getUserByEmailService = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return null;
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (isPasswordMatch) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
