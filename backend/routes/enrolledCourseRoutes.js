const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { getUserCourses, enrollUserToCourse, checkIfUserEnrolledInCourse } = require("../controllers/enrolledCourseController");

router.get("/", auth, getUserCourses);
router.get("/check", auth, checkIfUserEnrolledInCourse);
router.post("/", auth, enrollUserToCourse);

module.exports = router;
