import axios from "axios";

const url = "http://localhost:5000";

export const saveAdmin = (newAdmin) => axios.post(`${url}/admin`, newAdmin);
export const getUser = (loginDetails) => (
  console.log(loginDetails), axios.patch(`${url}/admin`, loginDetails)
);
