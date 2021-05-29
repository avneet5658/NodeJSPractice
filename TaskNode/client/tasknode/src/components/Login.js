import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmin,
  getUser,
  setLoading,
} from "../redux/UserData/userDataAction";
import Loader from "react-loader-spinner";
import * as validate from "../validation/validation";
import jwt from "jsonwebtoken";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [currentUser, setCurrentUser] = useState("User");
  const [formValue, setFormValue] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userData.loading);

  useEffect(() => {
    if (localStorage.getItem("tokenAdmin")) {
      history.push("/admindashboard");
    } else if (localStorage.getItem("tokenUser")) {
      history.push("/userdashboard");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser === "Admin") {
      dispatch(setLoading(true));
      dispatch(getAdmin(formValue))
        .then((admin) => {
          dispatch(setLoading(false));
          if (admin.data.length > 0) {
            const id = admin.data[0]._id;
            console.log(process.env.REACT_APP_JWT_TOKEN_KEY);
            const token = jwt.sign(
              { id },
              process.env.REACT_APP_JWT_TOKEN_KEY,
              {
                expiresIn: "1h",
              }
            );
            localStorage.setItem("tokenAdmin", token);
            history.push("/admindashboard");
          } else {
            alert("wrong credentials");
          }
        })
        .catch((error) => {
          dispatch(setLoading(false));
          console.log(error);
        });
    } else {
      dispatch(setLoading(true));
      dispatch(getUser(formValue)).then((user) => {
        dispatch(setLoading(false));
        console.log(user);
        if (user === false) {
          alert("InActive User");
        } else if (user === "failed") {
          alert("Wrong Credentials!!");
        } else {
          console.log(user);
          const id = user.data[0]._id;
          const token = jwt.sign({ id }, process.env.REACT_APP_JWT_TOKEN_KEY, {
            expiresIn: "1h",
          });
          localStorage.setItem("tokenUser", token);
          console.log("user logined");
          history.push("/userdashboard");
        }
      });
    }
  };
  const handleRadio = (e) => {
    setCurrentUser(e.target.value);
  };
  return (
    <>
      <h1 className="text-md-center px-2">LOGIN</h1>
      <div className="d-md-flex justify-content-center ">
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="user"
            value="Admin"
            onChange={handleRadio}
            checked={currentUser === "Admin"}
          />
          <label class="form-check-label">Admin</label>
        </div>
        &nbsp;
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="user"
            value="User"
            checked={currentUser === "User"}
            onChange={handleRadio}
          />
          <label class="form-check-label">User</label>
        </div>
      </div>
      <div className="d-md-flex justify-content-center">
        <form className="w-50 px-md-0 px-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-dark fw-bold">Username: </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={
                !formValue.username || validate.username(formValue.username)
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
              value={formValue.password}
              className="form-control"
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </div>
          <br />
          <div className="d-sm-flex justify-content-center">
            <button type="submit" className="btn btn-success m-2">
              Submit
            </button>
            {currentUser == "User" && (
              <Link className="btn btn-danger m-2" to="/forgetpassword">
                Forget Password
              </Link>
            )}

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
          {currentUser === "Admin" && (
            <p className="text-center text-danger">
              Don't have an account?
              <Link className="text-primary" to="/signup">
                SignUp
              </Link>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
