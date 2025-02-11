import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const isDashboard = location.pathname === "/dashboard";

  // ✅ Fetch user data from localStorage (Update when page refreshes)
  const [user, setUser] = useState({ username: "Guest", email: "guest@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // ✅ Re-run when location changes (fixes issue)

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Clear user data
    localStorage.removeItem("token"); // ✅ Remove JWT token
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
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

