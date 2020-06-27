import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./component/layout/navbar";
import Dashboard from "./component/dashboard/dashboard";
import ProjectDetails from "./component/projects/projectDetails";
import SignIn from "./component/authentication/signIn";
import SignUp from "./component/authentication/signUp";
import CreateProject from "./component/projects/createProject"

function App() {
    return (
        <BrowserRouter>
            <div className="">
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/project/:id" component={ProjectDetails} />
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/createProject" component={CreateProject} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
