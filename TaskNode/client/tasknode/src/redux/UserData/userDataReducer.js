import { FETCH_USER, REGISTER_ADMIN } from "./userDataTypes";

const initialState = {
  userData: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      return { ...state, userData: action.payload };
    case FETCH_USER:
      console.log("redux reducer", action.payload);
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userDataReducer;
