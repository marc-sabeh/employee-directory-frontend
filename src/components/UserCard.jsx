import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCard = (props) => {
  return (
    <div className="card">
      <img className="card-img-top" src={props.user.picture} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.user.name}</h5>
        <p className="card-text">
          {props.user.title} <br />
          {props.user.email} <br />
          {props.user.phone_number} <br />
          {props.user.department_name.department_name} <br />
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">From {props.user.location}</small>
      </div>
    </div>
  );
};

export default UserCard;
