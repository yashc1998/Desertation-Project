import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";

export default combineReducers({authReducer, alertReducer});