const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "instructor",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "course",
    },
    quizTitle: String,
    quizSynopsis: String,
    nrOfQuestions: String,
    questions: [
      {
        question: String,
        questionType: {
          type: String,
          default: "text",
        },
        answerSelectionType: {
          type: String,
          default: "single",
        },
        answers: [String],
        correctAnswer: String,
        explaination: String,
        messageForCorrectAnswer: {
          type: String,
          default: "Correct answer. Good job.",
        },
        messageForIncorrectAnswer: {
          type: String,
          default: "Incorrect answer. Please try again.",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quiz", quizSchema);
