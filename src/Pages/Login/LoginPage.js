import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [appear, setAppear] = useState(false);

  const { login } = useAuth();

  const handleAppear = () => {
    setAppear(true);
  };

  const navigateToSignup = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data) {
        const user = response.data;

        if (user.role === "Admin") {
          navigate("/adminDashboard");
        } else if (user.role === "User") {
          navigate("/dashboard");
        }
        setEmail("");
        setPassword("");
        login(user);
      }
    } catch (error) {
      console.log("Error: ", error.response.data);
      if (error.response.data === "Invalid username or password") {
        setEmail("");
        setPassword("");
        handleAppear();
      }
    }
  };
  return (
    <div className="login-body">
      {appear && (
        <div className="failed-message p-3 d-flex flex-row justify-content-around">
          <p>Incorrect username or password.</p>
          <div
            onClick={() => {
              setAppear(false);
            }}
          >
            <CloseIcon sx={{ cursor: "pointer" }} />
          </div>
        </div>
      )}
      <div className="login-page">
        <img
          src="/images/logo.png"
          className="app-logo"
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        />
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
              <Form.Message
                className="FormMessage"
                match="typeMismatch"
                style={{ color: "red" }}
              >
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
                type="password"
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
              type="button"
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
