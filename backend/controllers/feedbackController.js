const { validationResult } = require("express-validator");
const Feedback = require("../models/feedbackModel");

// @desc    Add Feedback for a course
// @route   POST /api/feedback
const addFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { course, title, description } = req.body;
    const user = req.user;
    const feedback = new Feedback({
      user: user.id,
      course: course,
      title: title,
      description: description,
    });

    const feedbackSaveResult = await feedback.save();
    JSON.stringify(feedbackSaveResult) !== "{}"
      ? res.status(200).json({ msg: "Feedback Added Successfully!" })
      : res.status(500).send("Internal Server error");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getFeedback = async (req, res) => {
  const courseId = req.query.courseId
  console.log("FEEDBACK_COURSE_ID", courseId)
  try {
    const result = await Feedback.find({course: courseId})
    if(result){
      res.status(200).json(result)
      return
    }else{
      res.status(404).json({error: [{msg: "No Feedback found for this course"}]})
      return
    }
    
  } catch (error) {
    console.error(error.message)
    res.send(500).json({error: [{msg: "Internal Server Error"}]})

  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const result = await Feedback.find()
    if(result){
      res.status(200).json(result)
      return
    }else{
      res.status(404).json({error: [{msg: "No Feedback found "}]})
      return
    }
    
  } catch (error) {
    console.error(error.message)
    res.send(500).json({error: [{msg: "Internal Server Error"}]})

  }
};

module.exports = { addFeedback, getFeedback, getAllFeedbacks };
