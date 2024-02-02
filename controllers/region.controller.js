const Region = require("../models/Region");
const {
  postRegionService,
  getRegionsService,
} = require("../services/region.service");

exports.postRegion = async (req, res, next) => {
  try {
    const { region } = req.body;
    const alreadyExists = await Region.exists({ region });
    if (alreadyExists)
      return res
        .status(509)
        .json({ status: "Conflict", message: "Already exists" });
    const result = await postRegionService(req.body);
    res.status(200).json({ status: "Success", message: "Region Added!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getRegions = async (req, res, next) => {
  try {
    const result = await getRegionsService();
    res
      .status(200)
      .json({
        status: "Success",
        message: "All Regions data here! ",
        payload: result,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};
