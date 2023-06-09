const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const getUser = require("./../middleware/getUser");

const SECRET_KEY = `Dermanbuster123`;

const router = express.Router();

//Creating new User for Application
router.post(
  "/createuser",
  [
    body("email", "Enter valid Email").isEmail(),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let type = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ type, error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new Error(`Email already Exists`);
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, SECRET_KEY);
      type = true;
      res.status(200).json({ type, authToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ type, error: error.message });
    }
  }
);

//Authenticate during login
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password Cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let type = false;

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ type, error: "Kindly Enter Correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ type, error: "Kindly Enter Correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, SECRET_KEY);
      type = "true";
      res.status(200).json({ type, authToken });
    } catch (error) {
      res.status(500).json({ type, error: "Some Error Occurred" });
    }
  }
);

//Get User Details
router.post("/getUser", getUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router;
