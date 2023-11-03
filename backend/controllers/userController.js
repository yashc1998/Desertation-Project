const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const User = require("../models/userModel");

// @desc    Register new user
// @router  /api/user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password, empId, mobileNo } = req.body;
  //console.log(req.body);
  try {
    //see if user exists
    let user = await User.findOne({
      email: email,
    });

    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    } else {
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        password,
        empId,
        mobileNo,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 2419200,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Login user
// @router  /api/user/login
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  //console.log(req.body);
  try {
    //see if user exists
    let user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = { user: { id: user.id } };

        jwt.sign(
          payload,
          jwtSecret,
          {
            expiresIn: 2419200,
          },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ token });
            }
          }
        );
      } else {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get user data
// @router  /api/user/me
const getUserData = (req, res) => {
  res.json({ message: "get user" });
};

module.exports = { registerUser, loginUser, getUserData };
