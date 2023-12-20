import React from "react";
import LoginPage from "./Pages/Login/LoginPage";
import Register from "./Pages/Login/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Announcement from "./Pages/Announcement/Announcement";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Event from "./Pages/Event/Event";
import Department from "./Pages/Department/Department";
import Notification from "./Pages/Notification/Notification";
import LandingLayout from "./Pages/LandingPage/LandingLayout";
import Users from "./Pages/Dashboard/Users";
import AdminAnnouncement from "./Pages/Announcement/AdminAnnouncement";
import AnnouncementDetails from "./Pages/Announcement/AnnouncementDetails";
import AdminEvent from "./Pages/Event/AdminEvent";
import AdminDepartment from "./Pages/Department/AdminDepartment";
import Profile from "./Pages/Login/Profile";

const App = () => {
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/department" element={<Department />} />
            <Route path="/event" element={<Event />} />
            <Route path="/users" element={<Users />} />
            <Route path="/adminAnnouncement" element={<AdminAnnouncement />} />
            <Route
              path="/adminAnnouncement/announcementDetails/:aid"
              element={<AnnouncementDetails />}
            />
            <Route path="/adminEvent" element={<AdminEvent />} />
            <Route path="/adminDepartment" element={<AdminDepartment />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
