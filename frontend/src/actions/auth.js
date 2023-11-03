import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { BACKEND_URI } from "../config/constants";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get(BACKEND_URI + "/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register user
export const register =
  ({ name, email, password, mobileNo, empId, regType, instructorSkills }) =>
  async (dispatch) => {
    regType = regType === "radio_learner" ? "learner" : "instructor";
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res;
      if (regType === "learner") {
        const body = JSON.stringify({ name, email, password, mobileNo, empId });
        res = await axios.post(BACKEND_URI + "/api/user", body, config);
      } else if (regType === "instructor") {
        const body = JSON.stringify({
          name,
          email,
          password,
          mobileNo,
          empId,
          regType,
          instructorSkills,
        });
        res = await axios.post(BACKEND_URI + "/api/instructor", body, config);
      }
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { ...res.data, regType: regType },
      });

      dispatch(loadUser());
    } catch (error) {
      console.error(error.response.data);
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login =
  ({ email, password, regType }) =>
  async (dispatch) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    const body = { email, password };
    let res;
    try {
      if (regType === "learner") {
        res = await axios.post(BACKEND_URI + "/api/user/login", body);
      } else if (regType === "instructor") {
        res = await axios.post(BACKEND_URI + "/api/instructor/login", body);
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...res.data, regType: regType },
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
