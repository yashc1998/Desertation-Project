const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Full Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
    },
    password: String,
    mobileNo: {
      type: Number,
      required: [true, "Please enter the mobile number"],
      unique: true,
    },
    empId: {
      type: Number,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    instructorSkills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("instructor", instructorSchema);
