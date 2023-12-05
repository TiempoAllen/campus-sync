import React from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "./AdminSideNav";
import AdminBody from "./AdminBody";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div className="dashboard-layout">
      <AdminSideNav user={user} logout={logout} />
      <div className="dashboard">
        <AdminBody user={user} />
      </div>
    </div>
  );
};

export default AdminDashboard;
