import React from "react";
import Sidenav from "./Sidenav";
import Body from "./Body";
import { useAuth } from "../../AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div className="dashboard-layout">
      <Sidenav user={user} logout={logout} />
      <div className="dashboard">
        <Body user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
