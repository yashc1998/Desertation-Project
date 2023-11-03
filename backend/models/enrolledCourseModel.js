const mongoose = require("mongoose");

const enrolledCourseModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("enrollments", enrolledCourseModel);
