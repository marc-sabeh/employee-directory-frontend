import React, { useState } from "react";
import axios from "axios";
import { useUserSession } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const { logIn } = useUserSession();
  const [image, setImage] = useState({ preview: "", raw: "" });

  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    phone_number: "",
    seiority: "",
    title: "",
    location: "",
    department_name: "",
    password: "",
  });
  const [token, setToken] = useState("");

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const inputsHandlerPicture = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const submitButton = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", image.raw);
    formData.append("name", inputField.name);
    formData.append("email", inputField.email);
    formData.append("phone_number", inputField.phone_number);
    formData.append("seiority", inputField.seiority);
    formData.append("title", inputField.title);
    formData.append("location", inputField.location);
    formData.append("department_name", inputField.department_name);
    formData.append("password", inputField.password);


    axios
      .post("http://localhost:3000/users/signup", formData)
      .then((data) => {
        console.log(data);
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
      <div className="card-body">
        <form
          className="my-4"
          style={{ color: "#757575" }}
          onSubmit={submitButton}
        >
          <div className="btn-group m-5">
            <Link to="/SignIn">
              <button className="btn-signin_topup">Sign In</button>
            </Link>

            <button className="btn-signup_topup">Sign Up</button>
          </div>
          {/* Name */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="name"
              placeholder="Enter your Name"
              value={inputField.name}
              onChange={inputsHandler}
            />
          </div>
          <br />
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
          {/* seiority */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="seiority"
              placeholder="Enter your Seiority"
              value={inputField.seiority}
              onChange={inputsHandler}
            />
          </div>
          <br />
          {/* Title */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="title"
              placeholder="Enter your Title"
              value={inputField.title}
              onChange={inputsHandler}
            />
          </div>
          <br />
          {/* Deopartment name */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="department_name"
              placeholder="Enter your Department Name"
              value={inputField.department_name}
              onChange={inputsHandler}
            />
          </div>
          <br />
          {/*  Location */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="location"
              placeholder="Enter your Location"
              value={inputField.location}
              onChange={inputsHandler}
            />
          </div>
          <br />
          {/* Phone Number */}
          <div className="md-form">
            <input
              type="text"
              className="col-10 form-input-new"
              name="phone_number"
              placeholder="Enter your Phone Number"
              value={inputField.phone_number}
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
          <br />
          {/* Picture  */}
          <div className="md-form mt-0">
            <label htmlFor="materialRegisterFormEmail">Picture</label>
            <input 
            type="file"  
            className="m-3"
            name="picture"
            placeholder="Enter your Picture"
            onChange={inputsHandlerPicture}
            />
          </div>
          {/* Sign in button */}
          <button
            className="col-10 btn-signin my-4"
            type="submit"
            onSubmit={submitButton}
          >
            Sign Up
            <i className="fas fa-arrow-right icon-arrow-right"></i>
          </button>
        </form>
        {/* Form */}
      </div>
    </div>
  );
};

export default SignUp;
