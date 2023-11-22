import React from "react";
import Sidenav from "./Sidenav";
import Body from "./Body";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidenav />
      <div className="dashboard">
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
