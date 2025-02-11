import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import for navigation
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope, FaRegAddressCard } from "react-icons/fa";

const LoginRegister = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();  // Hook for navigation

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        navigate("/dashboard");  // Redirect to Dashboard
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        navigate("/dashboard");  // Redirect to Dashboard after registration
    };

    return (
        <div className="entireBody">
            <div className={`wrapper ${isActive ? 'active' : ''}`}>
                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                {/* Login Form */}
                <div className="form-box login">
                    <h2 className="title animation" style={{ "--i": 0, "--j": 20 }}>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-box animation" style={{ "--i": 1, "--j": 21 }}>
                            <input type="text" required />
                            <label htmlFor="username">Username</label>
                            <FaRegAddressCard className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 2, "--j": 22 }}>
                            <input type="email" required />
                            <label htmlFor="email">Email</label>
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 3, "--j": 23 }}>
                            <input type="password" required />
                            <label htmlFor="password">Password</label>
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
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
                            <input type="text" required />
                            <label htmlFor="register-username">Username</label>
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
                            <input type="email" required />
                            <label htmlFor="register-email">Email</label>
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
                            <input type="password" required />
                            <label htmlFor="register-password">Password</label>
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box animation" style={{ "--i": 21, "--j": 4 }}>
                            <input type="password" required />
                            <label htmlFor="confirm-password">Confirm Password</label>
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