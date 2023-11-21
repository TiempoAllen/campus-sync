import React, { useState } from "react";
import Sidenav from "./Sidenav";
import Body from "./Body";
import CalendarEvents from "./CalendarEvents";

const Dashboard = () => {
  const [name, setName] = useState("John");

  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };
  return (
    <div>
      <Sidenav />
      <div className="dashboard">
        <Body name={name} />
        <CalendarEvents handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Dashboard;
