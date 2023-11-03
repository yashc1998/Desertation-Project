const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require('cors')
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const path = require('path')

connectDB();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
console.log(path.join(process.cwd(), "public"))
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/api/auth", require("./routes/authRoute"));

app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/instructor", require("./routes/instructorRoutes"));
app.use("/api/enrollcourses", require("./routes/enrolledCourseRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoute"));

app.listen(port, () => console.log(`Server running on port ${port}`));
