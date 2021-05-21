import * as api from "../../api/api";
import { FETCH_USER, REGISTER_ADMIN } from "./userDataTypes";
export const registerAdmin = (newAdmin) => async (dispatch) => {
  const savedAdmin = await api.saveAdmin(newAdmin);
  dispatch({
    type: REGISTER_ADMIN,
    payload: savedAdmin,
  });
};

export const getUser = (loginDetails) => async (dispatch) => {
  console.log("action redux", loginDetails);
  const currentUser = await api.getUser(loginDetails);
  dispatch({
    type: FETCH_USER,
    payload: currentUser,
  });
};
