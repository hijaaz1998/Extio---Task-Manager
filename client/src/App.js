import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AuthIndex from "./screens/AuthIndex";
import MainIndex from "./screens/MainIndex";
import Page404 from "./components/Auth/Page404";
import { useSelector } from "react-redux";

function App(props) {
  
  function activekey() {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    return activeKey1;
  }

  const user = useSelector((state) => state.user);
  const isAuthenticated = user !== '';

  // if (!isAuthenticated) {
  //   return (
  //     <div id="mytask-layout" className="theme-indigo">
  //       <Switch>
  //         <Route path="/" component={AuthIndex} />
  //       </Switch>
  //     </div>
  //   );
  // }

  return (
    <div id="mytask-layout" className="theme-indigo">
      <Sidebar activekey={activekey()} history={props.history} />
      <Switch>
        <Route path="/" component={MainIndex} />
        <Route path="/page-404" component={Page404} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
