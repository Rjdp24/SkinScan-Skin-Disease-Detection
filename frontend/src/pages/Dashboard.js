import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Eczema from "../assets/pexels-eczema.jpg";
import Acne from "../assets/pexels-acne.jpg";
import Vitiligo from "../assets/pexels-vitiligo.jpg";
import Psoriasis from "../assets/pexels-psoriasis.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <section className="news-section">
        <h2>Skin Disease News</h2>
        <div className="news-grid">
          <div className="news-item">
            <a href="https://www.niams.nih.gov/newsroom/spotlight-on-research/nih-researchers-survey-genetic-diversity-skin-microbes-eczema" target="_blank">
              <img src={Eczema} alt="News 1" />
              <p>NIH Researchers Survey the Genetic Diversity of Skin Microbes in Eczema Patients</p>
            </a>
          </div>
          <div className="news-item">
            <a href="https://www.niams.nih.gov/newsroom/spotlight-on-research/discussing-bone-muscle-skin-autoimmune-diseases-info-american" target="_blank">
              <img src={Acne} alt="News 2" />
              <p>Discussing Bone, Muscle, Skin, & Autoimmune Diseases: Info for American Indians, Alaska Natives - audio</p>
            </a>
          </div>
          <div className="news-item">
            <a href="https://www.nih.gov/news-events/news-releases/nih-scientists-find-treatment-rare-genetic-skin-disorder" target="_blank">
              <img src={Psoriasis} alt="News 3" />
              <p>NIH scientists find treatment for rare genetic skin disorder</p>
            </a>
          </div>
          <div className="news-item">
            <a href="https://www.niams.nih.gov/newsroom/spotlight-on-research/research-naturally-occurring-hair-growth-skin-nevi-may-inform-new" target="_blank">
              <img src={Vitiligo} alt="News 4" />
              <p>Research Into Naturally Occurring Hair Growth in Skin Nevi May Inform New Regenerative Therapies</p>
            </a>
          </div>
        </div>
      </section>
      <section className="test-section">
        <button className="eye-test-button" onClick={() => navigate("/skin-test")}>
          Start Skin Test
        </button>
      </section>
    </div>
  );
};

export default Dashboard;