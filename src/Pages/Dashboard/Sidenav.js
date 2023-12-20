import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const Sidenav = ({ user }) => {
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
            <Link to="/dashboard" className="li-link">
              <img
                src="/images/dashboard.svg"
                className="sidenav-logo me-1"
                alt="dashboard-img"
              ></img>
              Dashboard
            </Link>
          </li>
          <li className="nav-item p-3 fs-5 ">
            <Link to="/announcement" className="li-link">
              <img
                src="/images/announcement.svg"
                className="sidenav-logo me-1"
                alt="announcement-img"
                style={{
                  height: "28px",
                  widows: "28px",
                }}
              ></img>
              Announcement
            </Link>
          </li>
          <li className="nav-item p-3 fs-5">
            <Link to="/notification" className="li-link">
              <img
                src="/images/notification.svg"
                className="sidenav-logo me-1"
                alt="notification-img"
                style={{
                  height: "30px",
                  widows: "30px",
                }}
              ></img>
              Notification
            </Link>
          </li>
          <li className="nav-item p-3 fs-5">
            <Link to="/department" className="li-link">
              <img
                src="/images/department.svg"
                className="sidenav-logo me-1"
                alt="department-img"
                style={{
                  height: "30px",
                  widows: "30px",
                }}
              ></img>
              Department
            </Link>
          </li>
          <li className="nav-item p-3 fs-5">
            <Link to="/event" className="li-link">
              <img
                src="/images/event.svg"
                className="sidenav-logo me-1"
                alt="event-img"
                style={{
                  height: "25px",
                  widows: "25px",
                }}
              ></img>
              Event
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
            <Avatar.Fallback className="AvatarFallback">{`${user.fname.charAt(
              0
            )}${user.lname.charAt(0)}`}</Avatar.Fallback>
          </Avatar.Root>
          <div className="name">
            <p className="fw-bold">
              {user.fname} {user.lname}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <ul class="dropdown-menu dropdown-menu-white text-small shadow">
          <li style={{ cursor: "pointer" }}>
            <a
              class="dropdown-item"
              onClick={() => {
                navigate("/profile");
              }}
            >
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

export default Sidenav;
