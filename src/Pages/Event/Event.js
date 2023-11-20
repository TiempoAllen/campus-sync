import React from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";

const Event = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options" id="announcement">
        <Header title="Event" src="./images/Event-dash.svg" />
      </div>
    </>
  );
};

export default Event;
