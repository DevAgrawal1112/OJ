import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  backendUrl  from "../backendUrl";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { userid, email, password, cpassword } = user;

    const res = await fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userid,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 422) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 412) {
      window.alert("Invalid email format");
      console.log("Invalid email format");
    } else if (res.status === 413) {
      window.alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character");
      console.log("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character");
    } else if (res.status === 409) {
      window.alert("Email already Exists");
      console.log("Email already Exists");
    } else if (res.status === 406) {
      window.alert("This UserID is not available");
      console.log("This UserID is not available");
    } else if (res.status === 400) {
      window.alert("Passwords are not matching");
      console.log("Passwords are not matching");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="registerpage">
        <div className="form-box-register">
          <div className="form-value">
            <form method="POST">
              <h2 className="textr">Sign up</h2>

              <div className="inputbox">
                <input
                  type="text"
                  name="userid"
                  required
                  autoComplete="off"
                  value={user.userid}
                  onChange={handleInputs}
                  placeholder="UserID"
                ></input>
              </div>

              <div className="inputbox">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Email"
                ></input>
              </div>

              <div className="inputbox">
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                ></input>
              </div>

              <div className="inputbox">
                <input
                  type="password"
                  name="cpassword"
                  required
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                ></input>
              </div>

              <div className="click">
                <input type="submit" value="Register" onClick={PostData} />
              </div>
            </form>

            <NavLink className="already" to="/login">
              Already have an account!!
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;