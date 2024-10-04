const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/sign-token", function (req, res) {
  const user = {
    _id: 1,
    username: "Lindsey",
  };

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });
});

router.post("/verify-token", function (req, res) {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token, "<-- token in the headers!");

const decoded = jwt.verify(token, process.env.JWT_SECRET)
console.log(decoded, '<-- decoded token')

  res.json({ token });
});

module.exports = router;
