import React, { useState } from "react";
import axios from "axios";
import { useUserSession } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const { logIn } = useUserSession();
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const submitButton = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/login", inputField)
      .then((data) => {
        console.log(data.data.token);
        setToken(data.data.token);
        logIn(data.data.user, data.data.token);
        props.history.push("/");
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  return (
    <div className="container border">
      {/*Card content*/}
      <div className="card-body">
        {/* Form */}
        <form
          className="text-center"
          style={{ color: "#757575" }}
          onSubmit={submitButton}
        >
          <div className="btn-group m-5">
            <button className="btn-signin_top">Sign In</button>
            <Link to="/SignUp">
              <button className="btn-signup_top">Sign Up</button>
            </Link>
          </div>
          {/* Email */}
          <div className="md-form">
            <input
              type="email"
              className="col-10 form-input-new"
              name="email"
              placeholder="Enter your Email"
              value={inputField.email}
              onChange={inputsHandler}
            />
          </div>
          <br />
          {/* Password */}
          <div className="md-form">
            <input
              type="password"
              className="col-10 form-input-new"
              name="password"
              placeholder="Enter your Password"
              value={inputField.password}
              onChange={inputsHandler}
            />
          </div>
          {/* Sign in button */}
          <button
            className="col-10 btn-signin my-4"
            type="submit"
            onSubmit={submitButton}
          >
            Sign in
            <i className="fas fa-arrow-right icon-arrow-right"></i>
          </button>
        </form>
        {/* Form */}
      </div>
    </div>
  );
};

export default SignIn;
