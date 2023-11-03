import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

import PropTypes from "prop-types";

import Alert from "./UI/Alert/Alert";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { useNavigate } from "react-router";

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [registrationType, setRegistrationType] = useState("radio_learner");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    empId: "",
    password: "",
    confirmPassword: "",
    regType: registrationType,
    instructorSkills: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      console.log(isAuthenticated)
      navigate('/');
    }
  },[isAuthenticated]);

  const onRegistrationTypeChange = (e) => {
    setRegistrationType(e.target.value);
    setRegisterFormData((prevData) => {
      return { ...prevData, regType: e.target.value };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(registerFormData);

    const {
      name,
      email,
      mobileNo,
      empId,
      password,
      regType,
      instructorSkills,
    } = registerFormData;

    if (registerFormData.password !== registerFormData.confirmPassword) {
      setConfirmPasswordError(true);
      setAlert('Confirm Password not same', 'danger');
      return;
    }

    register({
      name,
      email,
      mobileNo,
      empId,
      password,
      regType,
      instructorSkills,
    });
  };

  const onChange = (e) => {
    setRegisterFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]:
          e.target.name === "instructorSkills"
            ? e.target.value.split(",")
            : e.target.value,
      };
    });
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900 h-fit">
        <div
          style={{ maxWidth: "50%" }}
          className="flex relative flex-col w-100 h-fit items-center justify-center px-6 mx-auto md:h-screen lg:py-0"
        >
          {/* {confirmPasswordError && (
            <Alert msg="Confirm password not same" />
          )} */}
          <Alert />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register
                </h1> */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formSubmitHandler}
              >
                <div className="flex justify-center flex-row gap-3">
                  <div className="basis-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={(e) => onChange(e)}
                      value={registerFormData.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required={false}
                    />
                  </div>
                  <div className="basis-1/2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => onChange(e)}
                      value={registerFormData.email}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required={false}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="basis-1/2">
                    <label
                      htmlFor="mobileNo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobileNo"
                      id="mob"
                      value={registerFormData.mobileNo}
                      onChange={(e) => onChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required={false}
                    />
                  </div>
                  <div className="basis-1/2">
                    <label
                      htmlFor="empId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee ID
                    </label>
                    <input
                      type="number"
                      name="empId"
                      value={registerFormData.empId}
                      onChange={(e) => onChange(e)}
                      id="emp_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=" Wipro ID"
                      required={false}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="basis-1/2">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={registerFormData.password}
                      onChange={(e) => onChange(e)}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={false}
                    />
                  </div>
                  <div className="basis-1/2">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerFormData.confirmPassword}
                      onChange={(e) => onChange(e)}
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={false}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Registering as:{" "}
                  </h3>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="horizontal-list-radio-student"
                          type="radio"
                          value="radio_learner"
                          checked={registrationType === "radio_learner"}
                          onChange={onRegistrationTypeChange}
                          name="regType"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="horizontal-list-radio-student"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Student
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="horizontal-list-radio-instructor"
                          type="radio"
                          value="radio_instructor"
                          onChange={onRegistrationTypeChange}
                          name="regType"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="horizontal-list-radio-instructor"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Instructor
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {registrationType === "radio_instructor" ? (
                  <div>
                    <label
                      htmlFor="instructor_skills"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Please enter your skills
                    </label>
                    <input
                      type="text"
                      name="instructorSkills"
                      id="instructor_skills"
                      placeholder="Javascript, React, PHP, JAVA, C++...."
                      onChange={(e) => onChange(e)}
                      value={registerFormData.instructorSkills}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={false}
                    />
                  </div>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {registrationType === "radio_instructor"
                    ? "Submit for Approval"
                    : "Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});


export default connect(mapStateToProps, { register, setAlert })(Register);
