import React from "react";
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        localStorage.getItem("tokenUser")
          ? localStorage.removeItem("tokenUser")
          : localStorage.removeItem("tokenAdmin");
        history.push("/");
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
