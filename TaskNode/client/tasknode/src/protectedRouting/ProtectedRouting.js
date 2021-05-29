import React from "react";
import { Route, Redirect } from "react-router";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("tokenAdmin")) {
          return <AdminDashboard {...rest} {...props} />;
        } else if (localStorage.getItem("tokenUser")) {
          console.log("if ");
          return (
            console.log(rest, "rest"),
            console.log(props, "props"),
            (<UserDashboard {...rest} {...props} />)
          );
        } else {
          console.log("else ", props);
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
