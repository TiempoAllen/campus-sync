import React from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";

const Department = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options" id="announcement">
        <Header title="Department" src="./images/Department-dash.svg" />
      </div>
    </>
  );
};

export default Department;
