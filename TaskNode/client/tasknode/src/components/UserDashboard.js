import React from "react";
import { useSelector } from "react-redux";
import Logout from "./Logout";
const UserDashboard = () => {
  const user = useSelector((state) => state.userData.userData.data[0]);
  return (
    <>
      {console.log(user)}
      <div className="text-center">
        <h1>User</h1>
        <Logout />
        <div className="p-2">
          <div className="border border-4 border-danger">
            <div className="d-flex justify-content-evenly">
              <h4>Name: {user.name}</h4>
              <h4>Email: {user.email}</h4>
            </div>
            <div className="d-flex justify-content-evenly">
              <h4>Date Of Birth: {user.dob}</h4>
              <h4>Username: {user.username}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
