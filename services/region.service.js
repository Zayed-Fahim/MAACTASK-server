const Region = require("../models/Region");

exports.postRegionService = async (data) => {
  const region = await Region.create(data);
  return region;
};

exports.getRegionsService = async () => {
  const result = await Region.find({});
  return result;
};
