import {
  DELETE_USER,
  FETCH_ADMIN,
  FETCH_ALL_USER,
  FETCH_USER,
  FORGET_PASSWORD,
  REGISTER_ADMIN,
  REGISTER_USER,
  RESET_PASSWORD,
  UPDATE_STATUS,
  UPDATE_USER,
  OTP,
  OTP_VERIFY,
  LOADING,
  FETCH_USER_BY_ID,
  IMAGE_UPLOAD,
} from "./userDataTypes";

const initialState = {
  loading: false,
  userData: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      return { ...state, userData: action.payload };
    case FETCH_ADMIN:
      return { ...state, userData: action.payload };
    case FETCH_USER:
      return { ...state, userData: action.payload };
    case FETCH_ALL_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case UPDATE_STATUS:
      return { ...state, userData: action.payload };
    case DELETE_USER:
      return { ...state, userData: action.payload };
    case UPDATE_USER:
      return { ...state, userData: action.payload };
    case FORGET_PASSWORD:
      return { ...state, userData: action.payload };
    case RESET_PASSWORD:
      return { ...state, userData: action.payload };
    case OTP:
      return { ...state, userData: action.payload };
    case OTP_VERIFY:
      return { ...state, userData: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case FETCH_USER_BY_ID:
      return { ...state, loading: action.payload };
    case IMAGE_UPLOAD:
      return { ...state, loadng: action.payload };
    default:
      return state;
  }
};

export default userDataReducer;
