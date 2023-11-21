import React from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/register");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="login-body">
      <div className="login-page">
        <img src="/images/logo.png" className="app-logo" alt="logo" />
        <Form.Root className="FormRoot">
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
              <input className="Login-Input" type="email" required />
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
              <input className="Login-Input" type="email" required />
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
              onClick={navigateToDashboard}
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
