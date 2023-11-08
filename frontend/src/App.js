import { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePageLearner from "./components/user/HomePageLearner";
import Courses from "./components/Courses/Courses";
import Search from "./components/Search/Search";
import AddCourse from "./components/AddCourse/AddCourse";
import Course from "./components/Course/Course";
import UploadVideo from "./components/UploadVideo/UploadVideo";
import UserCourses from "./components/UserCourses/UserCourses";
import CourseLessonPlay from "./components/CourseLessonPlay/CourseLessonPlay";
import QuizC from "./components/Quiz/QuizC";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/Admin/AdminLogin";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/homelog" element={<HomePageLearner />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/search" element={<Search />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/course/:id/uploadvideo" element={<UploadVideo />} />
        <Route path="/course/:id/play" element={<CourseLessonPlay />} />
        <Route path="/course/:id/quiz" element={<QuizC />} />
        <Route path="/mycourses" element={<UserCourses />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </Provider>
  );
}

export default App;
