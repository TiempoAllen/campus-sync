import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const AdminSideNav = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="side-nav d-flex flex-column flex-shrink-0"
        style={{
          width: "360px",
          maxWidth: "100%",
          color: "#EEEEEE",
          backgroundColor: "#374151",
          padding: "20px 10px 10px 80px",
        }}
      >
        <img src="/images/logo-white.png" className="app-logo" alt="logo" />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item p-3 fs-5">
            <Link to="/adminDashboard" className="li-link">
              <img
                src="/images/dashboard.svg"
                className="sidenav-logo me-1"
                alt="dashboard-img"
              ></img>
              Home
            </Link>
          </li>
          <li className="nav-item p-3 fs-5" style={{ marginLeft: "5px" }}>
            <Link to="/users" className="li-link">
              <img
                src="/images/user.svg"
                className="sidenav-logo me-2"
                alt="announcement-img"
                style={{
                  height: "30px",
                  width: "30px",
                  marginBottom: "5px",
                }}
              ></img>
              Users
            </Link>
          </li>
          <li className="nav-item p-3 fs-5">
            <Link to="/adminAnnouncement" className="li-link">
              <img
                src="/images/announcement.svg"
                className="sidenav-logo me-1"
                alt="notification-img"
                style={{
                  height: "30px",
                  widows: "30px",
                }}
              ></img>
              Announcement
            </Link>
          </li>
        </ul>
        <div
          className="profile dropdown-toggle show"
          data-bs-toggle="dropdown"
          aria-expanded="true"
          style={{ cursor: "pointer" }}
        >
          <Avatar.Root className="AvatarRoot">
            <Avatar.Fallback className="AvatarFallback">JD</Avatar.Fallback>
          </Avatar.Root>
          <div className="name">
            <p className="fw-bold">
              {user.fname} {user.lname}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <ul class="dropdown-menu dropdown-menu-white text-small shadow">
          <li>
            <a class="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li style={{ cursor: "pointer" }}>
            <a
              class="dropdown-item"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNav;
