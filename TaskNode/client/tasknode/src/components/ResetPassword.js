import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { resetPassword } from "../redux/UserData/userDataAction";
import * as validate from "../validation/validation";
const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      return alert("Password do not match");
    }
    dispatch(
      resetPassword(token, passwords.password)
    ).then((data) => {
      alert(data);
      history.push("/");
    });
  };

  return (
    <>
      <h1 className="text-center text-primary">Reset Password</h1>
      <div className="d-flex justify-content-center">
        <form className="w-50 px-md-0 px-2" onSubmit={handleSubmit}>
          <br />
          <input
            className={
              !passwords.password ||
              validate.password(passwords.password) !== true
                ? "form-control border border-danger"
                : "form-control"
            }
            onChange={(e) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
            type="password"
            placeholder="New Password"
          />
          <br />
          <input
            className="form-control"
            type="password"
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            placeholder="Confirm Password"
          />
          <br />
          <button className="btn btn-warning">Reset</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
