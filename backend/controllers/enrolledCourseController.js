const enrolledCourse = require("../models/enrolledCourseModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

// @desc    Get Logged In User Courses
// @route   GET /api/usercourses
const getUserCourses = async (req, res) => {
  try {
    const user = req.user;
    const enrollments = await enrolledCourse.find({ user: user.id });
    const courseIds = enrollments.map((item) => item.course);
    const enrolledCourses = await Course.find().where("_id").in(courseIds);
    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Enroll Logged In User to a Course
// @route   POST /api/usercourses
const enrollUserToCourse = async (req, res) => {
  const {courseId} = req.body
  try {
    const user = req.user;
    const isCourseEnrolled = await enrolledCourse.findOne({ course: courseId });
    if(isCourseEnrolled){
      res.status(409).json({errors: [{msg: "User already enrolled in the course"}]})
      return;
    }

    const newEnrolledCourse = new enrolledCourse({ user: user.id, course: courseId })
    const result = await newEnrolledCourse.save()
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Check if a user has enrolled in the course
// @route   POST /api/usercourses/check
const checkIfUserEnrolledInCourse = async (req, res) => {
  const courseId = req.query.courseId
  console.log("COURSE_ID: ", courseId)
  console.log("USER_ID: ", req.user.id)
  try {
    const user = req.user;
    const isCourseEnrolled = await enrolledCourse.find({ course: courseId, user: user.id });
    if(isCourseEnrolled.length > 0){
      res.status(200).json({isCourseEnrolled: true})
      return;
    }
    res.status(200).json({isCourseEnrolled: false});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({errors: [{msg: "Server Error"}]});
  }
};

module.exports = { getUserCourses, enrollUserToCourse, checkIfUserEnrolledInCourse };
