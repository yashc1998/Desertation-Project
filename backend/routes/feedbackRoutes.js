const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  addFeedback,
  getFeedback,
  getAllFeedbacks
} = require("../controllers/feedbackController");

router.post(
  "/",
  [
    check("course", "A valid course is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("description", "Feedback description is required").not().isEmpty(),
  ],
  auth,
  addFeedback
);

router.get("/", getFeedback);
router.get("/all", getAllFeedbacks);

module.exports = router;
