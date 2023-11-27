import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateToSignup = () => {
    navigate("/register");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.message === "Email do not exists") {
        alert("Email do not exists");
      } else if (response.data.message === "Login Successful") {
        navigate("/dashboard");
      } else {
        alert("Incorrect Email and Password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-body">
      <div className="login-page">
        <img src="/images/logo.png" className="app-logo" alt="logo" />
        <Form.Root className="FormRoot" autoComplete="off">
          <Form.Field className="FormField" name="email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Email</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your email
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid email
              </Form.Message>
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
          <Form.Field className="FormField" name="question">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Password</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="Login-Input"
                type="email"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Control>
          </Form.Field>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox.Root className="CheckboxRoot" id="c1">
              <Checkbox.Indicator className="CheckboxIndicator">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <div className="login-assurance">
              <label className="LabelCheckbox" htmlFor="c1">
                Remember me
              </label>
              <p>Forgot Password?</p>
            </div>
          </div>
          <Form.Submit asChild>
            <button
              className="Button"
              style={{ marginTop: 10 }}
              onClick={handleLogin}
            >
              Login
            </button>
          </Form.Submit>
          <div className="navigateSignup">
            <p>
              Don't have an account?{" "}
              <span onClick={navigateToSignup} style={{ cursor: "pointer" }}>
                Sign up
              </span>
            </p>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};

export default LoginPage;
