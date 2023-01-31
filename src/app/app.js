import React from "react";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import MainPage from "./layouts/mainPage";
import LoginPage from "./layouts/loginPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </>
    );
}

export default App;
