import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import GotHeader from "./GotHeader";
import GotMain from "./GotMain";
import GotDetails from "./GotDetails";
import reportWebVitals from "./reportWebVitals";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <GotHeader />
    <Router>
      <Switch>
        <Route path="/got/:id" component={GotDetails} />
        <Route path="/got" component={GotMain} />
        <Route path="">
          <Redirect to="/got" />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
