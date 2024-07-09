import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LeftSide from "../components/Auth/LeftSide";
import Page404 from "../components/Auth/Page404";
import PasswordReset from "../components/Auth/PasswordReset";
import SignIn from "../components/Auth/SignIn";
import Signup from "../components/Auth/Signup";
import StepAuthentication from "../components/Auth/StepAuthentication";

function AuthIndex() {
  return (
    <div className="main p-2 py-3 p-xl-5">
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <LeftSide />
            <Switch>
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={Signup} />
              <Route exact path="/password-reset" component={PasswordReset} />
              <Route exact path="/2-step-authentication" component={StepAuthentication} />
              <Route exact path="/page-404" component={Page404} />
              <Redirect to="/sign-in" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthIndex;
