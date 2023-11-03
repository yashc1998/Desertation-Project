const mongoose = require("mongoose");

const administratorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the First Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
    },
    mob_no: {
      type: Number,
      required: [true, "Please enter the mobile number"],
      unique: true,
    },
    password: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("administrator", administratorSchema);
