const express = require("express");
const { getAreas, postArea } = require("../controllers/area.controller");
const router = express.Router();

router.route("/").get(getAreas).post(postArea);

module.exports = router;
