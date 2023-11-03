const { validationResult } = require("express-validator");
const axios = require("axios");
const { getVideoDurationInSeconds } = require("get-video-duration");
const path = require('path')

const Course = require("../models/courseModel");

const getCourses = async (req, res) => {
  // console.log(req.params.searchString + " " + req.params.searchString.length);
  let pageSize = 8;
  let numberOfRows, numberOfPages;
  let currentRequestedPage = req.query.page || 1;
  let numberPerPage = parseInt(pageSize, 10) || 1;
  let page = parseInt(currentRequestedPage, 10) || 1;
  let skip = (page - 1) * numberPerPage;
  let limit = `${skip} , ${numberPerPage}`;

  let courses, allCoursesCount;
  try {
    if (req.params.searchString) {
      courses = await Course.find({
        $or: [
          {
            title: {
              $regex: ".*" + req.params.searchString + ".*",
              $options: "i",
            },
          },
          {
            brief_summary: {
              $regex: ".*" + req.params.searchString + ".*",
              $options: "i",
            },
          },
          {
            description: {
              $regex: ".*" + req.params.searchString + ".*",
              $options: "i",
            },
          },
          {
            tags: {
              $regex: ".*" + req.params.searchString + ".*",
              $options: "i",
            },
          },
        ],
      });
    } else {
      courses = await Course.find().skip(skip).limit(pageSize);
      allCoursesCount = await Course.count();
    }

    if (courses.length > 0) {
      return res.status(200).json({ courses, allCoursesCount });
    } else {
      return res.status(404).json({
        errors: [{ msg: "No Course found with selected search parameters" }],
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get Course
// @route   GET /api/courses
const getCourse = async (req, res) => {
  try {
    console.log(req.params.id);
    const course = await Course.findOne({ _id: req.params.id });

    if (course) {
      return res.status(200).json(course);
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "Requested Course not found!!" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Set Course
// @route   POST /api/courses
const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, brief_summary, description, instructor, courseImage, tags } =
    req.body;

  let randomCourseImage =
    "https://chennai.vit.ac.in/wp-content/uploads/2021/06/Full-Stack-web-development-course-Computer-Science-Certification-Courses.jpg";

  try {
    // const imageSearchUrl = 'https://pixabay.com/api/'
    if (!courseImage) {
      const imageSearchUrl = encodeURI(
        "https://source.unsplash.com/random?" + title
      );

      console.log("Image URL: " + imageSearchUrl);
      // const res = await axios.get(imageSearchUrl, {params: {
      //   key: API_KEY,
      //   q: title,
      //   image_type: 'photo'
      // }});
      const response = await axios.get(imageSearchUrl);
      console.log(response.request.res.responseUrl);
      if (response) {
        randomCourseImage = response.request.res.responseUrl;
      }
    }

    const course = new Course({
      title: title,
      brief_summary: brief_summary,
      description: description,
      instructor: instructor,
      courseImage: courseImage ? courseImage : randomCourseImage,
      tags: tags,
    });
    let result = await course.save();
    if (result) {
      res
        .status(200)
        .json({ msg: "Course created successfully", _id: result._id });
    } else {
      throw error;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Update Course
// @route   PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Requested Course not found!!" }] });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedCourse);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// @desc    Delete Course
// @route   DELETE /api/courses
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  const deletedCourse = await Course.deleteOne(course);

  res.json(req.params.id);
};

// @desc    Upload Videos
// @route   PUT /api/courses/:id/uploadvideos
const updateCourseVideos = async (req, res) => {
  console.log("Upload api called");
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Requested Course not found!!" }] });
    }
    let videos = course.videos;

    console.log(req.files);
    if (
      Array.isArray(req.files.courseVideos) &&
      req.files.courseVideos.length > 0
    ) {
      for (let video of req.files.courseVideos) {
        let videoLengthInSeconds = await getVideoDurationInSeconds(video.path);
        console.log(videoLengthInSeconds);
        videos.push({
          title: video.originalname,
          length: videoLengthInSeconds,
          url: video.path,
        });
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      { ...course, videos: videos },
      {
        new: true,
      }
    );

    res.json(updatedCourse);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseVideos,
};
