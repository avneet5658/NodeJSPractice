import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerAdmin,
  registerUser,
  setLoading,
} from "../redux/UserData/userDataAction";
import * as validate from "../validation/validation";
import Loader from "react-loader-spinner";
const SignUp = () => {
  const initialState = {
    name: "",
    email: "",
    contact: "",
    dob: "",
    username: "",
    password: "",
  };
  const loading = useSelector((state) => state.userData.loading);

  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const tempIsLogin = localStorage.getItem("tokenAdmin") && true;
    console.log(tempIsLogin);
    setIsLogin(tempIsLogin);
  }, [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let formField in formValue) {
      console.log(formValue[formField] === "");
      if (!formValue[formField]) return alert("Field can't be empty");
    }
    if (validate.verifyAllfields(formValue) !== true) {
      return alert(validate.verifyAllfields(formValue));
    }
    if (!isLogin) {
      dispatch(setLoading(true));
      dispatch(registerAdmin(formValue)).then((data) => {
        alert(data);
        dispatch(setLoading(false));
        if (data === "Successfully Registered") {
          history.push("/");
        }
      });
    } else {
      dispatch(setLoading(true));
      dispatch(registerUser(formValue)).then((data) => {
        alert(data);
        dispatch(setLoading(false));
        if (data === "Successfully Registered") {
          history.push("/admindashboard");
        }
      });
    }
  };
  return (
    <>
      {console.log(isLogin, "isLogin")}
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
                !formValue.name || validate.name(formValue.name) !== true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
            {(!formValue.name || validate.name(formValue.name) !== true) && (
              <p className="text-danger">{validate.name(formValue.name)}</p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Email: </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className={
                !formValue.email || validate.email(formValue.email) !== true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
            />
            {(!formValue.email || validate.email(formValue.email) !== true) && (
              <p className="text-danger">{validate.email(formValue.email)}</p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Contact: </label>
            <input
              type="number"
              placeholder="Enter your Number"
              className={
                !formValue.contact ||
                validate.contact(formValue.contact) != true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={formValue.contact}
              onChange={(e) =>
                setFormValue({ ...formValue, contact: e.target.value })
              }
            />
            {(!formValue.contact ||
              validate.contact(formValue.contact) != true) && (
              <p className="text-danger">
                {validate.contact(formValue.contact)}
              </p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">DOB: </label>
            <input
              type="date"
              className={
                !formValue.dob || validate.dob(formValue.dob) !== true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              onChange={(e) =>
                setFormValue({
                  ...formValue,
                  dob: moment(e.target.value).fromNow().slice(0, 2),
                })
              }
            />
            {console.log(moment(formValue.dob).fromNow())}
            {(!formValue.dob || validate.dob(formValue.dob) !== true) && (
              <p className="text-danger">{validate.dob(formValue.dob)}</p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Username: </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={
                !formValue.username ||
                validate.username(formValue.username) !== true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={formValue.username}
              onChange={(e) =>
                setFormValue({ ...formValue, username: e.target.value })
              }
            />
            {(!formValue.username ||
              validate.username(formValue.username) !== true) && (
              <p className="text-danger">
                {validate.username(formValue.username)}
              </p>
            )}
          </div>
          <br />
          <div className="form-group">
            <label className="text-dark fw-bold">Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={
                !formValue.password ||
                validate.password(formValue.password) !== true
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
            {(!formValue.password ||
              validate.password(formValue.password) !== true) && (
              <p className="text-danger">
                {validate.password(formValue.password)}
              </p>
            )}
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
            {loading && (
              <Loader type="Puff" color="#00BFFF" height={25} width={25} />
            )}
          </div>
          {!isLogin && (
            <p className="text-center text-danger">
              Have a account?
              <Link className="text-primary" to="/">
                Login
              </Link>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
