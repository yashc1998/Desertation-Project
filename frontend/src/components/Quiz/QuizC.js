import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import Navbar from "../Navbar";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import QuizForm from "./QuizForm";
import { BACKEND_URI } from "../../config/constants";

const QuizC = () => {
  const location = useLocation();
  const [quizData, setQuizData] = useState();
  const courseId = useParams();
  const navigate = useNavigate();

  const getQuizForCourse = async () => {
    try {
      const res = await axios.get(BACKEND_URI + "/api/quiz", {
        params: {
          courseId: courseId.id,
        },
      });
      console.log("QUIZ DATA", res.data);
      setQuizData(res.data);
    } catch (error) {}
  };

  const addQuizForCourse = async () => {};

  useEffect(() => {
    if (location.state.type === "takeQuiz") {
      getQuizForCourse();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center w-full">
        <h2 className="text-4xl font-bold text-center my-8">
          {quizData && quizData[0] && quizData[0].quizTitle}
        </h2>
      </div>
      <div className="flex justify-center items-center">
        {location.state.type === "takeQuiz" && quizData && quizData[0] && (
          <div className="">
            <Quiz quiz={quizData[0]} />
          </div>
        )}
        {location.state.type === "takeQuiz" && quizData === null && quizData[0] && quizData[0].length === 0&& (<h2 className="text-8xl">No Quiz added for this course!!</h2>) }
        {location.state.type === "addQuiz" && <QuizForm />}
      </div>
    </>
  );
};

export default QuizC;
