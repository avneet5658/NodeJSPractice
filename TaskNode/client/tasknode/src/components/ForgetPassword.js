import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  getOtp,
  otpVerify,
  setLoading,
} from "../redux/UserData/userDataAction";
import validate from "validator";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
const ForgetPassword = () => {
  const [value, setValue] = useState("");
  const [resetLinkVia, setResetLinkVia] = useState("email");
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userData.loading);

  useEffect(() => {
    setValue("");
  }, [resetLinkVia]);

  const handleRadio = (e) => {
    setResetLinkVia(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetLinkVia === "email") {
      dispatch(forgetPassword(value)).then((data) => {
        alert(data);
      });
    } else {
      dispatch(otpVerify(otp)).then((data) => {
        if (data !== "Entered a wrong Otp" && data !== "not updated") {
          alert("verified");
          history.push(`/resetPassword/${data}`);
        } else {
          alert(data);
        }
      });
    }
  };
  const handleOTP = (e) => {
    e.preventDefault();
    if (validate.isMobilePhone(value)) {
      dispatch(setLoading(true));
      dispatch(getOtp(value)).then((data) => {
        dispatch(setLoading(false));
        if (data === "Successfully Sent") {
          alert(data);
          setOtpStatus(true);
        } else {
          alert(data);
        }
      });
    } else {
      return alert("Enter a valid mobile number");
    }
  };
  return (
    <>
      <h1 className="text-center text-primary">ForgetPassword</h1>
      <div className="d-md-flex justify-content-center ">
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="resetLink"
            value="email"
            checked={resetLinkVia === "email"}
            onChange={handleRadio}
          />
          <label class="form-check-label">Email</label>
        </div>
        &nbsp;
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="resetLink"
            value="phone"
            onChange={handleRadio}
            checked={resetLinkVia === "phone"}
          />
          <label class="form-check-label">Phone</label>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <form className="w-50 px-md-0 px-2" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="email"
            disabled={resetLinkVia !== "email"}
            placeholder="Enter Your Registered Email"
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            type="text"
            disabled={resetLinkVia !== "phone"}
            placeholder="Enter Your Registered Phone"
            onChange={(e) => setValue(e.target.value)}
          />
          {loading && (
            <Loader type="Puff" color="#00BFFF" height={25} width={25} />
          )}
          {otpStatus && (
            <>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
          {resetLinkVia === "phone" && (
            <button
              type="button"
              className="btn btn-primary mt-2 mb-2"
              onClick={handleOTP}
              disabled={otpStatus}
            >
              Get OTP
            </button>
          )}
          <br />
          <button
            className="btn btn-warning"
            disabled={resetLinkVia === "phone" && !otpStatus}
          >
            {resetLinkVia === "phone" ? <>Verify</> : <>Get Link</>}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
