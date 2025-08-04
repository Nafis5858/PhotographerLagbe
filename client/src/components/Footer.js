import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/logo.png" alt="PhotographerLagbe" className="brand-logo" />
              <span>PhotographerLagbe</span>
            </div>
            <p className="footer-description">
              Connecting clients with talented photographers across Bangladesh. 
              Find the perfect photographer for your special moments.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/photographers">Find Photographers</Link></li>
              <li><Link to="/register">Register as Photographer</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>Wedding Photography</li>
              <li>Portrait Photography</li>
              <li>Event Photography</li>
              <li>Commercial Photography</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>Email: info@photographerlagbe.com</li>
              <li>Phone: +880 1303634392</li>
              <li>Address: DIT Project, Road#11, House#32, Badda, Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 PhotographerLagbe. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
