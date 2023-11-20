import React from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };
  return (
    <div className="login-body">
      <div className="login-page">
        <h4>Register</h4>
        <Form.Root className="FormRoot">
          <div className="register-name-div">
            <Form.Field className="FormField" name="text">
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
                <input className="Input" type="text" required />
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
                <input className="Input" type="email" required />
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
              <input className="Input" type="email" required />
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
              <input className="Input" type="password" required />
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
              <input className="Input" type="password" required />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              className="Button"
              style={{ marginTop: 10 }}
              onClick={navigateToLogin}
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
