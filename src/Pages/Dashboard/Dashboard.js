import React from "react";
import Sidenav from "./Sidenav";
import Body from "./Body";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="dashboard-layout">
      <Sidenav user={user} />
      <div className="dashboard">
        <Body user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
