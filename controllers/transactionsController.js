const express = require("express");
const transactions = express.Router();
const transactionArray = require("../models/transaction.js");

// Custom Middleware
const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

// INDEX
transactions.get("/", (req, res) => {
  res.status(200).json(transactionArray);
});

// SHOW
transactions.get("/:arrayIndex", (req, res) => {
  if (transactionArray[req.params.arrayIndex]) {
    res.json(transactionArray[req.params.arrayIndex]);
  } else {
    res.redirect("/404");
  }
});

// UPDATE
transactions.put("/:arrayIndex", async (req, res) => {
  transactionArray[req.params.arrayIndex] = req.body;
  res.status(200).json(transactionArray[req.params.arrayIndex]);
});

// CREATE

transactions.post("/", validateURL, (req, res) => {
  const updatedArray = transactionArray.push(req.body);
  res.json(transactionArray[updatedArray - 1]);
});

// DELETE
transactions.delete("/:indexArray", (req, res) => {
  const deletedTransaction = transactionArray.splice(req.params.indexArray, 1);
  res.status(200).json(deletedTransaction);
});

module.exports = transactions;
