const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const error = require("./middleware/error");
const employees = require("./routes/employees");
// const logger = require("./start/logging");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!config.get("db") || !config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey or db is not defined.");
}

mongoose
  .connect(config.get("db"))
  .then(() => console.log("connected hrm db"))
  .catch(() => console.log("error"));

app.use("/api/employees", employees);
// app.use(error);

const port = 3000;

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});