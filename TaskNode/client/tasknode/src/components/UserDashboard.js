import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import jwt from "jsonwebtoken";
import * as validate from "../validation/validation";
import {
  getUserById,
  imageupload,
  paymentHandle,
  setLoading,
} from "../redux/UserData/userDataAction";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
const UserDashboard = () => {
  const [user, setUser] = useState();
  const [NotvalidFile, setNotValidFile] = useState(true);
  const [file, setFile] = useState({});
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch(setLoading(true));

    const token = localStorage.getItem("tokenUser");
    console.log(token);
    jwt.verify(
      token,
      process.env.REACT_APP_JWT_TOKEN_KEY,
      async (err, decodedData) => {
        console.log(decodedData);
        if (err) {
          if (err.message == "jwt expired") {
            alert("token expired");
            localStorage.removeItem("tokenUser");
            history.push("/");
          }
        } else {
          const id = decodedData.id;
          console.log(id);
          dispatch(getUserById(id)).then((data) => {
            dispatch(setLoading(false));
            setUser(data);
          });
        }
      }
    );
  });
  const fileUploader = (e) => {
    console.log();
    if (e.target.files[0] && validate.isImage(e.target.files[0])) {
      setFile({ image: e.target.files[0] });
      setNotValidFile(false);
    } else {
      setNotValidFile(true);
      e.target.value = null;
      alert("Enter a valid image");
    }
  };
  const handleImageUpload = () => {
    const token = localStorage.getItem("tokenUser");
    const formData = new FormData();
    formData.append("image", file.image);

    jwt.verify(
      token,
      process.env.REACT_APP_JWT_TOKEN_KEY,
      async (err, decodedData) => {
        console.log(decodedData);
        if (err) {
          alert("Invalid user");
        } else {
          const id = decodedData.id;
          formData.append("id", id);
          // for (var key of formData.entries()) {
          //   console.log(key[0] + ", " + key[1]);
          // }
          dispatch(imageupload(formData));
        }
      }
    );
  };
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    console.log(body);
    setDetails(body);
  };
  return (
    <>
      {console.log(user)}
      <div className="text-center">
        <h1>User</h1>
        <Logout />
      </div>

      <div className="p-2">
        <div className="d-flex justify-content-center">
          <div className="border border-2 border-success p-2">
            {user ? (
              <div>
                <form>
                  <img
                    src={`data:image/png;base64,${user.image}`}
                    alt="img1"
                    width="20%"
                    height="10%"
                  />
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label className="form-label">Name:</label>
                      <input
                        disabled
                        className="form-control"
                        value={user.name}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email:</label>
                      <input
                        disabled
                        className="form-control"
                        value={user.email}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">DOB:</label>
                      <input
                        disabled
                        className="form-control"
                        value={user.dob}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Username:</label>
                      <input
                        disabled
                        className="form-control"
                        value={user.username}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Image:</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={fileUploader}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={NotvalidFile}
                    className="btn btn-success mt-3"
                    onClick={handleImageUpload}
                  >
                    Upload
                  </button>
                  <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                    token={makePayment}
                    name="BUY REACT"
                    amount={product.price * 100}
                  >
                    <button
                      type="button"
                      className="btn btn-danger mt-3 mx-2"
                      onClick={() => {
                        dispatch(paymentHandle(details));
                      }}
                    >
                      Buy React
                    </button>
                  </StripeCheckout>
                </form>
              </div>
            ) : (
              <Loader type="Puff" color="#00BFFF" height={50} width={50} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
