import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { BACKEND_URI } from "../../config/constants";

const UserCourses = ({ user, userType, isAuthenticated }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserEnrolledCourses = async () => {
    console.log("MY COURSES", user);
    const url =
      userType === "learner" && user
        ? "/api/enrollcourses"
        : `/api/instructor/courses?id=${user._id}`;
    console.log("MY COURSES ID", url);

    try {
      const res = await axios.get(BACKEND_URI + url, {
        onUploadProgress: (progressEvent) => {
          setIsLoading(true);
        },
      });
      console.log("ENROLLED_COURSES", res.data);
      setIsLoading(false);
      setEnrolledCourses(res.data);
    } catch (error) {}
  };

  console.log("USER: ", user);
  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  const continueClickHandler = (e) => {
    enrolledCourses.forEach((course) => {
      if (course._id === e.target.name)
        navigate(`/course/${e.target.name}/play`, {
          replace: false,
          state: course,
        });
    });
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <Navbar />
      <div
        className={`flex flex-col sm:items-center sm:justify-between  ${
          isLoading && "hidden"
        }`}
      >
        {enrolledCourses && enrolledCourses.length > 0 ? (
          <section className="px-4 flex-1 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 mt-4">
                    Enrolled Courses
                  </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500 ">
                  Following are your enrolled courses and their progress
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Title
                          </th>

                          <th
                            scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            About
                          </th>
                          <th scope="col" className="relative py-3.5 px-4">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {enrolledCourses &&
                          enrolledCourses.length > 0 &&
                          enrolledCourses.map((course) => (
                            <tr>
                              <td className="px-4 py-4 text-sm overflow-auto no-scrollbar font-medium whitespace-nowrap">
                                <div className="max-w-md">
                                  <NavLink
                                    to={`/course/${course._id}`}
                                    className="font-medium text-gray-800  "
                                  >
                                    {course.title}
                                  </NavLink>
                                </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                                  Ongoing
                                </div>
                              </td>
                              <td
                                className="px-4 py-4 overflow-auto no-scrollbar text-sm whitespace-nowrap"
                                style={{ scrollbarWidth: "none" }}
                              >
                                <div className="max-w-md mx-4">
                                  <p className="text-gray-500 ">
                                    {course.brief_summary}
                                  </p>
                                </div>
                              </td>
                              {/* 
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                              <div className="bg-blue-500 w-2/3 h-1.5"></div>
                            </div>
                          </td> */}
                              {userType === "learner" && (
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <button
                                    onClick={continueClickHandler}
                                    name={course._id}
                                    className="px-3 py-2 border-2 text-gray-500 transition-colors duration-200 rounded-lg "
                                  >
                                    Continue
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p className="text-4xl mt-10">No courses here....</p>
        )}

        {/* <Footer/> */}
      </div>
    </>
  );
};

UserCourses.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  userType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
  userType: state.authReducer.type,
});

export default connect(mapStateToProps)(UserCourses);
