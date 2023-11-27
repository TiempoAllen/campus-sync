import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confPass) {
        alert("Password do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/user/insertUser",
        {
          fname: fname,
          lname: lname,
          email: email,
          password: password,
        }
      );
      console.log("User registered successfully: ", response.data);
    } catch (error) {
      console.error("Error message: ", error.message);
    }
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setConfPass("");
  };

  const navigateToLogin = () => {
    navigate("/");
  };
  return (
    <div className="login-body">
      <div className="login-page">
        <h4>Register</h4>
        <Form.Root className="FormRoot" autoComplete="off">
          <div className="register-name-div">
            <Form.Field className="FormField" name="first name">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">First Name</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="Login-Input"
                  type="text"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="last name">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Last Name</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="Login-Input"
                  type="text"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>
          <Form.Field className="FormField" name="Email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Email</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Login-Input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="password">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Password</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Login-Input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="confirm password">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Confirm Password</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Login-Input"
                type="password"
                value={confPass}
                onChange={(e) => {
                  setConfPass(e.target.value);
                }}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              type="button"
              className="Button"
              style={{ marginTop: 10 }}
              onClick={handleRegister}
            >
              Register
            </button>
          </Form.Submit>
          <div className="navigateSignup">
            <p>
              Already have an account?{" "}
              <span onClick={navigateToLogin} style={{ cursor: "pointer" }}>
                Login
              </span>
            </p>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};

export default Register;
