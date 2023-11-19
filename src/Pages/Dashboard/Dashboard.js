import React from "react";
import Sidenav from "./Sidenav";
import Body from "./Body";
import CalendarEvents from "./CalendarEvents";

const Dashboard = () => {
  return (
    <div>
      <Sidenav />
      <div className="dashboard">
        <Body />
        <CalendarEvents />
      </div>
    </div>
  );
};

export default Dashboard;
