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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
