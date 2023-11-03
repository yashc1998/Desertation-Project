const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { addQuiz, getQuiz } = require("../controllers/quizController");

router.post(
  "/",
  [
    check("instructor", "A valid instructor is required to add quiz!")
      .not()
      .isEmpty(),
    check("course", "A valid course is required").not().isEmpty(),
    check("quizTitle", "A valid course is required").not().isEmpty(),
    check("questions", "Questions are required").not().isEmpty(),
  ],
  auth,
  addQuiz
);

router.get("/", getQuiz);

module.exports = router;
