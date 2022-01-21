// DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");
const transactionsController = require("./controllers/transactionsController.js");

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionsController);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to My Budgeting App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
