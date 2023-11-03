const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    mobileNo: {
      type: Number,
      required: [true, "Please enter the mobile number"],
      unique: [true, "A user with this mobile number is already registered"],
    },
    empId: {
      type: Number,
      required: [true, "Please enter the employee Id"],
      unique: [true, "A user with this employee id is already registered"],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
