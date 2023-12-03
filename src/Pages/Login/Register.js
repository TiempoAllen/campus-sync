import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [appear, setAppear] = useState(false);

  const handleAppear = () => {
    setAppear(true);
  };

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
          role: role,
          email: email,
          password: password,
        }
      );
      console.log("User registered successfully: ", response.data);
      handleAppear();
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
    navigate("/login");
  };
  return (
    <div className="login-body">
      {appear && (
        <div className="success-message p-3 d-flex flex-row justify-content-around">
          <p>Registered successfully.</p>
          <div
            onClick={() => {
              setAppear(false);
            }}
          >
            <CloseIcon sx={{ cursor: "pointer", color: "white" }} />
          </div>
        </div>
      )}
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
          <Form.Field className="FormField" name="Role">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form.Label className="FormLabel">Role</Form.Label>
              <FormControl size="small" asChild>
                <Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ border: "solid 1px #424242" }}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Form.Field>
          <Form.Field className="FormField" name="email">
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
