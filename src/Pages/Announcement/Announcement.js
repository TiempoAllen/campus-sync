import React from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";

const Announcement = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options" id="announcement">
        <Header title="Announcement" src="./images/Announcement-dash.svg" />
      </div>
    </>
  );
};

export default Announcement;
