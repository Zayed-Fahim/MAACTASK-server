const express = require("express");
const { getRegions, postRegion } = require("../controllers/region.controller");
const router = express.Router();

router.route("/").get(getRegions).post(postRegion);

module.exports = router;
