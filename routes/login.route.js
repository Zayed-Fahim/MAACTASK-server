const express = require("express");
const {
  getUsers,
  getUserByEmail,
  verifyUser,
} = require("../controllers/login.controller");
const { verifyUserToken } = require("../middleware/verifyUserToken");

const router = express.Router();

router.route("/").get(getUsers).post(getUserByEmail);
router.route("/verify").get(verifyUserToken, verifyUser);

module.exports = router;
