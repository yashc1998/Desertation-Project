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
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    instructorSkills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("instructor", instructorSchema);
