import axios from "axios";

const url = "http://localhost:5000/admin";

export const saveAdmin = (newAdmin) => axios.post(`${url}/signup`, newAdmin);

export const getAdmin = (loginDetails) =>
  axios.post(`${url}/loginAdmin`, loginDetails);

export const getUser = (loginDetails) =>
  axios.post(`${url}/loginUser`, loginDetails);

export const getAllUser = () => axios.get(`${url}/user`);
export const saveUser = (newUser) => axios.post(`${url}/registerUser`, newUser);

export const updateStatus = (id, currentStatus) =>
  axios.patch(`${url}/status`, { id, currentStatus });

export const deleteUser = (id) => axios.delete(`${url}/deleteUser/${id}`);

export const updateUser = (id, names, email, contact) =>
  axios.patch(`${url}/updateUser`, { id, names, email, contact });

export const forgetPassword = (email) =>
  axios.put(`${url}/forgetPassword`, { email });

export const resetPassword = (token, newPass) =>
  axios.put(`${url}/resetPassword`, { token, newPass });

export const getOtp = (contact) => axios.put(`${url}/otp`, { contact });

export const verifyOtp = (otp) => axios.put(`${url}/verifyOtp`, { otp });
export const getUserById = (id) => axios.get(`${url}/getUserById/${id}`);
export const imageupload = (formData) =>
  axios.post(`${url}/getImage`, formData);
export const handlePayment = (details) =>
  axios.post(`${url}/makePayment`, details);
