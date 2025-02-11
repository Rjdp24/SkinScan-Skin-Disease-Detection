import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api"; // ✅ Import API calls
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope, FaRegAddressCard } from "react-icons/fa";

const LoginRegister = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    // State for user inputs
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // ✅ Error state

    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    // ✅ Handle Login
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser(email, password);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user)); // ✅ Store user data
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed!");
        }
    };

    // ✅ Handle Register
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await registerUser(username, email, password);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user)); // ✅ Store user data
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Registration failed!");
        }
    };

    return (
        <div className="entireBody">
            <div className={`wrapper ${isActive ? "active" : ""}`}>
                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                {/* Login Form */}
                <div className="form-box login">
                    <h2 className="title animation" style={{ "--i": 0, "--j": 20 }}>Login</h2>
                    {error && <p className="error-message">{error}</p>} {/* ✅ Display error */}
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-box animation" style={{ "--i": 1, "--j": 21 }}>
                            <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                            <label>Email</label>
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 2, "--j": 22 }}>
                            <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                            <FaLock className="icon" />
                        </div>
                        <button type="submit" className="btn animation" style={{ "--i": 4, "--j": 24 }}>Login</button>
                        <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
                            <p>Don't have an account? <a href="#" onClick={handleRegisterClick} className="register-link">Register</a></p>
                        </div>
                    </form>
                </div>
                <div className="info-text login">
                    <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>SkinScan</h2>
                </div>

                {/* Register Form */}
                <div className="form-box register">
                    <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>Register</h2>
                    {error && <p className="error-message">{error}</p>} {/* ✅ Display error */}
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
                            <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                            <label>Username</label>
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
                            <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                            <label>Email</label>
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
                            <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 21, "--j": 4 }}>
                            <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label>Confirm Password</label>
                            <FaLock className="icon" />
                        </div>
                        <button type="submit" className="btn animation" style={{ "--i": 22, "--j": 5 }}>Register</button>
                        <div className="linkTxt animation" style={{ "--i": 23, "--j": 6 }}>
                            <p>Already have an account? <a href="#" onClick={handleLoginClick} className="login-link">Login</a></p>
                        </div>
                    </form>
                </div>
                <div className="info-text register">
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Welcome to SkinScan!</h2>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;

