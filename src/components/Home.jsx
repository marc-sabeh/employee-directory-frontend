import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Home = () => {
  const [allusers, setAllUser] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [inputField, setInputField] = useState({
    filterBy: "",
    filterByValue: "",
  });
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    let header = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("http://localhost:3000/users", header)
      .then((data) => {
        setAllUser(data.data.users);
        console.log(data.data.users);
      })
      .catch((error) => {
        console.log("login error", error);
      });

      axios
        .get("http://localhost:3000/departments", header)
        .then((data) => {
          setAllDepartments(data.data.departments);
          console.log(data.data.departments);
        })
        .catch((error) => {
          console.log("login error", error);
        });
  }, []);

  const inputsHandler = (e) => {
    console.log(e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const inputsHandlerSelect = (e) => {
    setInputField({ ...inputField, filterByValue: e.target.value });
  };
  
  const filterByFun = (e) => {
    setInputField({ ...inputField, filterBy: e.target.value });
  };


  
  const search = (limit, skip) => {
    console.log(inputField);
    let header = {
      params: {
        filterBy: inputField.filterBy,
        filterByValue: inputField.filterByValue,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`http://localhost:3000/users?limit=${limit}&skip=${skip}`, header)
      .then((data) => {
        setAllUser(data.data.users);
        console.log(data.data.users);
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  const onChangeSearch = async (e) => {
    await inputsHandler(e);
    search(limit, skip);
  };


  const onChangeSearchSelect = async (e) => {
    await inputsHandlerSelect(e);
    search(limit,skip);
  };

  const fetchUsers = (limit, skip) => {
 

        let header = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        axios
          .get(`http://localhost:3000/users?limit=${limit}&skip=${skip}`, header)
          .then((data) => {
            setAllUser(data.data.users);
          })
          .catch((error) => {
            console.log("login error", error);
          });
}




 

  const nextPage = () => {
      setSkip(skip + limit)
  }

  const previousPage = () => {
      setSkip(skip - limit)
  }

  useEffect(() => {
      fetchUsers(limit, skip)
  }, [skip, limit])


  return (
    <div className="container">
      <h1>Employees</h1>
      <br />
      Search By:
     <br />
      <select value={inputField.filterBy} onChange={filterByFun} className="col-10" >         
            <option selected>Please Choose...</option>
            <option value="location">Location</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="title">Title</option>
            <option value="seiority">Seiority</option>
            <option value="department_id">Department</option>
          </select>
      <br />
      <br />
      <div className="md-form">
        { inputField.filterBy === "department_id" ? ( 
            <select value={inputField.filterByValue} onChange={onChangeSearchSelect} className="col-10" >         
            <option selected>Please Choose...</option>
        {allDepartments.map((dep, index) => (
            <option value={dep._id}>{dep.department_name}</option>
        ))}
          </select>
        ): (
          <input
          type="text"
          className="col-10"
          name="filterByValue"
          placeholder="Enter your Search"
          value={inputField.filterByValue}
          onChange={onChangeSearch}
        />
        )}
      </div>
      <br />
      <br />
      <div className="row">
        {allusers.map((user, index) => (
          <div className="col-sm-6 col-lg-4 mb-3">
            <UserCard user={user}></UserCard>
          </div>
        ))}
      </div>

      <div> 
            <button onClick={previousPage}> Previous Page </button>
            <button onClick={nextPage}> Next Page </button> 
        </div>

    </div>
  );
};

export default Home;
