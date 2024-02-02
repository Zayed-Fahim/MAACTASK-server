const Area = require("../models/Area");

exports.postAreaService = async (data) => {
  const area = await Area.create(data);
  return area;
};

exports.getAreasService = async () => {
  const result = await Area.find({});
  return result;
};
