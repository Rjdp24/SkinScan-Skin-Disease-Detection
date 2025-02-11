import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const isDashboard = location.pathname === "/dashboard";
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Center logo for all pages except Dashboard */}
      {!isDashboard ? (
        <div className="nav-center">
          <h1 onClick={handleLogout}>SkinScan</h1>
        </div>
      ) : (
        <>
          <div className="nav-left">
            <h1 onClick={handleLogout}>SkinScan</h1>
          </div>
          <div className="nav-right">
            <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
              {showProfile ? "✖" : "👤"} {/* Toggle Icon */}
            </button>
          </div>
        </>
      )}

      {/* Sliding Profile Panel (Only visible in Dashboard) */}
      {isDashboard && (
        <div className={`profile-panel ${showProfile ? "visible" : ""}`}>
          <h2>User Profile</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Member Since:</strong> 2024</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;