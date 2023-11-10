const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");

// @desc    Register new Instructor
// @router  /api/instructor
const registerInstructor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password, empId, mobileNo, instructorSkills } = req.body;
  //console.log(req.body);
  try {
    //see if instructor exists
    let instructor = await Instructor.findOne({
      email: email,
    });

    if (instructor) {
      res.status(400).json({ errors: [{ msg: "Instructor already exists" }] });
    } else {
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      instructor = new Instructor({
        name,
        email,
        password,
        empId,
        mobileNo,
        avatar,
        instructorSkills
      });

      const salt = await bcrypt.genSalt(10);
      instructor.password = await bcrypt.hash(password, salt);

      await instructor.save();

      const payload = { instructor: { id: instructor.id } };

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

// @desc    Login Instructor
// @router  /api/instructor/login
const loginInstructor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  //console.log(req.body);
  try {
    //see if instructor exists
    let instructor = await Instructor.findOne({
      email: email,
    });

    if (!instructor) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      let isMatch = await bcrypt.compare(password, instructor.password);
      if (isMatch) {
        const payload = { instructor: { id: instructor.id } };

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

// @desc    Get instructor data
// @router  /api/instructor/:id
const getInstructorData = async (req, res) => {
  try {
    console.log(req.params.id)
    const instructor = await Instructor.findOne({ _id: req.params.id });

    if (instructor) {
      return res.status(200).json(instructor);
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "Requested Instructor not found!!" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get instructor data
// @router  /api/instructor/all
const getInstructors = async (req, res) => {
  try {
    const instructor = await Instructor.find({ approved: false });

    if (instructor) {
      return res.status(200).json(instructor);
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "No Instructor left for approval" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    POST instructor data
// @router  /api/instructor/
const updateApprovalStatus = async (req, res) => {
  const {instructorId} = req.body
  console.log("INSIDE_INSTRUCTOR_APPROVAL", instructorId)
  try {
    const instructor = await Instructor.findById(instructorId);

    if (instructor) {
      if(await Instructor.findOneAndUpdate({_id: instructorId}, {approved: true}))
        return res.status(200).json(instructor);
      else
        return res.status(401).json({ errors: [{ msg: "Some error occured" }] });
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "No Instructor left for approval" }] });
    }


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    console.log(req.query.id)
    const courses = await Course.find({ instructor: req.query.id });

    if (courses) {
      return res.status(200).json(courses);
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "Requested courses not found!!" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerInstructor, loginInstructor, getInstructorData, getInstructors, updateApprovalStatus, getInstructorCourses };
