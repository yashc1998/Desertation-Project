const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseVideos,
} = require("../controllers/courseController.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"_"+ file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

router.get("/all/:searchString", getCourses);
router.get("/all", getCourses);
router.get("/:id", getCourse);

router.post(
  "/",
  [
    check("instructor", "Need an instructor to create the course")
      .not()
      .isEmpty(),
    check("title", "Title cannot be empty").not().isEmpty(),
    check("brief_summary", "A course needs to have a brief summary")
      .not()
      .isEmpty(),
    check("description", "A course needs to have a description")
      .not()
      .isEmpty(),
  ],
  auth,
  createCourse
);

router.put("/:id", auth, updateCourse);
router.put(
  "/:id/uploadvideos",
  auth,
  upload.fields([
    {
      name: "courseVideos",
      maxCount: 50,
    },
  ]),
  updateCourseVideos
);

router.delete("/:id", auth, deleteCourse);

module.exports = router;
