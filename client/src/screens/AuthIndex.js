import React from "react";
import { Route } from "react-router-dom";
import LeftSide from "../components/Auth/LeftSide";
import Page404 from "../components/Auth/Page404";
import PasswordReset from "../components/Auth/PasswordReset";
import SignIn from "../components/Auth/SignIn";
import Signup from "../components/Auth/Signup";
import StepAuthentication from "../components/Auth/StepAuthentication";


function AuthIndex (){
    
        return(
            <div className="main p-2 py-3 p-xl-5 ">
                <div className="body d-flex p-0 p-xl-5">
                    <div className="container-xxl">
                        <div className="row g-0">
                            <LeftSide />
                            <Route exact path={`${process.env.PUBLIC_URL}/sign-in`} component={SignIn} /> 
                            <Route exact path={`${process.env.PUBLIC_URL}/sign-up`} component={Signup} />
                            <Route exact path={`${process.env.PUBLIC_URL}/password-reset`} component={PasswordReset} />
                            <Route exact path={`${process.env.PUBLIC_URL}/2-step-authentication`} component={StepAuthentication} />
                            <Route exact path={`${process.env.PUBLIC_URL}/page-404`} component={Page404} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default AuthIndex;