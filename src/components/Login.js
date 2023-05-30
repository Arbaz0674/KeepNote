import React, { useState } from "react";
import "./../css/Style.css";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const validateUser = async (e) => {
    e.preventDefault();
    const fetchUser = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const user = await fetchUser.json();
    if (user.type) {
      localStorage.setItem("auth-token", user.authToken);
      navigate("/");
      props.alertfunc(user.type, "LoggedIn Successfully");
    } else {
      props.alertfunc(user.type, user.error);
    }
    setCredential({ email: "", password: "" });
  };
  const changeCredential = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="contain text-center">
      <form className="backgrd" onSubmit={validateUser}>
        <h1 className="display-3 title my-3">Login to use KeepNote</h1>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputEmail1 my-2" className="item-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control my-2"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={credential.email}
            onChange={changeCredential}
          />
        </div>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputPassword1 my-2" className="item-label">
            Password
          </label>
          <input
            type="password"
            className="form-control my-2"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            value={credential.password}
            onChange={changeCredential}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
}
