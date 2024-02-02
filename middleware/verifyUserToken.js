const jwt = require("jsonwebtoken");

exports.verifyUserToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in.",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token",
      error: error.message,
    });
  }
};
