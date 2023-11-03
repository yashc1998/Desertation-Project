const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).not().isEmpty(),
    check("empId", "Employee Id is required").isNumeric().not().isEmpty(),
    check("mobileNo", "Mobile Number is required").isNumeric().not().isEmpty(),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).exists(),
  ],
  loginUser
);

router.get("/me", getUserData);

module.exports = router;
