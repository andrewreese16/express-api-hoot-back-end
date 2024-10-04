const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signin", async function (req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invaild username or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/signup", async function (req, res) {
  try {
    const isUserInDB = await UserModel.findOne({ username: req.body.username });
    if (isUserInDB) {
      return res.status(400).json({ error: "Username already taken" });
    }
    req.body.hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userDoc = await UserModel.create(req.body);
    console.log(userDoc, "<-- userDoc");

    const token = jwt.sign({ user: userDoc }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
