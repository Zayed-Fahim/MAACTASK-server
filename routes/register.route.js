const express = require("express");
const { postUser } = require("../controllers/register.controller");
const router = express.Router();

router.route("/").post(postUser);

module.exports = router;
