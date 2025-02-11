import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import SkinTestResult from "./pages/SkinTestResult";
import Navbar from "./components/Navbar";
import SkinTest from "./pages/SkinTest";
import "./App.css";

const App = () => {
  const currentLocation = useLocation();
  return (
    <div className="app-container">
      {currentLocation.pathname === "/dashboard" ? <Navbar showProfile /> : <Navbar centered />}
      <div className="content">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skin-test" element={<SkinTest />} />
          <Route path="/result" element={<SkinTestResult />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;