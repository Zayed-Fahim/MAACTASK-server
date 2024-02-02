const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Region = mongoose.model("Region", regionSchema);

module.exports = Region;
