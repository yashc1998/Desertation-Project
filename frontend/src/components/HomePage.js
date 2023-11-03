import Navbar from "./Navbar";
import HeroImage from "./HeroImage";
import "./HomePage.css";
import Footer from "./Footer/Footer";
import FeedbackItem from "./FeedbackItem/FeedbackItem";
import HorizontalScroll from "./HorizontalScroll/HorizontalScroll";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";


const HomePage = () => {
  const [feedbackList, setFeedbackList] = useState();
  const [courseList, setCourseList] = useState();

  const getAllFeedbacks = async () => {
    try {
      const res = await axios.get(BACKEND_URI + "/api/feedback/all");
      setFeedbackList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourses = async () => {
    try {
      const res = await axios.get(BACKEND_URI + "/api/courses/all/");
      setCourseList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
    getAllFeedbacks();
  }, []);

  return (
    <>
      <Navbar />
      <HeroImage />
      <section className="flex justify-center p-6 mx-auto w-full">
        <div className="flex flex-col w-full p-5 sm:flex-row justify-center">
          <div className="relative sm:w-1/3 flex justify-center">
            <span className="top-0 left-0 text-6xl font-black text-gray-200">
              1
            </span>
            <div className="relative z-10 flex flex-col mt-8 ml-6">
              <h4 className="font-bold leading-none text-gray-400 uppercase font-xs">
              Quality Content
              </h4>
              <p className="mt-2 text-lg leading-none text-gray-800">
              Explore our library of high-quality courses taught by industry experts
              </p>
            </div>
          </div>
          <div className="relative sm:w-1/3 flex justify-center">
            <span className="top-0 left-0 text-6xl font-black text-gray-200">
              2
            </span>
            <div className="relative z-10 flex flex-col mt-8 ml-6">
              <h4 className="font-bold leading-none text-gray-400 uppercase font-xs">
              Flexibility & Accessibility
              </h4>
              <p className="mt-2 text-lg leading-none text-gray-800">
              Learn at your own pace, on your schedule.
              </p>
            </div>
          </div>
          <div className="relative sm:w-1/3 flex justify-center">
            <span className="top-0 left-0 text-6xl font-black text-gray-200">
              3
            </span>
            <div className="relative z-10 flex flex-col mt-8 ml-6">
              <h4 className="font-bold leading-none text-gray-400 uppercase font-xs">
              Diverse Learning Resources
              </h4>
              <p className="mt-2 text-lg leading-none text-gray-800">
              Access a wide range of learning resources, including video lectures, interactive quizzes
              </p>
            </div>
          </div>
        </div>
      </section>
      {courseList && (
        <>
          <HorizontalScroll title="Popular Courses" items={courseList} />
          <HorizontalScroll title="Your Interests" items={courseList} />
        </>
      )}

      <div className="feedbacks flex-grow w-full mx-auto overflow-hidden">
        <div className="mx-auto w-full">
          <div className="p-16 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-medium">
                How learners like you are achieving their goals
              </h2>
            </div>
            <div
              id="scrollContainer"
              className="no-scrollbar snap-x snap-mandatory flex flex-no-wrap overflow-x-scroll scrolling-touch items-start "
            >
              {feedbackList &&
                feedbackList.map((item, index) => (
                  <FeedbackItem feedback={item} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
