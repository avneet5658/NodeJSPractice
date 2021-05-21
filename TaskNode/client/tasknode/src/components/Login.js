import React, { useState } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/UserData/userDataAction";
const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(formValue));
    console.log("OK");
  };
  return (
    <>
      <h1 className="text-md-center px-2">LOGIN</h1>
      <div className="d-md-flex justify-content-center">
        <form className="w-50 px-md-0 px-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-dark fw-bold">Username: </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={
                !formValue.username ||
                validator.isAlphanumeric(formValue.username)
                  ? "form-control"
                  : "form-control border border-danger"
              }
              value={formValue.username}
              onChange={(e) =>
                setFormValue({ ...formValue, username: e.target.value })
              }
            />
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={
                !formValue.password ||
                validator.isStrongPassword(formValue.password)
                  ? "form-control"
                  : "form-control border border-danger"
              }
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </div>
          <br />
          <div className="d-sm-flex justify-content-center">
            <button className="btn btn-success m-2">Submit</button>
            <button className="btn btn-danger m-2" type="button">
              Forget Password
            </button>
            <button
              type="button"
              className="btn btn-warning m-2"
              onClick={() => setFormValue(initialState)}
            >
              Clear
            </button>
          </div>
          <p className="text-center text-danger">
            Don't have an account?
            <Link className="text-primary" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
