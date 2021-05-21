import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import store from "./store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
