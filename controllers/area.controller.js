const Area = require("../models/Area");
const {
  postAreaService,
  getAreasService,
} = require("../services/area.service");

exports.postArea = async (req, res, next) => {
  try {
    const { area, region } = req.body;
    const alreadyExists = await Area.exists({
      $and: [{ area: area }, { region: region }],
    });
    if (alreadyExists)
      return res
        .status(509)
        .json({ status: "Conflict", message: "Already exists" });
    const result = await postAreaService(req.body);
    res.status(200).json({ status: "Success", message: "Area Added!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getAreas = async (req, res, next) => {
  try {
    const result = await getAreasService();
    res
      .status(200)
      .json({ status: "Success", message: "All Area data here!", payload: result });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};
