import React, { useState } from "react";
import validator from "validator";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../redux/UserData/userDataAction";
const SignUp = () => {
  const initialState = {
    name: "",
    email: "",
    dob: "",
    username: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let formField in formValue) {
      console.log(formValue[formField] === "");
      if (!formValue[formField]) return alert("Field is empty");
    }
    dispatch(registerAdmin(formValue));
  };
  return (
    <>
      {console.log(moment(formValue.dob).fromNow())}
      <h1 className="text-md-center px-2">Sign Up</h1>
      <div className="d-md-flex justify-content-center">
        <form
          action="/post"
          className="w-50 px-md-0 px-2"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label className="text-dark fw-bold">Name: </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className={
                !formValue.name || validator.isAlpha(formValue.name)
                  ? "form-control"
                  : "form-control border border-danger"
              }
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Email: </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className={
                !formValue.email || validator.isEmail(formValue.email)
                  ? "form-control"
                  : "form-control border border-danger"
              }
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
            />
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">DOB: </label>
            <input
              type="date"
              className="form-control"
              onChange={(e) =>
                setFormValue({
                  ...formValue,
                  dob: moment(e.target.value).fromNow().slice(0, 2),
                })
              }
            />
          </div>
          <br />
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
            <button
              type="button"
              className="btn btn-warning m-2"
              onClick={() => setFormValue(initialState)}
            >
              Clear
            </button>
          </div>
          <p className="text-center text-danger">
            Have a account?
            <Link className="text-primary" to="/">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
