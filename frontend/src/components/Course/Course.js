import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Alert from "../UI/Alert/Alert";
import { setAlert } from "../../actions/alert";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { BACKEND_URI } from "../../config/constants";

const HtmlToReactParser = require("html-to-react").Parser;

const Course = ({ setAlert, isAuthenticated, user, userType }) => {
  const htmlToReactParser = new HtmlToReactParser();
  const [course, setCourse] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFeedbackSubmit, setIsLoadingFeedbackSubmit] = useState(false);
  const [courseFeedbacks, setCourseFeedbacks] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolledCourseDetails, setEnrolledCourseDetails] = useState();
  const [currentCourseInstructor, setCurrentCourseInstructor] =
    useState("Instructor");
  const [videoNavLinkTo, setVideNavLinkTo] = useState('play');
  const [quizLength, setQuizLength] = useState(0);
  const courseId = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();


  //To Scroll the window to the starting/top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if(userType === 'learner'){
      !isEnrolled && setVideNavLinkTo()
    }
  }, [isEnrolled, userType])

  //Fetch current course details
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await axios.get(
          `${BACKEND_URI}/api/courses/${courseId.id}`,
          {
            onUploadProgress: (progressEvent) => {
              setIsLoading(true);
            },
          }
        );
        setCourse(courseRes.data);
        checkIfUserEnrolledInCourse(courseRes.data._id);
        getCourseFeedbacks(courseRes.data._id);
        getCourseQuiz(courseRes.data._id)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setCourse();
      }
    };

    fetchCourses();
  }, [courseId, user]);

  //Check if user has enrolled in this course
  const checkIfUserEnrolledInCourse = async (course_id) => {
    console.log("COURSE ENROLL CALLED: ", course_id);
    const params = {
      courseId: course_id,
    };
    try {
      const res = await axios.get(BACKEND_URI + "/api/enrollcourses/check", {
        params: params,
      });
      console.log("IS_ENROLLED_COURSE: ", res.data);
      setIsEnrolled(res.data.isCourseEnrolled);
    } catch (error) {
      console.error(error);
    }
  };

  /////////
  //Get quizes for this course

  const getCourseQuiz = async (courseId) => {
    try {
      const res = await axios.get(BACKEND_URI + "/api/quiz", {
        params: {
          courseId: courseId.id,
        },
      });
      console.log("QUIZ DATA", res.data);
      setQuizLength(res.data.length || 0)
    } catch (error) {}
  }

  /////////

  //////////

  const getCourseFeedbacks = async (course_id) => {
    const params = {
      courseId: course_id,
    };
    try {
      const res = await axios.get(BACKEND_URI + "/api/feedback", {
        params: params,
      });
      console.log("course_feedbacks: ", res.data);
      setCourseFeedbacks(res.data);
      console.log("COURSE_FEEDBACKS", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseFeedbacks(courseId.id);
  }, [isLoadingFeedbackSubmit, courseId]);

  ///////////////

  //Fetch current course instructor details
  useEffect(() => {
    const fetchCurrentCourseInstructor = async () => {
      try {
        const instructorRes = await axios.get(
          `${BACKEND_URI}/api/instructor/${course.instructor}`
        );
        setCurrentCourseInstructor(instructorRes.data);
      } catch (error) {
        console.log(error);
        setCurrentCourseInstructor("Test Instructor");
      }
    };
    course && fetchCurrentCourseInstructor();
  }, [course]);

  const enrollUserToCourse = async () => {
    const body = {
      courseId: course._id,
    };
    try {
      const res = await axios.post(BACKEND_URI + "/api/enrollcourses", body);
      setEnrolledCourseDetails(res.data);
      setIsEnrolled(true);
    } catch (error) {
      console.error(error.response);
      setAlert(error.response.data.errors[0].msg, "danger");
    }
  };

  const courseButtonsClickHanler = (e) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    switch (e.currentTarget.name) {
      case "editCourse":
        navigate("/addcourse", { replace: false, state: course });

        break;
      case "addVideo":
        navigate(`/course/${course._id}/uploadvideo`, {
          replace: false,
          state: course,
        });

        break;
      case "addQuiz":
      case "takeQuiz":
        navigate(`/course/${course._id}/quiz`, {
          replace: false,
          state: { course, type: e.currentTarget.name, user },
        });
        break;
      case "enroll":
        enrollUserToCourse();
        break;
      case "feedback":
        modalStateHandler();
        break;
      case "continue":
        navigate(`/course/${course._id}/play`, {
          replace: false,
          state: course,
        });
        break;
      default:
        break;
    }
  };

  const modalStateHandler = () => {
    setIsModalOpen(!isModalOpen);
    console.log("MODAL STATE: ", isModalOpen);
  };

  const addFeedback = async (title, description) => {
    const body = {
      title,
      description,
      course: course._id,
    };
    try {
      const res = await axios.post(BACKEND_URI + "/api/feedback", body, {
        onUploadProgress: (progress) => {
          setIsLoadingFeedbackSubmit(true);
        },
      });
      setIsLoadingFeedbackSubmit(false);
      setIsModalOpen(false);
      console.log(res.data);
    } catch (error) {
      setIsLoadingFeedbackSubmit(false);
      console.error(error);
    }
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <Alert />

      <Navbar classNameName="fixed" />
      <FeedbackModal
        isOpen={isModalOpen}
        modalStateHandler={modalStateHandler}
        addFeedback={addFeedback}
        isLoading={isLoadingFeedbackSubmit}
      />
      <div className="mb-10">
        <div
          className="flex bg-gray-800 text-white justify-center align-center bg-gradient-to-r from-gray-800 to-indigo-500"
          // style={{ maxHeight: "25rem" }}
        >
          <div className="w-3/5 p-10 ">
            <h2 className="text-4xl font-bold">{course && course.title}</h2>
            <p className="text-lg mt-8 max-w-2/3 ">
              {course && course.brief_summary}
            </p>
            <p className="mt-8">
              Created By:{" "}
              <span>
                {currentCourseInstructor && currentCourseInstructor.name}
              </span>
            </p>
            {isAuthenticated &&
              userType === "instructor" &&
              currentCourseInstructor &&
              user._id === currentCourseInstructor._id && (
                <div>
                  <button
                    type="button"
                    name="editCourse"
                    onClick={courseButtonsClickHanler}
                    className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Edit Course
                  </button>
                  <button
                    type="button"
                    name="addVideo"
                    onClick={courseButtonsClickHanler}
                    className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Videos
                  </button>
                  <button
                    type="button"
                    name="addQuiz"
                    onClick={courseButtonsClickHanler}
                    className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Quiz
                  </button>
                </div>
              )}
            {isAuthenticated && quizLength>0 && (isEnrolled || userType === "instructor") && (
              <>
                <button
                  type="button"
                  name="takeQuiz"
                  onClick={courseButtonsClickHanler}
                  className="inline-block mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Take Quiz
                </button>
              </>
            )}
            {userType !== "instructor" && isEnrolled === false && (
              <div>
                <button
                  type="button"
                  name="enroll"
                  onClick={courseButtonsClickHanler}
                  className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Enroll
                </button>
              </div>
            )}
            {userType !== "instructor" && isEnrolled && (
              <div>
                <button
                  type="button"
                  name="feedback"
                  onClick={courseButtonsClickHanler}
                  className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Add Feedback
                </button>
                <button
                  type="button"
                  name="continue"
                  onClick={courseButtonsClickHanler}
                  className="mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Continue
                </button>
              </div>
            )}
            <div className="pt-4">
              {course &&
                course.tags &&
                course.tags.map((tag) => (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
          <div className="w-2/5 py-10">
            <div
              className={`${
                isModalOpen ? "hidden" : ""
              }  bg-transparent rounded w-3/5 float-right mr-10 shadow-lg`}
            >
              <img
                className="w-full bg-transparent"
                src={course && course.courseImage}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Course Summary */}
        <div className="flex justify-center">
          <div className="w-8/12 p-10">
            {/* Course Summary */}
            <div className="">
              <p className="text-2xl font-bold mb-4">Course Summary</p>
              <div className="course-summary">
                {course &&
                  htmlToReactParser.parse(course.description, "text/html")}
              </div>
            </div>
            {/* Horizonal break */}
            <hr
              className="w-4/5 my-8 m-auto"
              style={{ height: "2px", backgroundColor: "#333", width: "90%" }}
            />
            {/* Course Video Content */}
            <div className="">
              <p className="text-2xl font-bold mb-4">Course Content</p>
              <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
                {course &&
                  course.videos && course.videos.length > 0 ?
                  course.videos.map((lesson, index) => {
                    return (
                      <NavLink to={videoNavLinkTo} state={course}>
                        <li className="px-6 py-4">
                          <div className="flex justify-between">
                            <span className="">
                              <span className="font-semibold">{`${
                                index + 1
                              }. `}</span>
                              <span className="">{lesson.title}</span>
                            </span>
                            <span className="text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                />
                              </svg>
                            </span>
                          </div>
                        </li>
                      </NavLink>
                    );
                  }) : <h2 className="px-6 py-4">No videos uploaded for this course</h2>}
              </ul>
            </div>
          </div>
          <div className="w-4/12 mt-4">
            {course && (
              <HorizontalScroll
                title="Feedbacks"
                feedbackItems={courseFeedbacks}
                courseTitle={course.title}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

Course.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  userType: PropTypes.string,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    userType: state.authReducer.type,
  };
};

export default connect(mapStateToProps, { setAlert })(Course);
