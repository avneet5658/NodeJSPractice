import { combineReducers } from "redux";
import userDataReducer from "./UserData/userDataReducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
});

export default rootReducer;
