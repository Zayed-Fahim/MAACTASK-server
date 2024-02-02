const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const portUserRoute = require("./routes/register.route");
const getUserRoute = require("./routes/login.route");

app.use("/api/v1/users/register", portUserRoute);
app.use("/api/v1/users/login", getUserRoute);

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

module.exports = app;
