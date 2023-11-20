import React from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";

const Notification = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options" id="announcement">
        <Header title="Notification" src="./images/Notification-dash.svg" />
      </div>
    </>
  );
};

export default Notification;
