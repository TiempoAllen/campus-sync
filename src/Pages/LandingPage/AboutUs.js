import React from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <section className="about-us text-sm-start text-center">
        <div className="container" style={{ color: "#424242" }}>
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1 className="fw-bold">Stay Connected, Stay Informed</h1>
              <p className="lead">
                Campus-Sync transforms university life with real-time updates,
                university events, and personalized dashboards, seamlessly
                connecting students, faculty, and staff for an enhanced campus
                experience.
              </p>
              <div className="showcase-btn d-sm-flex align-items-center justify-content-between">
                <div>
                  <button
                    className="sign-in btn btn-md text-white"
                    onClick={navigateToLogin}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ backgroundColor: "transparent", color: "#424242" }}
                    onClick={navigateToRegister}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <img
              className="img-fluid d-none d-sm-block"
              src="/images/bulletin-board.svg"
              alt="logo"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
