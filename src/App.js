import React from "react";
import LoginPage from "./Pages/Login/LoginPage";
import Register from "./Pages/Login/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Announcement from "./Pages/Announcement/Announcement";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/announcement" element={<Announcement />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
