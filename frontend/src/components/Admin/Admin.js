import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";


const Admin = () => {
  const [instructors, setInstructors] = useState([]);

  const getInstructorForApprovals = async () => {
    try {
      const res = await axios.get(BACKEND_URI + "/api/instructor/all");
      setInstructors(res.data);
      console.log("INSTRUCTOR_DATA: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInstructorForApprovals();
  }, []);

  const onRefreshClick = () => {
    getInstructorForApprovals()
  }

  const approveClickHandler = async (instructorId) => {
    console.log("INSTRUCTOR_ID: ", instructorId);
    try {
      await axios.post(BACKEND_URI + "/api/instructor/updateapproval", {
        instructorId,
      });
      setInstructors((prevState) => {
        return prevState.filter((instructor) => {
          return instructor._id !== instructorId;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rejectClickHandler = (e) => {};

  return (
    <div>
      <div>
        <section className="px-4 flex-1 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 mt-4">
                  Instructors
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500 ">
                Following are the instructors that needs your approval
              </p>
            </div>

            <div className="flex items-center mt-4 gap-x-3">
              <button onClick={onRefreshClick} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto ">
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>

                <span>Refresh</span>
              </button>
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
                          Instructor Name
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Email
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Employee Id
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Skills
                        </th>
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      {instructors &&
                        instructors.length > 0 &&
                        instructors.map((instructor) => (
                          <tr>
                            <td className="px-4 py-4 text-sm overflow-auto no-scrollbar font-medium whitespace-nowrap">
                              <div className="max-w-md">
                                <div className="font-medium text-gray-800  ">
                                  {instructor.name}
                                </div>
                              </div>
                            </td>

                            <td
                              className="px-4 py-4 overflow-auto no-scrollbar text-sm whitespace-nowrap"
                              style={{ scrollbarWidth: "none" }}
                            >
                              <div className="max-w-md mx-4">
                                <p className="text-gray-500 ">
                                  {instructor.email}
                                </p>
                              </div>
                            </td>
                            <td
                              className="px-4 py-4 overflow-auto no-scrollbar text-sm whitespace-nowrap"
                              style={{ scrollbarWidth: "none" }}
                            >
                              <div className="max-w-md mx-4">
                                <p className="text-gray-500 ">
                                  {instructor.empId}
                                </p>
                              </div>
                            </td>
                            <td
                              className="px-4 py-4 overflow-auto no-scrollbar text-sm whitespace-nowrap"
                              style={{ scrollbarWidth: "none" }}
                            >
                              <div className="max-w-md mx-4">
                                <p className="text-gray-500 ">
                                  {instructor.instructorSkills.join(", ")}
                                </p>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <button
                                onClick={(e) =>
                                  approveClickHandler(instructor._id)
                                }
                                className="px-3 bg-green-500 py-2 border-2 text-white transition-colors duration-200 rounded-lg "
                              >
                                Approve
                              </button>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <button
                                onClick={rejectClickHandler}
                                className="px-3 bg-red-500 py-2 border-2 text-white transition-colors duration-200 rounded-lg "
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
