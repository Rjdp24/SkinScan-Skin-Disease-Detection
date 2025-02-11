import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SkinTestResult.css";

const SkinTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, prediction, confidence } = location.state || {};

  return (
    <div className="result-container">
      <h2>Skin Test Results</h2>
      {image && <img src={image} alt="Captured Skin" className="result-image" />}
      <p className="prediction">Predicted Condition: {prediction != null ? prediction : "N/A"}</p>
      {/* <p className="confidence">Confidence: {confidence != null ? confidence : "N/A"}</p> Display confidence */}
      <button className="back-btn" onClick={() => navigate("/skin-test")}>
        Back to Skin Test
      </button>
    </div>
  );
};

export default SkinTestResult;