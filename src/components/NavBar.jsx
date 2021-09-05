import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserSession } from "../context/AuthContext";
import axios from "axios";

const NavBar = () => {
  const { meFunc, logOut, user } = useUserSession();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    let header = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("http://localhost:3000/users/me", header)
      .then((data) => {
        meFunc(data.data);
      })
      .catch((error) => {
        console.log("login error", error);
      });
  }, []);

  const logoutFunc = () => {
    logOut();
  };

  return (
    <nav className="navbar-fixed-top navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand" href="#">
            Postlight
          </a>
        </Link>
        {user.user.name !== "Guest" ? (
          <div className="navbar-nav dropdown">
            <div className="nav-item">
              <p>Welcome {user.user.name}</p>
            </div>

            <div className="nav-item">
              <button className="btn btn-success" onClick={logoutFunc}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-nav dropdown">
            <Link to="/SignIn">
              <div className="nav-item">
                <button className="btn btn-success nav-item">Sign In</button>
              </div>
            </Link>
            <Link to="/SignUp">
              <div className="nav-item">
                <button className="btn btn-success">Sign Up</button>
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
