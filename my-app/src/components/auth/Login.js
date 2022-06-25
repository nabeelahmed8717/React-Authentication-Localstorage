import React, { useState } from "react";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./AuthStyles.module.css";

const Login = (props) => {
  const [UserNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const [input, setInput] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState({
    password: "",
    email: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "*Please enter Username.";
          }
          break;

        case "email":
          if (!value) {
            setUserNotFound(false);
            stateObj[name] = "*Please enter email.";
          } else if (!value.includes("@")) {
            stateObj["email"] = "*Invalid email: email must include '@' ";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "*Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "*Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "*Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "*Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  async function login(event) {
    setIsLoading(true);
    const userFetchedData = [];
    event.preventDefault();
    const response = await fetch(
      "https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json"
    );
    const data = await response.json();
    let loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        username: data[key].username,
        email: data[key].email,
        password: data[key].password,
        role: data[key].role,
      });
    }

    const matchUser = loadedData.filter((user) => user.email === input.email && user.password === input.password);
    console.log("UserFiltered", matchUser);

    const isUser = matchUser.length !== "" ? true : false;
    console.log("User", isUser);

    if (matchUser.length === 0) {
      alert("user does`nt exists");
    } else {
      console.log("user exists");

      if(matchUser[0].role === 'admin'){
        console.log('welcome to admin');
        history.push("Dashboard");
      }else{
        console.log('welcome to user');
        history.push("Home");
        props.setUserId(matchUser[0].id)
      }

      
    }


    setIsLoading(false);
  }

  return (
    <div className={styles.LOG_SIG_gripper}>
      <div className={styles.login__signup_btns}>
        <NavLink activeClassName={styles.activeNavLink} to="/Login">
          <button>SignIn</button>
        </NavLink>
        <NavLink activeClassName={styles.activeNavLink} to="/Register">
          <button>SignUp</button>
        </NavLink>
      </div>
      <div className={styles.inputs_container}>
        <h2>Sign In</h2>
        {UserNotFound && <p>Oops! User Not Found</p>}
        <form onSubmit={login}>
          <div className={styles.input_group}>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.email && <span className={styles.err}>{error.email}</span>}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && (
              <span className={styles.err}>{error.password}</span>
            )}
          </div>
          <button className={styles.submitButton}>SignIn</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
