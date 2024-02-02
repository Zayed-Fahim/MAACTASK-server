const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.postUserService = async (data) => {
  const { password, cPassword, ...otherData } = data;
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newData = {
      ...otherData,
      password: hashedPassword,
      cPassword: hashedPassword,
    };
    const result = await User.create(newData);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
