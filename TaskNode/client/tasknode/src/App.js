import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import store from "./store/store";
import { Provider } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./protectedRouting/ProtectedRouting";
import UserDashboard from "./components/UserDashboard";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <ProtectedRoute
            path="/admindashboard"
            exact
            component={AdminDashboard}
          />
          <ProtectedRoute
            path="/userdashboard"
            exact
            component={UserDashboard}
          />
          <Route path="/forgetpassword" exact component={ForgetPassword} />
          <Route path="/resetPassword/:token" component={ResetPassword} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
