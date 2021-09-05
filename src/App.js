import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React, {useState} from "react";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Default from "./components/Default";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';


const GUEST_USER = {__guest:true, user: {name: 'Guest'}}

const App = () => {
  const [user, setUser] = useState(GUEST_USER)

  const logIn = (user, token) => {
    setUser({__guest:false, user: user, token: token})
    sessionStorage.setItem('token', token);
  }

  const logOut = () => {
    setUser(GUEST_USER)
    sessionStorage.removeItem('token');
  }

  const meFunc = (user) => {
    setUser({__guest:false, user: user})
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, logIn, logOut, meFunc }}>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/SignIn" component={SignIn}></Route>
          <Route component={Default}></Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
