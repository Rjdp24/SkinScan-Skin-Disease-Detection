import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./SkinTest.css";

const SkinTest = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null); // Added confidence state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to capture image from webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setPrediction(null);
    setConfidence(null); // Reset confidence when a new image is captured
  };

  // Handle Image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPrediction(null);
        setConfidence(null); // Reset confidence when a new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Send Image to Backend for Analysis
  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);

    try {
      // Convert Base64 image to a Blob
      const blob = await fetch(image).then((res) => res.blob());

      // Create FormData and append the image file
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // Send the image to the backend
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData, // Send as multipart/form-data
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      setPrediction(data.prediction);
      setConfidence(data.confidence); // Set confidence score
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to results page
  const goToResults = () => {
    if (image && prediction !== null) {
      navigate("/result", { state: { image, prediction, confidence } });
    } else {
      alert("Please analyze the image before proceeding to results.");
    }
  };

  return (
    <div className="skin-test-container">
      <div className="webcam-container">
        {!image ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
            <button className="capture-btn" onClick={captureImage}>
              📸
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-btn"
            />
          </>
        ) : (
          <div className="captured-container">
            <img src={image} alt="Captured skin" className="captured-image" />
            <div className="button-group">
              <button className="retake-btn" onClick={() => setImage(null)}>
                Retake
              </button>
              <button
                className="analyze-btn"
                onClick={analyzeImage}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Skin"}
              </button>
              <button className="results-btn" onClick={goToResults}>
                Analyze Results
              </button>
            </div>
          </div>
        )}
      </div>
      {prediction !== null && (
        <div className="result">
          <h3>Prediction: {prediction}</h3>
          {/* <h3>Confidence: {confidence}</h3> Display confidence score */}
        </div>
      )}
    </div>
  );
};

export default SkinTest;