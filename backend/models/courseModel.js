const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Instructor is mandatory"],
      ref: "instructor",
    },
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    brief_summary: String,
    description: {
      type: String,
      required: true,
    },
    videos: [
      {
        title: {
          type: String,
          required: [true, "Please add title"],
        },
        length: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    courseImage: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);
