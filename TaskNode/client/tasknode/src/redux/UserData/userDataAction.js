import * as api from "../../api/api";
import {
  FETCH_ADMIN,
  FETCH_ALL_USER,
  FETCH_USER,
  LOADING,
  REGISTER_ADMIN,
  REGISTER_USER,
  UPDATE_STATUS,
} from "./userDataTypes";
export const registerAdmin = (newAdmin) => async (dispatch) => {
  const savedAdmin = await api.saveAdmin(newAdmin);
  if (savedAdmin.data.message) {
    return savedAdmin.data.message;
  }
  dispatch({
    type: REGISTER_ADMIN,
    payload: savedAdmin,
  });
  return "Successfully Registered";
};

export const getAdmin = (loginDetails) => async (dispatch) => {
  const currentUser = await api.getAdmin(loginDetails);
  dispatch({
    type: FETCH_ADMIN,
    payload: currentUser,
  });
  return currentUser;
};
export const getUser = (loginDetails) => async (dispatch) => {
  const currentUser = await api.getUser(loginDetails);
  if (currentUser.status === 200) {
    if (currentUser.data.isActive === false) {
      return currentUser.data.isActive;
    } else {
      return currentUser.data.login;
    }
  }
  dispatch({
    type: FETCH_USER,
    payload: currentUser,
  });
  return currentUser;
};
export const getAllUser = () => async (dispatch) => {
  const allUsers = await api.getAllUser();

  dispatch({
    type: FETCH_ALL_USER,
    payload: allUsers.data,
  });
  return allUsers;
};

export const registerUser = (newUser) => async (dispatch) => {
  const savedUser = await api.saveUser(newUser);
  console.log(savedUser);
  if (savedUser.data.error) {
    return savedUser.data.error;
  }
  dispatch({
    type: REGISTER_USER,
    payload: savedUser.data,
  });
  return "Successfully Registered";
};

export const updateStatus = (id, currentStatus) => async (dispatch) => {
  const updateStatus = await api.updateStatus(id, currentStatus);
  // dispatch({
  //   type:UPDATE_STATUS,
  //   payload: updateStatus
  // })
};

export const deleteUser = (id) => async (dispatch) => {
  const deleteUser = await api.deleteUser(id);
};
export const updateUser = (id, name, email, contact) => async (dispatch) => {
  console.log("action ", contact);
  const updateUser = await api.updateUser(id, name, email, contact);
};
export const forgetPassword = (email) => async (dispatch) => {
  let forgetPassword = await api.forgetPassword(email);
  console.log(forgetPassword);
  if (forgetPassword.data.message) {
    return forgetPassword.data.message;
  }
  return "Intenal error contact admin";
};
export const resetPassword = (token, newPass) => async (dispatch) => {
  let resetPassword = "";
  try {
    resetPassword = await api.resetPassword(token, newPass);
  } catch (error) {
    console.log(error);
    resetPassword.data.message = "Token expired";
  }
  return resetPassword.data.message;
};

export const getOtp = (number) => async (dispatch) => {
  let otpStatus = await api.getOtp(number);
  if (otpStatus.data.message) {
    return otpStatus.data.message;
  }
  return "Internal error"
    //Successfully Sent
};
export const otpVerify = (otp) => async (dispatch) => {
  console.log("action redux", otp);
  let verification = await api.verifyOtp(otp);
  console.log(verification);
  if (verification.data.message) {
    return verification.data.message;
  }
  return "Internal Error";
};
export const setLoading = (loadingState) => async (dispatch) => {
  console.log("loading");
  try {
    await dispatch({ type: LOADING, payload: loadingState });
  } catch (err) {
    console.log("loading error", err);
  }
};
