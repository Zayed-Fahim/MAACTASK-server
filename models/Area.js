const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
