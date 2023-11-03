const { validationResult } = require("express-validator");
const Quiz = require("../models/quizModel");

// @desc    Add quiz for a course
// @route   POST /api/quiz
const addQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { instructor, course, questions, quizTitle, quizSynopsis, nrOfQuestions } = req.body;

  const quiz = new Quiz({
    instructor: instructor,
    course: course,
    questions: questions,
    quizTitle,
    quizSynopsis,
    nrOfQuestions
  });

  const quizSaveResult = await quiz.save();
  JSON.stringify(quizSaveResult) !== "{}"
    ? res.status(200).json({ msg: "Quiz Added Successfully!" })
    : res.status(500).send("Internal Server error");
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get quiz for a course
// @route   GET /api/quiz
const getQuiz = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const quiz = await Quiz.find({course: courseId});
    if (quiz) {
      res.status(200).json(quiz);
    } else {
      res.status(404).json({ errors: [{ msg: "No quiz found!!" }] });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { addQuiz, getQuiz };
