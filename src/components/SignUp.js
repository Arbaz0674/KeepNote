import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [userData, setData] = useState({
    userName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const validateUser = async (e) => {
    e.preventDefault();
    const setUserData = await fetch(
      `http://localhost:5000/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.userName,
          email: userData.email,
          password: userData.password,
        }),
      }
    );
    const savedUser = await setUserData.json();
    if (savedUser.success) {
      //   console.log(savedUser);
      localStorage.setItem("auth-token", savedUser.authToken);
      navigate("/");
    } else {
      alert(savedUser.err);
    }
    setData({ userName: "", email: "", password: "", cpassword: "" });
  };
  const changeDetail = (e) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="contain text-center">
      <form onSubmit={validateUser}>
        <h1 className="display-3 title my-3">Sign Up</h1>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputEmail1 my-2" className="item-label">
            Name
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="userName"
            name="userName"
            value={userData.userName}
            aria-describedby="emailHelp"
            placeholder="Name"
            onChange={changeDetail}
            minLength={3}
            required
          />
        </div>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputEmail1 my-2" className="item-label">
            Email
          </label>
          <input
            type="email"
            className="form-control my-2"
            id="exampleInputEmail1"
            name="email"
            value={userData.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={changeDetail}
            required
          />
        </div>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputPassword1 my-2" className="item-label">
            Password
          </label>
          <input
            type="password"
            className="form-control my-2"
            name="password"
            value={userData.password}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={changeDetail}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mx-2">
          <label htmlFor="exampleInputPassword1 my-2" className="item-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control my-2"
            name="cpassword"
            value={userData.cpassword}
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeDetail}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
}
