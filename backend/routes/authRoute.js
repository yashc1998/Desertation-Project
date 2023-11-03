const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/userModel");
const Instructor = require("../models/instructorModel");

router.get("/", auth, async (req, res) => {
  let user;
  try {
    if(req.type === 'learner')
      user = await User.findById(req.user.id).select("-password");
    else
      user = await Instructor.findById(req.user.id).select("-password");
    
    res.json({user, type: req.type}); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
