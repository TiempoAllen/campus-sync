import React from "react";
import "./landing.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg py-3 fixed-top"
      style={{ backgroundColor: "white" }}
    >
      <div className="container">
        <a
          href="#"
          className="navbar-brand fw-bold h1"
          style={{ margin: "0 20px 0 0", color: "#424242" }}
        >
          Campus-Sync
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#usecase" className="nav-link">
                About us
              </a>
            </li>
            <li className="nav-item">
              <a href="#specs" className="nav-link">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
