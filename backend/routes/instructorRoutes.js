const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  registerInstructor,
  loginInstructor,
  getInstructorData,
  getInstructors,
  updateApprovalStatus,
} = require("../controllers/instructorController");
const auth = require("../middleware/auth");


router.post("/updateapproval", updateApprovalStatus);

router.post(
  "/",
  [
    check("name", "Last Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .not()
      .isEmpty(),
    check("empId", "Employee Id is required").isNumeric().not().isEmpty(),
    check("mobileNo", "Mobile Number is required").isNumeric().not().isEmpty(),
  ],
  registerInstructor
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
  loginInstructor
);
router.get("/all", getInstructors);

router.get("/:id", getInstructorData);

module.exports = router;
